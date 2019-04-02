import * as Types from '../constants/ActionType';

var initialState0 = [
    {
        id: 1,
        name: 'Iphone 6',
        price: 4000,
        status: true
    },{
        id: 2,
        name: 'Samsung galaxy',
        price: 45000,
        status: false
    },{
        id: 3,
        name: 'Oppo f2',
        price: 444400,
        status: true
    }
];

var initialState = [];

var findIndex = (products, id) => {
    for(var i in products){
        if(products[i].id === id){
            return i;
        }
    }
    return -1;
}

const products = (state=initialState, action) => {
    switch(action.type){
        case Types.FETCH_PRODUCTS:
            state = action.products;
            return [...state];
        case Types.DELETE_PRODUCT:
            var id = action.id;
            var index = findIndex(state, id);
            if(index >= 0){
                state.splice(index, 1);
            }
            return [...state];
        case Types.ADD_PRODUCT:
            var {product} = action;
            state.push(product);
            return [...state];
        case Types.UPDATE_PRODUCT:
            product = action.product;
            index = findIndex(state, product.id);
            if(index >= 0){
                state[index] = product;
            }
            return [...state];
        default: return [...state];
    }
}

export default products;