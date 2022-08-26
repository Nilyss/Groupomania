const apiEndpoints = {
  // **********  users endpoints **********
  //getRequest
  getAllUsers: '/users',
  getIdCurrentUser: '/jwtid',
  logout: '/logout',
  //post request
  signUp: '/signup',
  signIn: '/signin',

  // ********** articles endpoints **********
  // get request
  getAllArticles: '/articles',
  //post request
  postArticle: '/articles',
  // put request
  editArticle: '/articles/:id',
  //delete request
  deleteArticle: '/articles/:id',

  // ********** comments endpoints **********
  //post request
  postComment: '/comment',
  deleteComment: '/comment/delete',
  // put request
  editComment: '/comment',

  // ********** likes endpoints **********
  //post request
  likes: '/articles/:id/like',
}
export default apiEndpoints
