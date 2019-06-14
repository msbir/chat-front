import HttpRequest from '../../../utils/http_request'

class RoomProvider extends HttpRequest {

  constructor(prefix){
    super();
    this.prefix = prefix;
  }

  createRoom (data) {
    return this.create(this.prefix + '/', data)
  }
  getRoomByUsers(data) {
    return this.create(this.prefix + '/getByUsers', data);
  }
  getRoom (data) {
    return this.fetch(this.prefix + '/' + data.room_id)
  }
  getRoomMessages (data) {
    return this.create(this.prefix + '/messages', data);
  }
}

export default RoomProvider
