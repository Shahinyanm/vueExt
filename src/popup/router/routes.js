import PageIndex from './pages/Index'
import LoginPage from './pages/Login'
import HomePage from './pages/HomePage'

export default [
  {
    path: '/',
    component: PageIndex,
    name:'register'
  },
  {
    path: '/login',
    component: LoginPage,
    name:'login'
  },

  {
    path: '/home',
    component: HomePage,
    name:'home'
  }
]
