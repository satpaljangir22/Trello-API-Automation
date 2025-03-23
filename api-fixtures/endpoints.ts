export const endpoints = {
  baseUrl: () => `https://reqres.in`,
  listUsers: (page_num: number) => `/api/users?${page_num}`,
  singleUser: (user_id: number) => `/api/users/${user_id}`,
  createUser: () => `/api/users`,
  listResources: () => `/api/unknown`,
  singleResource: (user_id: number) => `/api/unknown/${user_id}`,
};
