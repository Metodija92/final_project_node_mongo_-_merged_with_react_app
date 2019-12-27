import React from 'react'
// eslint-disable-next-line
import { BrowserRouter as Router, Link, Redirect } from 'react-router-dom'

import store from '../../redux/store'
import {changeNewToEditProduct} from '../../redux/actions/productAction'

import LogOut from './LogOut'
import galgadot from '../../assets/images/galgadot.jpg'
/* eslint-disable */
class Navbar extends React.Component {
    constructor(props) {
        super(props),
        this.state = {
            toggle: this.props.toggle,
            showLogOut: false
        }
    }

    setProductsActive = () => {
        this.setState({
            productsClass: true,
            expencesClass: false
        })
        store.dispatch(changeNewToEditProduct(false))
    }
    setExpencesActive = () => {
        this.setState({
            productsClass: false,
            expencesClass: true
        })
        store.dispatch(changeNewToEditProduct(false))
    }

    showLogOut = () => {
        this.setState({showLogOut: !this.state.showLogOut})
    }

    render() {
        return (
            <React.Fragment>
                {!localStorage.getItem('jwt') ? <Redirect to='/'/> : null}
                { this.state.showLogOut 
                ? <LogOut showLogOut={this.showLogOut}/> 
                : null}
                <div className="navbar-container">
                    <nav className="navbar">
                        <div className="button-container">
                            <Link to='/products'>
                                <button className={this.state.toggle? "navbar-button active" : "navbar-button"} onClick={this.setProductsActive}>
                                    PRODUCTS
                                </button>
                            </Link> 
                            <Link to='/expences'>
                                <button className={!this.state.toggle? "navbar-button active" : "navbar-button"} onClick={this.setExpencesActive}>
                                    EXPENSES
                                </button>
                            </Link>
                        </div>
                        <div className="profile-container">
                            <img src={galgadot} alt="#" className="profile-picture"/>
                            <a href="#" className="user-name" onClick={this.showLogOut}>
                                {localStorage.getItem('name') + ' ' + localStorage.getItem('lastName')}</a>
                        </div>
                    </nav>
                </div>
            </React.Fragment>
        )
    }
}

export default Navbar