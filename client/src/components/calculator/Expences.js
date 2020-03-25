import React from 'react'
import Table from '../table/Table'
import { connect } from 'react-redux'

import { getProductsCall, getExpencesFiltered } from '../../redux/actions/productAction'
import '../../assets/css/Expences.css'

import Cookies from 'universal-cookie';
const cookies = new Cookies();


class Expences extends React.Component {
    constructor() {
        super()
        this.state = {
            showMonhtly: false,
            showYearly: true,
            toggle: true,
            filterValue: null,
            didUpdate: false,
            user_type: cookies.get('userInfo').user_type
        }
    }

    // Show yearly filter
    showYearly = () => {
        this.setState({
            showYearly: true,
            showMonhtly: false,
            toggle: true
        })
    }

    // Show montly filter
    showMonhtly = () => {
        this.setState({
            showYearly: false,
            showMonhtly: true,
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

    componentDidMount() {
        this.props.getProductsCall();
    }

    componentDidUpdate() {
        if (this.state.didUpdate) {
            let myDate = this.state.filterValue
            if (myDate === 'total') {
                this.props.getProductsCall();
            }
            else if (myDate.length === 4) { // Filter by year
                let fromTargetDate = new Date(`${myDate}-01-01 00:00:00.000`).getTime();
                let toTargetDate = new Date(`${myDate}-12-31 23:59:59.000`).getTime();
                this.props.getExpencesFiltered(fromTargetDate, toTargetDate, this.state.user_type);
            } else if (myDate.length === 7) { // Filter by month
                let fromTargetDate = new Date(`${myDate}-01 00:00:00.000`).getTime();
                let toTargetDate = new Date(`${myDate}-31 23:59:59.000`).getTime();
                this.props.getExpencesFiltered(fromTargetDate, toTargetDate, this.state.user_type);
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

                        {this.state.showMonhtly ?
                            <p className="select-box-container">
                                <label htmlFor="expenses-filter">Choose Month </label>
                                <input type='month' className="select-box" id="expenses-month-box" onChange={this.searchFilter}></input>
                            </p>
                            : null}

                        {this.state.showYearly ?
                            <p className="select-box-container">
                                <label htmlFor="expenses-filter">Choose Year </label>
                                <select name="expenses-filter" className="select-box" id="expenses-select-box" onChange={this.searchFilter}>
                                    <option>----</option>
                                    <option value={'total'}>Total</option>
                                    {selectOptions}
                                </select>
                            </p>
                            : null}

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
        products: state.productsReducer.products
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProductsCall: () => {
            dispatch(getProductsCall());
        },
        getExpencesFiltered: (fromTargetDate, toTargetDate, user_type) => {
            dispatch(getExpencesFiltered(fromTargetDate, toTargetDate, user_type));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Expences)
