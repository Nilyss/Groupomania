const apiEndpoints = {
  // **********  users endpoints **********
  //getRequest
  getAllUsers: '/users',
  getIdCurrentUser: '/jwtid',
  logout: '/logout',
  //post request
  signUp: '/signup',
  signIn: '/signin',
  //put Request
  updateUser: '/users',
  // delete request
  deleteUser: '/users',

  // ********** articles endpoints **********
  // get request
  getAllArticles: '/articles',
  //post request
  postArticle: '/articles',
  // put request
  editArticle: '/articles',
  //delete request
  deleteArticle: '/articles',

  // ********** comments endpoints **********
  //post request
  postComment: '/comment',
  // put request
  editComment: '/comment',
  // delete request
  deleteComment: '/comment/delete',

  // ********** likes endpoints **********
  //post request
  likes: '/like',
}
export default apiEndpoints
