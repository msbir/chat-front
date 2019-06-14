import HttpRequest from '../../../utils/http_request'

class UsersProvider extends HttpRequest {

  constructor(prefix) {
    super();
    this.prefix = prefix;
  }

  getUsers() {
    return this.fetch(this.prefix + '/')
  }
  getFavorites() {
    return this.fetch(this.prefix + '/favorites')
  }
  careateFavorites(data) {
    return this.create(this.prefix + '/favoritesToggle', data)
  }
}

export default UsersProvider
