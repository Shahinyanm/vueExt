import PageIndex from './pages/Index'
import LoginPage from './pages/Login'
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import FaqPage from './pages/FaqPage'

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
  },
  {
    path: '/faq',
    component: FaqPage,
    name:'faq'
  },
  {
    path: '/dashboard',
    component: DashboardPage,
    name:'dashboard'
  }


]
