import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index/Index'
import FavoritesUser from '@/views/Users/FavoritesUser'
import UserProfile from '@/views/Profile/UserProfile'
import Login from '@/views/login/Login'
import freeSignup from '@/views/Register/FreeSignup'
import Signup from '@/views/Register/Signup'
import SignupInput from '@/views/Register/SignupInput'
import SignupPassword from '@/views/Register/SignupPassword'
import RegisterProfile from '@/views/Register/RegisterProfile'
import Chat from '@/views/Chat/Chat.vue'
import Rooms from '@/views/Rooms/Rooms'
import Settings from '@/views/Settings/Settings'
import Unauthorized from '@/views/layout/Unauthorized'
import { toUnicode } from 'punycode';



Vue.use(Router);


const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/favorites-user',
      name: 'FavoritesUser',
      component: FavoritesUser
    },
    {
      path: '/user-profile/:user_id',
      name: 'user-profile',
      component: UserProfile,
    },
    {
      path: '/rooms',
      name: 'Rooms',
      component: Rooms
    },

    {
      path: '/chat/:room_id',
      name: 'chat',
      component: Chat
    },

    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/free-signup',
      name: 'free-signup',
      component: freeSignup
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/signup-input',
      name: 'signup-input',
      component: SignupInput,
      props: true
    },
    {
      path: '/signup-password',
      name: 'signup-password',
      component: SignupPassword,
      props: true
    },

    {
      path: '/register-profile',
      name: 'register-profile',
      component: RegisterProfile
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: Unauthorized
    },
    {
      path: '/chat/t/:room_id',
      name: 'temp',
      component: Chat
    },
  ]
})

router.beforeEach((to, from, next) => {
  window.scrollTo(0, window.offsetTop);
  next()
})
export default router;
