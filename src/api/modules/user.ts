import type { ResPage, User } from '@/api/interface/index';
import { PORT1 } from '@/api/config/servicePort';
// import { ContentTypeEnum } from '@/enums/httpEnum';
import http from '@/api';
export const getUserList = (params: User.ReqUserParams) => {
  return http.post<ResPage<User.ResUserList>>('geeker' + `/user/list`, params, {
    cancel: false,
    loading: true,
  });
};
export const getMenuList = () => {
  return http.get<Menu.MenuOptions[]>(`${PORT1}/menu/list`, {}, { loading: false });
};
