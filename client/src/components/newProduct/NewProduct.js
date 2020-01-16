import React from 'react'
import store from '../../redux/store'
import {didUpdate, changeNewToEditProduct} from '../../redux/actions/productAction'
import {connect} from 'react-redux'

import axios from 'axios'
// eslint-disable-next-line
import { BrowserRouter as Router, Link } from 'react-router-dom'
import '../../assets/css/NewProduct.css'

class NewProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showEditProduct: this.props.showEditProduct,
            productName: this.props.showEditProduct ? this.props.productToEdit.productName : null,
            productType: this.props.showEditProduct ? this.props.productToEdit.productType : null,
            productDescription: this.props.showEditProduct ? this.props.productToEdit.productDescription : null,
            purchaseDate: this.props.showEditProduct ? this.props.productToEdit.purchaseDate : null,
            productPrice: this.props.showEditProduct ? this.props.productToEdit.productPrice : null
        }
    }

    saveInputValue = (event) => {
        this.setState({[event.target.id]: event.target.value})
    }

    createNewProduct = (event) => {
        if(this.state.productName === null ||
            this.state.productType === null ||
            this.state.productDescription === null ||
            this.state.purchaseDate === null ||
            this.state.productPrice === null){
                event.preventDefault()
                alert('Please fill out all the fields')
        } else if( this.state.productName != null &&
            this.state.productType != null &&
            this.state.productDescription != null &&
            this.state.purchaseDate != null &&
            this.state.productPrice != null) {
            
            axios.post('https://desolate-escarpment-53492.herokuapp.com/api/v1/products/', {
                productName: this.state.productName,
                productType: this.state.productType,
                productDescription: this.state.productDescription,
                purchaseDate: this.state.purchaseDate,
                productPrice: this.state.productPrice,
                _created: new Date()
            }, { headers: {"Authorization" : `Bearer ${localStorage.getItem('jwt')}`}})
            .then(res => {
            // console.log(res);
            })
            .catch(err => {
            console.log(err);
            });
            store.dispatch(didUpdate(true))
        }
    }

    editProduct = (event) => {

        if(this.state.productName === '' ||
            this.state.productType === '' ||
            this.state.productDescription === '' ||
            this.state.purchaseDate === '' ||
            this.state.productPrice === 0) {
                alert('All fields must be filled out')
                event.preventDefault()
        } else {
            axios.put(`https://desolate-escarpment-53492.herokuapp.com/api/v1/products/${this.props.productToEdit.id}`, {
                productName: this.state.productName,
                productType: this.state.productType,
                productDescription: this.state.productDescription,
                purchaseDate: this.state.purchaseDate,
                productPrice: this.state.productPrice,
                _modified: new Date()
            }, { headers: {"Authorization" : `Bearer ${localStorage.getItem('jwt')}`}})
            .then(res => {
            // console.log(res);
            })
            .catch(err => {
            console.log(err);
            alert('All the fields must be filled out in order to edit your product succesfuly!')
            });
            store.dispatch(didUpdate(true))
            store.dispatch(changeNewToEditProduct(false))
        }
    }

    render() {
        return (
            <React.Fragment>
                {/* *****Narednava linija ja renderira <Navbar/> a toggle mu treba za da se dodade klasa na kopceto Products da bide zeleno*****  */}
                <this.props.component toggle={true}/>
                <div id="newproduct-header">
                    <h1>New Product</h1>
                </div>
    
                <div id="newproduct">
                    <div className="box-container" id="add-new-product-container">
                        <form action="">
                                <p className="input-container">
                                    <label className="text-field-label">Product Name</label> <br/>
                                    <input type="text" className="text-field-input"
                                    id='productName'
                                    onChange={this.saveInputValue}
                                    defaultValue={this.state.showEditProduct ? 
                                                this.props.productToEdit.productName : 
                                                null} />
                                </p>
                                <p className="input-container">
                                    <label className="text-field-label">Product Type</label> <br/>
                                    <input type="text" className="text-field-input"
                                    id='productType'
                                    onChange={this.saveInputValue} 
                                    defaultValue={this.state.showEditProduct ? 
                                                this.props.productToEdit.productType : 
                                                null} />
                                </p>
                                <p className="input-container">
                                    <label className="text-field-label">Product Description</label> <br/>
                                    <input type="text" className="text-field-input"
                                    id='productDescription'
                                    onChange={this.saveInputValue} 
                                    defaultValue={this.state.showEditProduct ? 
                                                this.props.productToEdit.productDescription : 
                                                null} />
                                </p>
                                <p className="input-container">
                                    <label className="text-field-label">Purchase Date</label> <br/>
                                    <input type="date" className="text-field-input"
                                    id='purchaseDate'
                                    onChange={this.saveInputValue} 
                                    defaultValue={this.state.showEditProduct ? 
                                                this.props.productToEdit.purchaseDate : 
                                                null} />
                                </p>
                                <p className="input-container">
                                    <label className="text-field-label">Product Price</label> <br/>
                                    <input type="text" className="text-field-input"
                                    id='productPrice'
                                    onChange={this.saveInputValue} 
                                    defaultValue={this.state.showEditProduct ? 
                                                this.props.productToEdit.productPrice : 
                                                null} />
                                </p>
                                <Link to='/products'>
                                    {!this.state.showEditProduct ? 
                                        <button className="primary-button long" id="create-btn" 
                                        onClick={this.createNewProduct}>CREATE PRODUCT</button> :
                                        <button className="primary-button long" id="create-btn" 
                                        onClick={this.editProduct}>EDIT PRODUCT</button>
                                    }
                                </Link>
                        </form>
                    </div>
    
                    <div id="new-product-shadow-container">
                        <p><i className="fas fa-plus-circle fa-5x"></i></p>
                        {!this.state.showEditProduct ? <p>You are creating a new product</p> : 
                        <p>You are editing your product</p>}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

function mapStateToProps (state) {
    return {
        products: state.productsReducer.products,
        productToEdit: state.productsReducer.productToEdit[0],
        showEditProduct: state.productsReducer.showEditProduct
    }
}

export default connect(mapStateToProps)(NewProduct)