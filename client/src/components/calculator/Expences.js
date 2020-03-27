import React from 'react'
import Table from '../table/Table'
import { connect } from 'react-redux'

import SelectUserOptions from '../SelectUserOptions/SelectUserOptions'

import { getProductsCall, getExpencesFiltered, getSubUser, getProductsSorted } from '../../redux/actions/productAction'
import '../../assets/css/Expences.css'

import Cookies from 'universal-cookie';
const cookies = new Cookies();


class Expences extends React.Component {
    constructor() {
        super()
        this.state = {
            showYearly: true,
            toggle: true,
            filterValue: 'total',
            didUpdate: false,
            user_type: cookies.get('userInfo').user_type,
            user_sort: cookies.get('userInfo').user_type
        }
    }

    // Show yearly filter
    showYearly = () => {
        this.setState({
            showYearly: true,
            toggle: true
        })
    }

    // Show montly filter
    showMonhtly = () => {
        this.setState({
            showYearly: false,
            toggle: false
        })
    }

    // Get filter value
    searchFilter = (event) => {
        this.setState({
            filterValue: event.target.value,
            didUpdate: true
        })
    }

    // When admin is logged in enables to sort/filter by sub-user
    getUserForSort = (event) => {
        this.setState({
            user_sort: event.target.value,
            didUpdate: true
        })
    }

    componentDidMount() {
        if(this.state.user_type === 'admin') {
            this.props.getSubUser();
        }
        this.props.getProductsCall(this.state.user_type);
    }

    // Triggers after selecting filter option
    componentDidUpdate() {
        if (this.state.didUpdate) {
            let myDate = this.state.filterValue
            if (myDate === 'total') {
                this.props.getProductsCall(this.state.user_sort);
            }
            else if (myDate.length === 4) { // Filter by year
                let fromTargetDate = new Date(`${myDate}-01-01 00:00:00.000`).getTime();
                let toTargetDate = new Date(`${myDate}-12-31 23:59:59.000`).getTime();
                this.props.getExpencesFiltered(fromTargetDate, toTargetDate, this.state.user_sort);
            } else if (myDate.length === 7) { // Filter by month
                let fromTargetDate = new Date(`${myDate}-01 00:00:00.000`).getTime();
                let toTargetDate = new Date(`${myDate}-31 23:59:59.000`).getTime();
                this.props.getExpencesFiltered(fromTargetDate, toTargetDate, this.state.user_sort);
            }
            this.setState({ didUpdate: false })
        }
    }

    render() {
        // Total spent
        let totalSpent = 0
        for (let i = 0; i < this.props.products.length; i++) {
            totalSpent += this.props.products[i].productPrice
        }
        // Options for selectbox - Year
        let today = new Date();
        let year = today.getFullYear();
        let selectOptions = []
        for (let i = 2000; i <= year; i++) {
            selectOptions.push(<option key={i} value={i}>{i}</option>)
        }
        selectOptions.reverse();

        return (
            <React.Fragment>
                {/* *****Narednava linija ja renderira <Navbar/> a toggle mu treba za da se dodade klasa na kopceto Expences da bide zeleno*****  */}
                <this.props.component toggle={'expences'} />
                <div id="expenses">
                    <div id="expenses-header-one">
                        <h1>Expenses</h1>
                    </div>

                    <div id="expenses-header-two">
                        <button className={this.state.toggle ? "tab-btn active-tab-btn " : "tab-btn"}
                            onClick={this.showYearly}>YEARLY
                        </button>
                        <button className={!this.state.toggle ? "tab-btn active-tab-btn " : "tab-btn"}
                            onClick={this.showMonhtly}>MONTHLY
                        </button>

                        <p className="select-box-container">
                            {this.state.user_type === 'admin' && this.props.subUsers ? 
                                this.props.subUsers.length > 0 ?
                                    <SelectUserOptions 
                                        subUsers={this.props.subUsers}
                                        getUserForSort={this.getUserForSort}
                                    /> 
                                : null
                            : null}
                            {this.state.showYearly ?
                                <React.Fragment>
                                <label htmlFor="expenses-filter">Choose Year </label>
                                <select name="expenses-filter" className="select-box" id="expenses-select-box" onChange={this.searchFilter}>
                                    <option>----</option>
                                    <option value={'total'}>Total</option>
                                    {selectOptions}
                                </select> 
                                </React.Fragment> :
                                <React.Fragment>
                                <label htmlFor="expenses-filter">Choose Month </label>
                                <input type='month' className="select-box" id="expenses-month-box" onChange={this.searchFilter}></input>
                                </React.Fragment>
                            }
                        </p> 

                    </div>
                    <Table />
                </div>
                <div id="total-spent">
                    <p>Total Spent: {totalSpent} den.</p>
                </div>
            </React.Fragment>

        )
    }
}

function mapStateToProps(state) {
    return {
        products: state.productsReducer.products,
        subUsers: state.productsReducer.subUsers
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProductsCall: (user_type) => {
            dispatch(getProductsCall(user_type));
        },
        getExpencesFiltered: (fromTargetDate, toTargetDate, user_type) => {
            dispatch(getExpencesFiltered(fromTargetDate, toTargetDate, user_type));
        },
        getProductsSorted: (sortQuery, user_type) => {
            dispatch(getProductsSorted(sortQuery, user_type));
        },
        getSubUser: () => {
            dispatch(getSubUser())
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Expences)
