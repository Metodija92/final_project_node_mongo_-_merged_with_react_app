import React from 'react'
import { connect } from 'react-redux'
// eslint-disable-next-line
import { BrowserRouter as Router, Link } from 'react-router-dom'

import Table from '../table/Table'
import Alert from './Alert'
import SelectUserOptions from '../SelectUserOptions/SelectUserOptions'

import { changeNewToEditProduct, getProductsCall, getProductsSorted, getSubUser } from '../../redux/actions/productAction'
import '../../assets/css/Products.css'

import Cookies from 'universal-cookie';
const cookies = new Cookies();



class Products extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showProducts: true,
            showAlert: false,
            didUpdate: this.props.didUpdate,
            sort: "purchaseDate:desc",
            user_type: cookies.get('userInfo').user_type,
            user_sort: cookies.get('userInfo').user_type
        }
    }

    // Show modal - Delete Alter
    deleteAlert = () => {
        this.setState({ showAlert: !this.state.showAlert })
    }

    // Updates component after deleting product, sent as prop so <Alert />
    productDeleted = () => {
        this.setState({ didUpdate: true })
    }

    // Triggers sort order onClick in select box
    sortProduct = (event) => {
        this.setState({
            didUpdate: true,
            sort: event.target.value
        })
    }

    getUserForSort = (event) => {
        this.setState({
            user_sort: event.target.value,
            didUpdate: true
        })
        setTimeout(() => {
            console.log(this.state.user_sort)
        }, 1000)
    }

    componentDidMount() {
        if(this.state.user_type === 'admin') {
            this.props.getSubUser();
        }
        this.props.getProductsCall();
        // Give time to Mongo to write data before going in update(Mongo returns OK while data in Quee to be written)
        setTimeout(() => {
            this.setState({ didUpdate: this.props.didUpdate })
        }, 500)
    }

    // ***Triggers after deleting, editing, sorting or creating new product***
    componentDidUpdate() {
        if (this.state.didUpdate === true) {
            this.props.getProductsSorted(this.state.sort, this.state.user_sort);
            this.setState({
                didUpdate: false,
                sort: "purchaseDate:desc"
            })
            console.log('Did update')
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.state.showAlert
                    ? <Alert deleteAlert={this.deleteAlert} productDeleted={this.productDeleted} />
                    : null}
                {/* *****Narednava linija ja renderira <Navbar/> a toggle mu treba za da se dodade klasa na kopceto Products da bide zeleno*****  */}
                <this.props.component toggle={'products'} />
                <div id="products">
                    <div id="products-header">
                        <h1>Products</h1>
                        <p className="select-box-container">
                            {this.state.user_type === 'admin' && this.props.subUsers ? 
                                <SelectUserOptions 
                                    subUsers={this.props.subUsers}
                                    getUserForSort={this.getUserForSort}
                                /> : 
                            null}
                            <label htmlFor="purchase-filter">Sort by:</label>
                            <select name="purchase-filter" className="select-box" onChange={this.sortProduct}>
                                <option value="purchaseDate:desc">Latest Purchase</option>
                                <option value="productPrice:desc">Highest Price</option>
                                <option value="productPrice:asc">Lowest Price</option>
                                <option value="purchaseDate:asc">First Purchase</option>
                            </select>
                        </p>
                    </div>
                    <Table showProducts={this.state.showProducts} deleteAlert={this.deleteAlert} />
                </div>
                <Link to='/newproduct' ><button id="new-btn" onClick={() => { this.props.changeNewToEditProduct(false) }}>NEW PRODUCT</button></Link>
            </React.Fragment>

        )
    }
}

function mapStateToProps(state) {
    return {
        products: state.productsReducer.products,
        didUpdate: state.productsReducer.didUpdate,
        subUsers: state.productsReducer.subUsers
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProductsCall: () => {
            dispatch(getProductsCall());
        },
        changeNewToEditProduct: (boolean) => {
            dispatch(changeNewToEditProduct(boolean));
        },
        getProductsSorted: (sortQuery, user_type) => {
            dispatch(getProductsSorted(sortQuery, user_type));
        },
        getSubUser: () => {
            dispatch(getSubUser())
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)