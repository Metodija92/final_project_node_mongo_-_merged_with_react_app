import React from 'react'
import TableRow from './TableRow'
import {connect} from 'react-redux'

const TbodyData = (props) => {
    let new_data = []
    for (let i = 0; i < props.products.length; i++) {
        let dateTime = props.products[i].purchaseDate
        let date = dateTime.slice(0, 10)
        new_data.push(<TableRow key={props.products[i]._id}
                        id={props.products[i]._id}
                        productName={props.products[i].productName} 
                        productType={props.products[i].productType} 
                        productDescription={props.products[i].productDescription} 
                        purchaseDate={date} 
                        productPrice={props.products[i].productPrice}
                        {...props}/>
                     )
    }
    return (new_data)
}

function mapStateToProps (state) {
    return {
        products: state.productsReducer.products
    }
}

export default connect(mapStateToProps)(TbodyData)