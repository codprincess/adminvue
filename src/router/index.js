import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Main from '@/views/Main'
import Table from '@/views/nav1/Table'
import Form from '@/views/nav1/Form'
import Userlist from '@/views/nav1/Userlist'
import LoginList from '@/views/nav2/LoginList'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '导航一',
      component: Home,
      iconCls:'el-icon-message',
      children:[
        { path: '/main', component: Main, name: '主页', hidden: true },
        {path:'/table',component:Table,name:'Table'},
        {path:'/form',component:Form,name:'Form'},
        {path:'/userlist',component:Userlist,name:'用户列表'}
      ]
    },
    {
      path: '/login',
      name: 'Login',
      hidden:true,
      component: Login
    },
    {
      path: '/',
      name: '导航二',
      component: Home,
      iconCls:'fa fa-id-card-o',
      children:[
        { path: '/loginlist', component: LoginList, name: '登录页面' },
        // {path:'/table',component:Table,name:'Table'},
        // {path:'/form',component:Form,name:'Form'},
        // {path:'/userlist',component:Userlist,name:'用户列表'}
      ]
    },
    // {
    //   path:
    // }

  ]
})
