import React from 'react'
// eslint-disable-next-line
import { BrowserRouter as Router, Link } from 'react-router-dom'

import { connect } from 'react-redux'
import { editThisProduct, changeNewToEditProduct } from '../../redux/actions/productAction'


class TableRow extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    sendEditItemToStore = () => {
        this.props.editThisProduct(
            this.props.id,
            this.props.productName,
            this.props.productType,
            this.props.productDescription,
            this.props.purchaseDate,
            this.props.productPrice);
        this.props.changeNewToEditProduct(true);
    }

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
                    <button className="edit-del-btn far fa-trash-alt"
                        onClick={this.sendDeleteIdToStore}>
                    </button>
                </td> : null}
            </tr>
        )
    }

}

function mapDispatchToProps(dispatch) {
    return {
        editThisProduct: (id, name, type, description, date, price) => {
            dispatch(editThisProduct(id, name, type, description, date, price));
        },
        changeNewToEditProduct: (boolean) => {
            dispatch(changeNewToEditProduct(boolean));
        }
    };
}

export default connect(null, mapDispatchToProps)(TableRow)