import React from 'react'
import Login from './Login'
import Register from './Register'

class Home extends React.Component {
    constructor () {
        super()
        this.state = {
            showRegister: false
        }
    }

    // Show Login or Register page
    registerAccount = () => {
        this.setState({showRegister: !this.state.showRegister})
    }

    render() {
        return (
            <React.Fragment>
                {!this.state.showRegister ? 
                    <Login registerAccount={this.registerAccount}
                    history={this.props.history} /> 
                    : null
                }
                {this.state.showRegister ? 
                    <Register registerAccount={this.registerAccount}
                    history={this.props.history} loggedIn={false}/> 
                    : null
                }
            </React.Fragment>
        )
    }
}

export default Home