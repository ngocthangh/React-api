import React, { Component } from 'react';
import callApi from '../../utils/apiCaller';
import { Link } from 'react-router-dom';

class ProductItem extends Component {
    render() {
        var { product, index } = this.props;
        var statusName = product.status ? 'Còn Hàng' : 'Hết Hàng';
        var statusClass = product.status ? 'warning' : 'default';
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                    <span className={`label label-${statusClass}`}>{statusName}</span>
                </td>
                <td>
                    <Link to={{
                        pathname: `product/${product.id}/edit`,
                        state: {
                            product: product
                        }
                        }} params={{ product: product }} 
                        className="btn btn-success mr-10">Sửa</Link>

                <button type="button" className="btn btn-danger" onClick={() => this.deleteItem(product.id)}>Xóa</button>

                </td>
            </tr >
        );
    }
    deleteItem(id) {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Bạn thực sự muốn xóa sản phẩm này?')) {
            this.props.onDelete(id);
        }
    }
}

export default ProductItem;