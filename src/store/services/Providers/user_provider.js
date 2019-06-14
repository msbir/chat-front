import HttpRequest from '../../../utils/http_request'

class AuthProvider extends HttpRequest {

  constructor(prefix) {
    super();
    this.prefix = prefix;
  }
  fetchCurrentUser() {
    return this.fetch(this.prefix + '/')
  }
  getUserRooms() {
    return this.fetch(this.prefix + '/rooms')
  }
  registerGuestUser(data) {
    return this.create(this.prefix + '/update-main', data)
  }
  registerInfo(data) {
    return this.create(this.prefix + '/update-secondary', data)
  }
}

export default AuthProvider
