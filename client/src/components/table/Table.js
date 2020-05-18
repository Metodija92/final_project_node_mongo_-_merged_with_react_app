import React from 'react'
import TbodyData from './TbodyData'

import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Table extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user_type: cookies.get('userInfo').user_type
        }
    }
    
    render() {
        return (
            <div className="products-table-container">
                <table className="products-table">
                    <thead className="products-table-head">
                        <tr>
                            <th>Product Name</th>
                            <th>Product Type</th>
                            <th>Product Description</th>
                            <th>Purchase Date</th>
                            <th>Product Price</th>
                            {this.props.showProducts ? 
                                <th>Edit {this.state.user_type === 'admin' ? '/ Delete' : null}</th> 
                            : null}
                        </tr>
                    </thead>
                    <tbody className="products-table-body">
                        <TbodyData {...this.props}/>
                    </tbody>
                </table>
            </div>
        )
    }
}


export default Table