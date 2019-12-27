import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
// eslint-disable-next-line
import { BrowserRouter as Router, Link } from 'react-router-dom'

import Table from '../table/Table'
import Alert from './Alert'

import store from '../../redux/store'
import {getProducts, didUpdate, changeNewToEditProduct} from '../../redux/actions/productAction'
import '../../assets/css/Products.css'


class Products extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showProducts: true,
            showAlert: false,
            didUpdate: false,
            sort: null
        }
    }

    deleteAlert = () => {
        this.setState({showAlert: !this.state.showAlert})
    }

    productDeleted = () => {
        this.setState({didUpdate: true})
    }

    filterProduct = (event) => {
        this.setState({
            didUpdate: true,
            sort: event.target.value
        })
    }

    componentDidMount(){
        axios.get("https://desolate-escarpment-53492.herokuapp.com/api/v1/products/?sort=purchaseDate:desc", 
        { headers: {"Authorization" : `Bearer ${localStorage.getItem('jwt')}`}})
        .then(res=>{
            store.dispatch(getProducts(res.data))
            this.setState({didUpdate: this.props.didUpdate})
            console.log('didMount')
        })
        .catch(err=>{
            console.log(err)
        })
    }

    // ***Trigira posle brishenje na proizvod i posle edit / create new***
    componentDidUpdate() {
        if(this.state.didUpdate === true) {
            if(this.state.sort === null) {
                axios.get("https://desolate-escarpment-53492.herokuapp.com/api/v1/products/?sort=purchaseDate:desc",
                { headers: {"Authorization" : `Bearer ${localStorage.getItem('jwt')}`}})
                .then(res=>{
                    store.dispatch(getProducts(res.data))
                    store.dispatch(didUpdate(false))
                    console.log('didUpdate')
                })
                .catch(err=>{
                    console.log(err)
                })
                this.setState({didUpdate: false})
            } else if(this.state.sort != null) {
                axios.get(`https://desolate-escarpment-53492.herokuapp.com/api/v1/products/?sort=${this.state.sort}`,
                { headers: {"Authorization" : `Bearer ${localStorage.getItem('jwt')}`}})
                .then(res=>{
                    store.dispatch(getProducts(res.data))
                    store.dispatch(didUpdate(false))
                    console.log('didUpdate')
                })
                .catch(err=>{
                    console.log(err)
                })
                this.setState({
                    didUpdate: false,
                    sort: null
                })
            } else {
                console.log('Error kaj Products - compDidUpdate!')
            }
        }
    }

    render () {
        return (
            <React.Fragment>
                { this.state.showAlert 
                ? <Alert deleteAlert={this.deleteAlert} productDeleted={this.productDeleted}/> 
                : null}
                {/* *****Narednava linija ja renderira <Navbar/> a toggle mu treba za da se dodade klasa na kopceto Products da bide zeleno*****  */}
                <this.props.component toggle={true}/>
                <div id="products">
                    <div id="products-header">
                        <h1>Products</h1>
                        <p id="select-box-container">
                            <label htmlFor="purchase-filter">Sort by:</label>
                            <select name="purchase-filter" className="select-box" onChange={this.filterProduct}>
                                <option value="purchaseDate:desc">Latest Purchase</option>
                                <option value="productPrice:desc">Highest Price</option>
                                <option value="productPrice:asc">Lowest Price</option>
                                <option value="purchaseDate:asc">First Purchase</option>
                            </select>
                        </p>
                    </div>
                    <Table showProducts={this.state.showProducts} 
                            deleteAlert={this.deleteAlert}/>
                </div>
                <Link to='/newproduct' ><button id="new-btn" onClick={()=>{store.dispatch(changeNewToEditProduct(false))}}>NEW PRODUCT</button></Link>
            </React.Fragment>
            
        )
    }
}

function mapStateToProps (state) {
    return {
        products: state.productsReducer.products,
        didUpdate: state.productsReducer.didUpdate
    }
}

export default connect(mapStateToProps)(Products)