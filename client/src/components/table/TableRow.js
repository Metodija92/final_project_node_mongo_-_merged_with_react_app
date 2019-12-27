import React from 'react'
import store from '../../redux/store'
import {editThisProduct, changeNewToEditProduct} from '../../redux/actions/productAction'
// eslint-disable-next-line
import { BrowserRouter as Router, Link } from 'react-router-dom'


class TableRow extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            
        }
    }

    sendEditItemToStore = () => {
        store.dispatch(editThisProduct(this.props.id,
            this.props.productName,
            this.props.productType,
            this.props.productDescription,
            this.props.purchaseDate,
            this.props.productPrice))
        store.dispatch(changeNewToEditProduct(true))
    }

    sendDeleteIdToStore = () => {
        store.dispatch(editThisProduct(this.props.id))
        this.props.deleteAlert()
    }

    render () {
        return (
            <tr>
                <td>{this.props.productName}</td>
                <td>{this.props.productType}</td>
                <td>{this.props.productDescription}</td>
                <td>{this.props.purchaseDate}</td>
                <td>{this.props.productPrice}</td>
                {this.props.showProducts ? <td>
                    <Link to='/editproduct'>
                        <button className="edit-del-btn far fa-edit"
                            onClick={this.sendEditItemToStore}>
                        </button>
                    </Link>
                    <button className="edit-del-btn far fa-trash-alt" 
                        onClick={this.sendDeleteIdToStore}>
                    </button>
                </td> : null}
            </tr>  
        )
    }
    
}

export default TableRow