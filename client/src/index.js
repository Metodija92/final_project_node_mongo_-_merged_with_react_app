import ReactDOM from 'react-dom'
import React from 'react'
import Home from './components/home/Home'
import Products from './components/calculator/Products'
import Navbar from './components/navbar/Navbar'
import Expences from './components/calculator/Expences'
import NewProduct from './components/newProduct/NewProduct'
import ResetPasswordInputs from './components/home/ResetPasswordInputs'


import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './redux/store'
import './assets/css/shared.css'


const app = document.getElementById('root')


const Routes = () => {
    return (
        <Router>
            {/* <Navbar /> */}
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/products' render={() =>  <Products component={Navbar}/>}/>
                <Route exact path='/expences' render={() => <Expences component={Navbar}/>}/>
                <Route exact path='/newproduct' render={() => <NewProduct component={Navbar}/>}/>
                <Route exact path='/editproduct' render={() => <NewProduct component={Navbar}/>}/>
                {/* <Route exact path='/userinfo' render={}/> */}
                <Route path='/resetpassword/:resethash/:email' component={ResetPasswordInputs} />
            </Switch>
        </Router>
    )
}

ReactDOM.render(
    <Provider store={store}>
        <Routes/>
    </Provider>, app)