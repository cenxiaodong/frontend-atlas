import type { StateTree } from 'pinia';
import type { PersistenceOptions } from 'pinia-plugin-persistedstate';
import type { PersistConfig } from '@/stores/interface/index';

/**
 * @description pinia 持久化参数配置
 * @param {String} key 存储到持久化的 name
 * @param {String} storage localStorage sessionStorage
 * @param {Array} pick 需要持久化的 state name
 * @param {Array} omit 除了这些字段，其他全部保存
 * @return persist
 *
 * 注意：必须显式指定 state 类型，例如 piniaPersistConfig<GlobalState>({ ... })。
 * 插件 v4 的 PersistenceOptions 带默认泛型参数 StateTree，省略类型参数时
 * defineStore 会把整个 store 的 state 推断成 StateTree（任意键都是 any），
 * 于是所有 state 属性失去类型和编辑器补全，且不会报错。
 * */
const piniaPersistConfig = <S extends StateTree>({ key, storage = localStorage, pick, omit }: PersistConfig<S>): PersistenceOptions<S> =>
  ({ key, storage, pick, omit }) as PersistenceOptions<S>;

export default piniaPersistConfig;
