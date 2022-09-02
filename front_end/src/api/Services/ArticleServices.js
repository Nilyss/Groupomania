import Article from '../Models/Article'
import {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
} from '../ApiCalls/apiCall'

export default class ArticleServices {
  // ********** Article request **********

  // get request
  async getArticle() {
    const req = await getRequest('/articles')
    const res = req.data
    return res.map((data) => new Article(data))
  }

  // post request
  async postArticle(data) {
    return await postRequest('/articles', data)
  }

  // put request
  async putArticle(id, data) {
    return await putRequest('/articles/' + id, data)
  }

  // delete request
  async deleteArticle(id) {
    return await deleteRequest('/articles/' + id)
  }

  // ********** Comment request **********

  // post request
  async postComment(id, data) {
    return await postRequest('/articles/' + id + '/comment', data)
  }
  async deleteComment(id, data) {
    return await postRequest('/articles/' + id + '/comment/delete', data)
  }

  // put request
  async putComment(id, data) {
    return await putRequest('/articles/' + id + '/comment', data)
  }

  // ********** Like request **********

  // post request
  async postLike(id, data) {
    return await postRequest('/articles/' + id + '/like', data)
  }
}
