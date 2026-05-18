import type { PersistenceOptions } from 'pinia-plugin-persistedstate';

/**
 * @description pinia 持久化参数配置
 * @param {String} key 存储到持久化的 name
 * @param {String} storage localStorage sessionStorage
 * @param {Array} pick 需要持久化的 state name
 * @param {Array} omit 除了这些字段，其他全部保存
 * @return persist
 * */
const piniaPersistConfig = (key: string, pick?: string[], omit?: string[]) => {
  const persist: PersistenceOptions = {
    key,
    storage: localStorage,
    pick,
    omit,
  };
  return persist;
};

export default piniaPersistConfig;
