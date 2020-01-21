import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import '../../assets/css/Alert.css'

const Alert = (props) => {

    function deleteThisProduct() {
        axios.delete(`https://desolate-escarpment-53492.herokuapp.com/api/v1/products/${props.id}`,
        { headers: {"Authorization" : `Bearer ${localStorage.getItem('jwt')}`}})
        .then(res => {
            props.deleteAlert()
            props.productDeleted()
        })
        .catch(err => {
            console.log(err);
        });
        
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
