import React from 'react'
import store from '../../redux/store'
import {createNewProduct, editExistingProduct} from '../../redux/actions/productAction'
import {connect} from 'react-redux'

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

    // Save input values to state when creating new product
    saveInputValue = (event) => {
        this.setState({[event.target.id]: event.target.value})
    }

    // Create product
    createNewProduct = (event) => {
        // Check if all inputs have been filled
        if(this.state.productName === null ||
            this.state.productType === null ||
            this.state.productDescription === null ||
            this.state.purchaseDate === null ||
            this.state.productPrice === null){
                event.preventDefault()
                alert('Please fill out all the fields')
        } else {// Create product axios call
            store.dispatch(createNewProduct(
                this.state.productName,
                this.state.productType,
                this.state.productDescription,
                this.state.purchaseDate,
                this.state.productPrice)
            )
        }
    }

    // Edit product
    editProduct = (event) => {
        // Check if all inputs have been filled
        if(this.state.productName === '' ||
            this.state.productType === '' ||
            this.state.productDescription === '' ||
            this.state.purchaseDate === '' ||
            this.state.productPrice === null) {
                alert('All fields must be filled out')
                event.preventDefault()
        } else { // Edit product axios call
            store.dispatch(editExistingProduct(this.props.productToEdit.id,
                this.state.productName,
                this.state.productType,
                this.state.productDescription,
                this.state.purchaseDate,
                this.state.productPrice)
            )
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