import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import {Button} from 'antd'

import Login from './pages/login/login'
import Admin from './pages/admin/admin'


// 应用根组件
export default class App extends Component {
    constructor() {
        super()
    }

    render(){
        return (
           <BrowserRouter>
               <Switch>
                   <Route path="/login" component={Login}/>
                   <Route path="/" component={Admin}/>
               </Switch>
           </BrowserRouter>
        )
    }

}
