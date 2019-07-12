let api = {}

export default api = {
  queryRouteList: '/routes',

  queryUserInfo: '/user',
  logoutUser: '/user/logout',
  loginUser: 'POST /user/login',

  queryUser: '/user/:id',
  queryUserList: '/users',
  updateUser: 'Patch /user/:id',
  createUser: 'POST /user',
  removeUser: 'DELETE /user/:id',
  removeUserList: 'POST /users/delete',

  queryPostList: '/posts',

  queryDashboard: '/dashboard',
}


export const loopBackapi = {
  getCities : '/cities',
  getSingleCity : '/cities/:id',
  getFeeback : '/feebacks',
  getSingleFeeback : '/feebacks/:id',
}