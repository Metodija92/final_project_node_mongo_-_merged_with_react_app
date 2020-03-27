import React from 'react'
// eslint-disable-next-line
import { BrowserRouter as Router, Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { editThisProduct, changeNewToEditProduct } from '../../redux/actions/productAction'

import Cookies from 'universal-cookie';
const cookies = new Cookies();


class TableRow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user_type: cookies.get('userInfo').user_type
        }
    }

    // Send selected item to redux so it can be edited
    sendEditItemToStore = () => {
        let edit_this_product = {
            id: this.props.id,
            productName: this.props.productName,
            productType: this.props.productType,
            productDescription: this.props.productDescription,
            purchaseDate: this.props.purchaseDate,
            productPrice: this.props.productPrice
        }
        this.props.editThisProduct(edit_this_product);
        this.props.changeNewToEditProduct(true);
    }

    // Send product id to redux so it can be deleted
    sendDeleteIdToStore = () => {
        this.props.editThisProduct(this.props.id);
        this.props.deleteAlert()
    }

    render() {
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
                    {this.state.user_type === 'admin' ?
                    <button className="edit-del-btn far fa-trash-alt"
                        onClick={this.sendDeleteIdToStore}>
                    </button>
                    : null}
                </td> : null}
            </tr>
        )
    }

}

function mapDispatchToProps(dispatch) {
    return {
        editThisProduct: (edit_this_product) => {
            dispatch(editThisProduct(edit_this_product));
        },
        changeNewToEditProduct: (boolean) => {
            dispatch(changeNewToEditProduct(boolean));
        }
    };
}

export default connect(null, mapDispatchToProps)(TableRow)