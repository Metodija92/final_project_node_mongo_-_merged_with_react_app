import React from 'react'
import { connect } from 'react-redux'
// eslint-disable-next-line
import { BrowserRouter as Router, Link } from 'react-router-dom'

import Table from '../table/Table'
import Alert from './Alert'

import { changeNewToEditProduct, getProductsCall, getProductsSorted } from '../../redux/actions/productAction'
import '../../assets/css/Products.css'


class Products extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showProducts: true,
            showAlert: false,
            didUpdate: this.props.didUpdate,
            sort: "purchaseDate:desc"
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

    componentDidMount() {
        this.props.getProductsCall();
        // Give time to Mongo to write data before going in update(Mongo returns OK while data in Quee to be written)
        setTimeout(() => {
            this.setState({ didUpdate: this.props.didUpdate })
        }, 500)
    }

    // ***Triggers after deleting, editing or creating new product***
    componentDidUpdate() {
        if (this.state.didUpdate === true) {
            this.props.getProductsSorted(this.state.sort);
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
                        <p id="select-box-container">
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
        didUpdate: state.productsReducer.didUpdate
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
        getProductsSorted: (sortQuery) => {
            dispatch(getProductsSorted(sortQuery));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)