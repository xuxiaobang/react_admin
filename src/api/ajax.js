/**
 *  封装发送ajax请求的的函数模块
 *  封装ajax函数,返回promise对象
 *  优化部分
 *      1. 统一处理请求异常
 *          在外层在包裹一个自己创建的promise对象
 *          在请求出错的时候,不调用reject, 而是显示错误提示,这样,在调用这个ajax是只会返回成功后的promise
 *      2. 异步请求成功后得到的数据不是reponse,而是reponse.data
 *          所以在返回成功后的promise时只需要将reponse.data  resolve就可以了
 *
 * */
import axios from 'axios';
import {message} from 'antd'

export default function ajax(url, data={},type="GET"){
    return new Promise((resolve, reject) => {
        let promise;

        // 执行一步ajax请求
        if(type=="GET"){
            promise = axios.get(url,{
                params: data
            })
        }else{
            // 发送POST请求
            promise = axios.post(url, data)
        }

        // 2. 如果成功为, 就调用resolve,
        promise.then(res=>{
            resolve(res.data)

        // 3.  失败了不调用reject,直接提示异常
        }).catch(err => {
            message.error("请求出错了"+ err.message)

        })

    })
}
