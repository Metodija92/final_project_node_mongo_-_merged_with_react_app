import React from 'react'
// eslint-disable-next-line
import { BrowserRouter as Router, Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { changeNewToEditProduct } from '../../redux/actions/productAction'

import LogOut from './LogOut'
import galgadot from '../../assets/images/galgadot.jpg'

import Cookies from 'universal-cookie';
const cookies = new Cookies();

/* eslint-disable */
class Navbar extends React.Component {
    constructor(props) {
        super(props),
        this.state = {
            toggle: this.props.toggle,
            showLogOut: false,
            userInfo: cookies.get('userInfo')
        }
    }

    // Changes className of btn to get active color
    setProductsActive = () => {
        this.setState({
            productsClass: true,
            expencesClass: false
        })
        this.props.changeNewToEditProduct(false);
    }

    // Changes className of btn to get active color
    setExpencesActive = () => {
        this.setState({
            productsClass: false,
            expencesClass: true
        })
        this.props.changeNewToEditProduct(false);
    }

    // Show log out modal
    showLogOut = () => {
        this.setState({ showLogOut: !this.state.showLogOut })
    }

    render() {
        return (
            <React.Fragment>
                {!cookies.get('jwt') ? <Redirect to='/' /> : null}
                {this.state.showLogOut
                    ? <LogOut showLogOut={this.showLogOut} /> : 
                null}
                <div className="navbar-container">
                    <nav className="navbar">
                        <div className="button-container">
                            <Link to='/products' className='navbar-link'>
                                <button className={this.state.toggle === 'products' ? "navbar-button active" : "navbar-button"} onClick={this.setProductsActive}>
                                    PRODUCTS
                                </button>
                            </Link>
                            <Link to='/expences' className='navbar-link'>
                                <button className={this.state.toggle === 'expences' ? "navbar-button active" : "navbar-button"} onClick={this.setExpencesActive}>
                                    EXPENSES
                                </button>
                            </Link>
                        </div>
                        <div className="profile-container" >
                            <img src={galgadot} alt="#" className="profile-picture" />
                            <Link to='userinfo' className="user-name"> 
                                {this.state.userInfo.name + ' ' + this.state.userInfo.lastName}
                            </Link>
                            <i className="fas fa-sign-out-alt" id='log-out-btn' onClick={this.showLogOut}></i>
                        </div>
                    </nav>
                </div>
            </React.Fragment>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeNewToEditProduct: (boolean) => {
            dispatch(changeNewToEditProduct(boolean));
        }
    };
}

export default connect(null, mapDispatchToProps)(Navbar)