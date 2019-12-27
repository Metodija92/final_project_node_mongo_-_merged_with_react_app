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

    registerAccount = () => {
        this.setState({showRegister: !this.state.showRegister})
    }

    render() {
        return (
            <React.Fragment>
                {!this.state.showRegister ? <Login registerAccount={this.registerAccount}
                saveInputValue={this.saveInputValue} history={this.props.history} /> : null}
                {this.state.showRegister ? <Register registerAccount={this.registerAccount}
                saveInputValue={this.saveInputValue} history={this.props.history} /> : null}
            </React.Fragment>
        )
    }
}

export default Home