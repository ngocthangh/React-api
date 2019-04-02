import React, { Component } from 'react';
import callApi from '../../utils/apiCaller'
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../actions/index';


class ProductActionPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            txtName: '',
            txtPrice: '',
            chkbStatus: false
        }
    }
    componentDidMount(){
        var {match, location} = this.props;
        console.log(location);
        if(match && match.params.id && location){
            console.log(match);
            this.setState({
                id: match.params.id,
                txtName: location.state.product.name,
                txtPrice: location.state.product.price,
                chkbStatus: location.state.product.status});
        }
        
    }
    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name] : value
        })
    }
    onSave = (e) => {
        e.preventDefault();
        console.log(this.state);
        var { txtName, txtPrice, chkbStatus } = this.state;
        var {history} = this.props;
        
        var product = {
            id: this.state.id,
            name: txtName,
            price: txtPrice,
            status: chkbStatus
        }
        this.props.onSaveProduct(product);
        history.push('/product-list')
    }
    render() {
        var formName = this.state.id ? 'Sửa Sản Phẩm' : 'Tạo Sản Phẩm';
        return (
            
            <div className="row">
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    
                    <form onSubmit={this.onSave}>
                        <legend>{formName}</legend>
                    
                        <div className="form-group">
                            <label>Tên sản phẩm</label>
                            <input type="text" 
                                className="form-control" 
                                name="txtName" 
                                placeholder="Input field"
                                value={this.state.txtName}
                                onChange={this.onChange}
                                />
                        </div>
                    
                        <div className="form-group">
                            <label>Giá sản phẩm</label>
                            <input type="number" 
                                className="form-control" 
                                name="txtPrice" 
                                placeholder="Input field"
                                value={this.state.txtPrice}
                                onChange={this.onChange}
                                />
                        </div>
                        
                        <div className="form-group">
                            <label>Trạng thái</label>
                            
                            <div className="checkbox">
                                <label>
                                    <input 
                                        type="checkbox" 
                                        name="chkbStatus" 
                                        checked={this.state.chkbStatus}
                                        onChange={this.onChange}
                                        />
                                    Còn hàng
                                </label>
                            </div>
                            
                        </div>
                    
                        <button type="submit" className="btn btn-primary mr-10">Submit</button>
                        <Link to='/product-list' className='btn btn-danger'>Cancel</Link>
                    </form>
                    
                </div>
            </div>
            
        );
    }
}


const mapDispatchToProps = (dispatch, props) => {
    return {
        onSaveProduct: (product) => {
            dispatch(actions.actAddProductRequest(product));
        }
    }
}

export default connect(null, mapDispatchToProps)(ProductActionPage);