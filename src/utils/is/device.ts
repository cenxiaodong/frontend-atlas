/**
 * @description:判断是否为移动端设备
 * @returns {boolean} true: 移动端, false: PC端
 */

export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;

  const userAgent = navigator.userAgent.toLowerCase();
  const mobileRegex = /(phone|pad|iphone|ipad|android|mobile|mobi)/i;

  // User Agent 匹配 或者 屏幕宽度小于 768px
  return mobileRegex.test(userAgent) || window.innerWidth < 768;
};
