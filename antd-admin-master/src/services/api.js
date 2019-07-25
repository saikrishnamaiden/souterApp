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
  deleteSingleCity : 'DELETE /cities/:id',
  addCity : 'POST /cities',
  updateCity : 'PUT /cities',
  getFeeback : '/feebacks',
  getSingleFeeback : '/feebacks/:id',
  deleteSingleFeeback : 'DELETE /feebacks/:id',
  addFeeback : 'POST /feebacks',
  updateFeeback : 'PUT /feebacks',
  getComment : '/comments',
  getSingleComment : '/comments/:id',
  deleteSingleComment : 'DELETE /comments/:id',
  addComment : 'POST /comments',
  updateComment : 'PUT /comments',
  getEvent : '/events',
  getSingleEvent : '/events/:id',
  deleteSingleEvent : 'DELETE /events/:id',
  addEvent : 'POST /events',
  updateEvent : 'PUT /events',
  getZipcode : '/zipcodes',
  getSingleZipcode : '/zipcodes/:id',
  deleteSingleZipcode : 'DELETE /zipcodes/:id',
  addZipcode : 'POST /zipcodes',
  updateZipcode : 'PUT /zipcodes',
  getSubComments : '/subcomments',
  getSingleSubComments : '/subcomments/:id',
  deleteSingleSubComments : 'DELETE /subcomments/:id',
  addSubComments : 'POST /subcomments',
  updateSubComments : 'PUT /subcomments',
}