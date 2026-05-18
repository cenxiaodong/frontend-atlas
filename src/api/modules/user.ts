import type { ResPage, User } from '@/api/interface/index';
// import { PORT1 } from '@/api/config/servicePort';
import http from '@/api';
export const getUserList = (params: User.ReqUserParams) => {
  return http.post<ResPage<User.ResUserList>>('geeker' + `/user/list`, params, {
    cancel: false,
  });
};
