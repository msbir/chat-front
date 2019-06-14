import HttpRequest from '../../../utils/http_request'

class MessagesProvider extends HttpRequest {

  constructor(prefix) {
    super();
    this.prefix = prefix;
  }

  sendMessage(data) {
    return this.create(this.prefix + '/send', data)
  }

  readMessage(data) {
    return this.create(this.prefix + '/read', data)
  }

  getRoomAndUserByMessageId(data) {
    return this.fetch(this.prefix + '/' + data.message_id)
  }

  sendMessageWhenOffline(data) {
    return this.create(this.prefix + '/sendWhenOffline', data)
  }

  setReadMessages(data) {
    // return this.create(this.prefix + '/readAll', data)
    return Promise.resolve()
  }

  deleteMessages(data) {
    // return this.create(this.prefix + '/eraseAll', data)
    return Promise.resolve()
  }

}

export default MessagesProvider
