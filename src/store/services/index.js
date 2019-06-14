import AuthProvider from './Providers/auth_provider'
import UserProvider from './Providers/user_provider'
import RoomProvider from './Providers/room_provider'
import ContactsProvider from './Providers/contacts_provider'
import CurrentRoomProvider from './Providers/current_room_provider'

// Give arg to provider to start endpoint with specific path for example = xxx.com/api/person
export const AuthService = new AuthProvider('auth');
export const UserService = new UserProvider('user');
export const RoomService = new RoomProvider('room');
export const ContactsService = new ContactsProvider('contacts');
export const CurrentRoomService = new CurrentRoomProvider('message');
