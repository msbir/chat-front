import HttpRequest from '../../../utils/http_request'

class AuthProvider extends HttpRequest {

  constructor(prefix) {
    super();
    this.prefix = prefix;
  }
  register() {
    return this.create(this.prefix + '/register')
  }
  login(data) {
    return this.create(this.prefix + '/login', data)
  }
}

export default AuthProvider
