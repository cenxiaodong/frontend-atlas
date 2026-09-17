/**
 * 工具箱的数据源
 *
 * 这里的工具都是「一段文本进 → 一段文本出」，形状完全一致，
 * 所以不用给每个工具写一个组件：只声明按钮文案 + 纯函数，
 * 由 components/ToolRunner.vue 统一渲染输入框、按钮行和输出框。
 * 想加新工具，在 TOOLS 里追加一项即可，页面会自动多出一张卡片。
 */

export interface ToolAction {
  /** 按钮文案 */
  label: string;
  /**
   * 纯函数：第一个入参是主输入框的文本，第二个是参数框（没有参数框时是空串），
   * 返回要输出的文本；抛出的错误会被 ToolRunner 捕获并提示。
   * 只用一个入参的写法同样合法（TS 允许少写形参），所以大多数工具只写 (input)。
   */
  run: (input: string, param: string) => string;
}

/** 需要第二个输入（正则表达式、对比文本、基准字号……）时才声明 */
export interface ToolParam {
  label: string;
  placeholder: string;
  /** 默认值 */
  value?: string;
  /** 文本域行数，默认 2 */
  rows?: number;
}

export interface ToolItem {
  key: string;
  title: string;
  desc: string;
  /** Element Plus 图标组件名（main.ts 里已全局注册） */
  icon: string;
  category: string;
  placeholder: string;
  /** 主输入框上方的标题，不填就不显示标题 */
  inputLabel?: string;
  /** 需要第二个输入时填这里：会在主输入框上方多渲染一个参数框 */
  param?: ToolParam;
  /** 输出按什么渲染：text（默认）是只读文本域，json 会额外给一棵可折叠的树 */
  output?: 'text' | 'json';
  actions: ToolAction[];
}

// ==================== 公共小工具 ====================
const needInput = (input: string, name = '内容') => {
  if (!input.trim()) throw new Error(`请先输入${name}`);
  return input;
};

const pad = (num: number) => String(num).padStart(2, '0');

const formatDateTime = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;

const toHex = (num: number) => num.toString(16).padStart(2, '0');

// ==================== JSON ====================
const parseJson = (input: string) => {
  if (!input.trim()) throw new Error('请先粘贴 JSON');
  try {
    return JSON.parse(input);
  } catch (error) {
    throw new Error(`JSON 解析失败：${(error as Error).message}`);
  }
};

// ==================== Base64（按 UTF-8 处理，直接 btoa 遇到中文会炸） ====================
const base64Encode = (input: string) => {
  const bytes = new TextEncoder().encode(needInput(input));
  let binary = '';
  bytes.forEach((byte) => (binary += String.fromCharCode(byte)));
  return btoa(binary);
};

const base64Decode = (input: string) => {
  let binary = '';
  try {
    binary = atob(needInput(input).trim());
  } catch {
    throw new Error('不是合法的 Base64 字符串');
  }
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
};

// JWT 用的是 base64url：把 +/ 换成 -_，而且经常省掉结尾的 = 补位，直接丢给 atob 会抛错
const base64UrlDecode = (part: string) => {
  const base64 = part.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
  const binary = atob(padded);
  return new TextDecoder().decode(Uint8Array.from(binary, (char) => char.charCodeAt(0)));
};

// ==================== URL ====================
const urlDecode = (input: string) => {
  try {
    return decodeURIComponent(needInput(input).trim());
  } catch {
    throw new Error('不是合法的 URL 编码字符串');
  }
};

const queryToJson = (input: string) => {
  // 允许整条 URL 粘进来，只取 ? 之后的部分
  const search = needInput(input)
    .trim()
    .replace(/^[^?]*\?/, '');
  const params = new URLSearchParams(search);
  const result: Record<string, string | string[]> = {};
  for (const key of Array.from(new Set(params.keys()))) {
    const values = params.getAll(key);
    result[key] = values.length > 1 ? values : (values[0] as string);
  }
  return JSON.stringify(result, null, 2);
};

// ==================== JWT ====================
const jwtDecode = (input: string) => {
  // 允许把 "Bearer xxx" 整段粘进来
  const token = needInput(input)
    .trim()
    .replace(/^Bearer\s+/i, '');
  const parts = token.split('.');
  if (parts.length < 2) throw new Error('不像 JWT：应该是 header.payload.signature 三段，用点分隔');
  let header: Record<string, unknown>;
  let payload: Record<string, unknown>;
  try {
    header = JSON.parse(base64UrlDecode(parts[0] ?? ''));
    payload = JSON.parse(base64UrlDecode(parts[1] ?? ''));
  } catch {
    throw new Error('JWT 的前两段不是合法的 Base64URL / JSON');
  }
  const lines = [`HEADER：${JSON.stringify(header)}`, `PAYLOAD：${JSON.stringify(payload, null, 2)}`];
  if (typeof payload.exp === 'number') {
    const expire = new Date(payload.exp * 1000);
    lines.push(`过期时间：${formatDateTime(expire)}（${Date.now() > expire.getTime() ? '已过期' : '未过期'}）`);
  }
  if (typeof payload.iat === 'number') lines.push(`签发时间：${formatDateTime(new Date(payload.iat * 1000))}`);
  return lines.join('\n');
};

// ==================== 时间 ====================
const timestampToDate = (input: string) => {
  const value = Number(needInput(input).trim());
  if (!Number.isFinite(value)) throw new Error('请输入纯数字时间戳，例如 1735689600');
  // 10 位是秒、13 位是毫秒，用数量级判断，比按位数猜稳
  const date = new Date(Math.abs(value) < 1e11 ? value * 1000 : value);
  if (Number.isNaN(date.getTime())) throw new Error('时间戳超出可表示范围');
  return [`本地时间：${formatDateTime(date)}`, `ISO 8601：${date.toISOString()}`, `秒级：${Math.floor(date.getTime() / 1000)}`].join('\n');
};

const dateToTimestamp = (input: string) => {
  const raw = needInput(input).trim();
  let value = /^\d+$/.test(raw) ? Number(raw) : Date.parse(raw);
  if (Number.isNaN(value)) value = Date.parse(raw.replace(/-/g, '/'));
  if (Number.isNaN(value)) throw new Error('无法识别的时间，可以试试 2026-09-16 17:48:30');
  return [`秒级：${Math.floor(value / 1000)}`, `毫秒级：${value}`].join('\n');
};

// ==================== 颜色 ====================
const parseHex = (input: string): [number, number, number] => {
  const hex = needInput(input).trim().replace(/^#/, '');
  const full =
    hex.length === 3
      ? hex
          .split('')
          .map((char) => char + char)
          .join('')
      : hex;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) throw new Error('请输入 3 位或 6 位 hex 颜色，例如 #6366f1');
  return [parseInt(full.slice(0, 2), 16), parseInt(full.slice(2, 4), 16), parseInt(full.slice(4, 6), 16)];
};

const rgbToHsl = ([red, green, blue]: [number, number, number]) => {
  const [r, g, b] = [red / 255, green / 255, blue / 255] as [number, number, number];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const lightness = (max + min) / 2;
  if (max === min) return `hsl(0 0% ${Math.round(lightness * 100)}%)`;
  const delta = max - min;
  const saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
  let hue: number;
  if (max === r) hue = ((g - b) / delta + (g < b ? 6 : 0)) / 6;
  else if (max === g) hue = ((b - r) / delta + 2) / 6;
  else hue = ((r - g) / delta + 4) / 6;
  return `hsl(${Math.round(hue * 360)} ${Math.round(saturation * 100)}% ${Math.round(lightness * 100)}%)`;
};

const parseRgb = (input: string): [number, number, number] => {
  const numbers = needInput(input)
    .match(/\d+(\.\d+)?/g)
    ?.slice(0, 3)
    .map((item) => Math.round(Number(item)));
  if (!numbers || numbers.length < 3 || numbers.some((item) => item > 255 || item < 0)) {
    throw new Error('请输入 0-255 的 rgb 值，例如 rgb(99, 102, 241)');
  }
  return [numbers[0] as number, numbers[1] as number, numbers[2] as number];
};

// ==================== 文本 ====================
const textStats = (input: string) => {
  const text = needInput(input);
  return [
    `字符数：${text.length}`,
    `去掉空白：${text.replace(/\s/g, '').length}`,
    `行数：${text.split('\n').length}`,
    `单词数：${text.trim().split(/\s+/).filter(Boolean).length}`,
  ].join('\n');
};

// ==================== 正则 ====================
const regexMatch = (input: string, param: string) => {
  const source = needInput(param, '正则表达式');
  let regex: RegExp;
  try {
    // 固定带 g，才能用 matchAll 找出全部匹配
    regex = new RegExp(source, 'g');
  } catch (error) {
    throw new Error(`正则不合法：${(error as Error).message}`);
  }
  const matches = Array.from(needInput(input, '测试文本').matchAll(regex));
  if (!matches.length) return '没有匹配到任何内容';
  const details = matches.map((match, index) => {
    const groups = match
      .slice(1)
      .map((group, groupIndex) => `    捕获组${groupIndex + 1}：${group ?? '(未参与匹配)'}`)
      .join('\n');
    return `  #${index + 1} 下标 ${match.index}：${match[0]}${groups ? `\n${groups}` : ''}`;
  });
  return [`共匹配到 ${matches.length} 处`, ...details].join('\n');
};

// ==================== 文本 Diff ====================
// 经典的 LCS 动态规划：逐行比对，输出「保留 / 删除 / 新增」
const diffLines = (input: string, param: string) => {
  const left = needInput(input, '原文本').split('\n');
  const right = needInput(param, '对比文本').split('\n');
  const table: number[][] = Array.from({ length: left.length + 1 }, () => new Array<number>(right.length + 1).fill(0));
  for (let i = left.length - 1; i >= 0; i--) {
    for (let j = right.length - 1; j >= 0; j--) {
      const row = table[i] ?? [];
      const below = table[i + 1] ?? [];
      row[j] = left[i] === right[j] ? (below[j + 1] ?? 0) + 1 : Math.max(below[j] ?? 0, row[j + 1] ?? 0);
    }
  }
  const lines: string[] = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] === right[j]) {
      lines.push(`  ${left[i]}`);
      i++;
      j++;
    } else if ((table[i + 1]?.[j] ?? 0) >= (table[i]?.[j + 1] ?? 0)) {
      lines.push(`- ${left[i]}`);
      i++;
    } else {
      lines.push(`+ ${right[j]}`);
      j++;
    }
  }
  while (i < left.length) lines.push(`- ${left[i++]}`);
  while (j < right.length) lines.push(`+ ${right[j++]}`);
  if (!lines.some((line) => line.startsWith('- ') || line.startsWith('+ '))) return '两段文本完全一致';
  return lines.join('\n');
};

// ==================== 数值 ====================
const numberBaseConvert = (input: string) => {
  const text = needInput(input).trim();
  let value: number;
  if (/^0x[0-9a-f]+$/i.test(text)) value = parseInt(text.slice(2), 16);
  else if (/^0b[01]+$/i.test(text)) value = parseInt(text.slice(2), 2);
  else if (/^0o[0-7]+$/i.test(text)) value = parseInt(text.slice(2), 8);
  else if (/^-?\d+$/.test(text)) value = parseInt(text, 10);
  else throw new Error('支持十进制 255、十六进制 0xff、二进制 0b1010、八进制 0o377');
  if (!Number.isSafeInteger(value)) throw new Error('数值超出安全整数范围');
  return [`十进制：${value}`, `十六进制：0x${value.toString(16)}`, `二进制：0b${value.toString(2)}`, `八进制：0o${value.toString(8)}`].join('\n');
};

const pxRemConvert = (input: string, param: string) => {
  const base = Number(needInput(param, '根字号').trim());
  if (!Number.isFinite(base) || base <= 0) throw new Error('根字号必须是大于 0 的数字');
  const matched = needInput(input)
    .trim()
    .match(/^(-?\d*\.?\d+)\s*(px|rem)?$/i);
  if (!matched) throw new Error('请输入形如 24px 或 1.5rem 的值');
  const value = Number(matched[1] ?? NaN);
  if (!Number.isFinite(value)) throw new Error('没识别出数字');
  const toRem = (matched[2] ?? 'px').toLowerCase() === 'px';
  // toFixed 后可能有 1.5000 这种尾巴，用 + 去掉
  return toRem ? `${+(value / base).toFixed(4)}rem（基准 ${base}px）` : `${+(value * base).toFixed(4)}px（基准 ${base}px）`;
};

// ==================== 工具清单 ====================
export const TOOLS: ToolItem[] = [
  {
    key: 'json',
    title: 'JSON 格式化',
    desc: '美化 / 压缩 / 校验，报错会带上具体位置',
    icon: 'DocumentCopy',
    category: '编码',
    output: 'json',
    placeholder: '粘贴一段 JSON，例如 {"name":"atlas","tags":["vue","vite"]}',
    actions: [
      { label: '格式化', run: (input) => JSON.stringify(parseJson(input), null, 2) },
      { label: '压缩', run: (input) => JSON.stringify(parseJson(input)) },
      { label: '转义成字符串', run: (input) => JSON.stringify(needInput(input).trim()) },
    ],
  },
  {
    key: 'base64',
    title: 'Base64 编解码',
    desc: '按 UTF-8 处理，中文不会乱码',
    icon: 'Key',
    category: '编码',
    placeholder: '输入要编码/解码的内容',
    actions: [
      { label: '编码', run: base64Encode },
      { label: '解码', run: base64Decode },
    ],
  },
  {
    key: 'url',
    title: 'URL 编解码',
    desc: 'encodeURIComponent / 解析查询参数',
    icon: 'Link',
    category: '编码',
    placeholder: '输入要编码的文本，或一段带 ?a=1&b=2 的地址',
    actions: [
      { label: '编码', run: (input) => encodeURIComponent(needInput(input)) },
      { label: '解码', run: urlDecode },
      { label: '解析成参数', run: queryToJson },
    ],
  },
  {
    key: 'jwt',
    title: 'JWT 解析',
    desc: '解出 header / payload，并判断是否过期',
    icon: 'Files',
    category: '编码',
    placeholder: '粘贴 token，可以带 Bearer 前缀',
    actions: [{ label: '解析', run: jwtDecode }],
  },
  {
    key: 'timestamp',
    title: '时间戳转换',
    desc: '秒 / 毫秒自动识别，本地时间与 ISO 一起给',
    icon: 'Timer',
    category: '时间',
    placeholder: '输入时间戳（1735689600）或时间（2026-09-16 17:48:30）',
    actions: [
      { label: '时间戳 → 时间', run: timestampToDate },
      { label: '时间 → 时间戳', run: dateToTimestamp },
      { label: '当前时间', run: () => `${formatDateTime(new Date())}\n秒级：${Math.floor(Date.now() / 1000)}\n毫秒级：${Date.now()}` },
    ],
  },
  {
    key: 'color',
    title: '颜色转换',
    desc: 'HEX / RGB / HSL 互转',
    icon: 'Brush',
    category: '颜色',
    placeholder: '输入 #6366f1 或 rgb(99, 102, 241)',
    actions: [
      {
        label: 'HEX → RGB / HSL',
        run: (input) => {
          const rgb = parseHex(input);
          return [`HEX：#${rgb.map(toHex).join('')}`, `RGB：rgb(${rgb.join(', ')})`, `HSL：${rgbToHsl(rgb)}`].join('\n');
        },
      },
      {
        label: 'RGB → HEX / HSL',
        run: (input) => {
          const rgb = parseRgb(input);
          return [`HEX：#${rgb.map(toHex).join('')}`, `RGB：rgb(${rgb.join(', ')})`, `HSL：${rgbToHsl(rgb)}`].join('\n');
        },
      },
    ],
  },
  {
    key: 'text',
    title: '文本处理',
    desc: '统计、去重、去空行、排序、反转行序',
    icon: 'Sort',
    category: '文本',
    placeholder: '每行一条，粘贴要处理的文本',
    actions: [
      { label: '统计', run: textStats },
      { label: '去重行', run: (input) => Array.from(new Set(needInput(input).split('\n'))).join('\n') },
      {
        label: '去掉空行',
        run: (input) =>
          needInput(input)
            .split('\n')
            .filter((line) => line.trim())
            .join('\n'),
      },
      {
        label: '按行排序',
        run: (input) =>
          needInput(input)
            .split('\n')
            .sort((a, b) => a.localeCompare(b))
            .join('\n'),
      },
      { label: '反转行序', run: (input) => needInput(input).split('\n').reverse().join('\n') },
    ],
  },
  {
    key: 'regex',
    title: '正则测试',
    desc: '找出全部匹配和捕获组，方便调表达式',
    icon: 'MagicStick',
    category: '文本',
    inputLabel: '测试文本',
    placeholder: '要匹配的文本',
    param: { label: '正则表达式（不带两边斜杠）', placeholder: '例如 (\\d+)-(\\d+)', value: '\\d+' },
    actions: [{ label: '开始匹配', run: regexMatch }],
  },
  {
    key: 'diff',
    title: '文本 Diff',
    desc: '按行对比两段文本，标出增删',
    icon: 'DocumentCopy',
    category: '文本',
    inputLabel: '原文本',
    placeholder: '改动前的文本',
    param: { label: '对比文本', placeholder: '改动后的文本', rows: 6 },
    actions: [{ label: '对比', run: diffLines }],
  },
  {
    key: 'numberBase',
    title: '进制转换',
    desc: '十 / 十六 / 二 / 八进制一次全给',
    icon: 'Odometer',
    category: '数值',
    placeholder: '输入 255、0xff、0b1010 或 0o377',
    actions: [{ label: '转换', run: numberBaseConvert }],
  },
  {
    key: 'pxRem',
    title: 'px / rem 换算',
    desc: '按指定根字号互转',
    icon: 'ScaleToOriginal',
    category: '数值',
    inputLabel: '要换算的值',
    placeholder: '24px 或 1.5rem',
    param: { label: '根字号（px）', placeholder: '16', value: '16', rows: 1 },
    actions: [{ label: '换算', run: pxRemConvert }],
  },
];
