import React, { Component } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import ProductItem from '../../components/ProductItem/ProductItem';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as actions from '../../actions/index';

class ProductListPage extends Component {
    componentDidMount(){
        this.props.fetchAllProducts();
    }
    onDelete = (id) => {
        // eslint-disable-next-line no-restricted-globals
        // if(confirm('Bạn thực sự muốn xóa sản phẩm này?')){
        //     console.log(id)
        //     callApi(`products/${id}`, 'DELETE', null).then(res => {
        //         console.log(res);
        //         if(res.status === 200) {
        //             var { products } = this.state;
        //             var index = this.findIndex(products, id);
        //             if(index >= 0) {
        //                 products.splice(index, 1);
        //                 this.setState({products: products});
        //             }
        //         }
        //     })
        // }
        this.props.onDeleteProduct(id);
    }
    findIndex(products, id){
        for(var i in products){
            if(products[i].id === id){
                return i;
            }
        }
        return -1;
    }
    render() {
        var {products} = this.props;
        // var {products} = this.state;
        
        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">

                <Link to="product/add" className="btn btn-info mb-10">Thêm Sản Phẩm</Link>

                <ProductList>
                    {this.showProducts(products)}
                </ProductList>

            </div>
        );
    }
    showProducts(products){
        return products.map((product, index) => (
            <ProductItem key={index} onDelete={this.onDelete} product={product} index={index}/>
        ))
    }
}


const mapStateToProps = state => {
    return {
        products: state.products
    }
}

const mapDispathToProps = (dispatch, props) => {
    return{
        fetchAllProducts: () => {
            dispatch(actions.actFetchProductsRequest());
        },
        onDeleteProduct: (id) => {
            dispatch(actions.actDeleteProductRequest(id));
        }
    }
}

export default connect(mapStateToProps, mapDispathToProps)(ProductListPage);