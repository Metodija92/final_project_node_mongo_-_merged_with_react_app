import React from 'react'
import { connect } from 'react-redux'
import '../../assets/css/Alert.css'
import store from '../../redux/store'
import {deleteProduct} from '../../redux/actions/productAction'


const Alert = (props) => {

    // Delete axios call and turn off Alert modal
    function deleteThisProduct() {
        store.dispatch(deleteProduct(props.id))
        props.deleteAlert()
        setTimeout(() => {
            props.productDeleted()
        }, 500);
    }

    return (
        <div className="alert">
            <div className="alert-container">
                <div className="alert-text-container">
                    <h1>Delete Product</h1>
                    <p>You are about to delete this product. Are you sure you wish to continue ?</p>
                </div>
                <div className="alert-buttons">
                    <button className="alert-btn cancel-alert-btn" 
                    onClick={props.deleteAlert}>CANCEL</button>
                    <button className="alert-btn delete-alert-btn" 
                    onClick={deleteThisProduct}>DELETE</button>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps (state) {
    return {
        id: state.productsReducer.productToEdit[0].id
    }
}

export default connect(mapStateToProps)(Alert)
