/**
 * 根据api接口文档定义不同的接口请求函数
 * 包含应用中所有的接口请求函数模块
 * 每个函数返回的都是promise
 *
 * */
import ajax from './ajax'

let BASEURL = ''

export  const reqLogin = (username,password) => ajax(BASEURL+"/login", {username,password}, "POST")