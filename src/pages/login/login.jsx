import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import Logo from '../../assets/images/logo.png'
import './login.less'
import { Form, Icon, Input, Button, message } from 'antd';
import {reqLogin} from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

 class Login extends Component {
    constructor() {
        super()
    }

    // 表单提交事件函数
     handleSubmit = (e) => {
        // console.log(e)

         // 阻止提交默认刷新页面事件
         e.preventDefault()

         // 获取用户输入的内容
         this.props.form.validateFields( async (err,values) => {

             if(!err){
                 // 如果err为null 说明用户输入没有错误


                 // 取出数据, 发送登录
                 let {username, password}  = values
                 let result = await reqLogin(username, password)
                 // console.log(result)

                 // 判断登录是否成功
                 if(result.status == 0){
                    // 登录成功
                     message.success("登录成功")

                     // 登录成功后为了保证属性后不需要重复登录, 可以通过本地存储保存user
                     const user = result.data
                     console.log(user)
                     memoryUtils.user = user; // 保存到内存中
                     storageUtils.saveUser(user); // 保存到localstorage中


                     // 登录成功后跳转页面
                     this.props.history.replace("/")
                 }else{
                     // 登录失败
                     // 弹出提示信息
                     message.error(result.msg)
                 }
             }
             else{
                 // 用户输入内容有错误,验证失败
                 alert("验证失败")
             }

             // console.log(err)
             // console.log(values)

             /**
              * 得到form对象,通过this.props.form
              * */
         })
     }


    // 自定义验证函数
     validatorPwd = (rule, value, callback) => {
        // console.log(rule,value, callback)
         /*
           用户名/密码的的合法性要求
             1). 必须输入
             2). 必须大于等于4位
             3). 必须小于等于12位
             4). 必须是英文、数字或下划线组成
            */

         if(!value){
             callback("密码必须输入")
         }else if(value.length < 4 ){
             callback("密码至少4位")
         }else if(value.length > 12){
             callback("密码最多12位")
         }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
             callback("密码必须由字母数字下划线组成")
         }else{
             callback()  // 验证通过
         }

         // callback("XXX") 验证失败, 并指定提示文本
     }

    render(){

        // 验证内存是否有值, 有的话就表示登录成功,自动跳转到管理页面
        const user = storageUtils.getUser();
        console.log(user)
        if(user && user._id){
            return <Redirect to="/" />
        }


        // console.log(this.props)
        let {getFieldDecorator} = this.props.form
        return (
            <div className="login">
                <header className="login-header">
                    <img src={Logo} alt="logo"/>
                    <h1 className="title">React后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form className="login-form" onSubmit={this.handleSubmit}>
                        <Form.Item >
                            {
                                /*
                              用户名/密码的的合法性要求
                                1). 必须输入
                                2). 必须大于等于4位
                                3). 必须小于等于12位
                                4). 必须是英文、数字或下划线组成
                               */
                            }

                            {
                                getFieldDecorator('username',{
                                    // 配置对象,配置对象就是属性名是特定的名称
                                    // 声明式验证, 直接使用别人定义好的规则进行验证
                                    rules:[
                                        {required:true,message: '用户名必须输入'},
                                        {min:4,message: '用户名至少4位'},
                                        {max:12,message: '用户名最多12位'},
                                        {pattern: /^[a-zA-Z0-9_]+$/, message: '用户必须是字母数字下划线组成'}
                                    ],
                                    initialValue:"admin"
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="用户名"
                                    />
                                )
                            }



                        </Form.Item>
                        <Form.Item >
                            {
                                getFieldDecorator('password',{
                                    rules:[
                                        {
                                            validator: this.validatorPwd
                                        }
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="密码"
                                    />
                                )
                            }


                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }

}

export default Form.create()(Login)
// export default Login
