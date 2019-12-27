const initialUserState = {
    products: [],
    productToEdit: [],
    showEditProduct: false,
    didUpdate: false,
    jwt: null
}

export function productsReducer (state = initialUserState, action) {
    switch(action.type) {
        case 'GET_JWT' : {
            return {
                ...state,
                jwt: action.payload
            }
        }
        case 'GET_PRODUCTS' : {
            return {
                ...state,
                products: action.payload
            }
        }
        case 'DID_UPDATE' : {
            return {
                ...state,
                didUpdate: action.state
            }
        }
        case 'CHANGE_NEW_TO_EDIT' : {
            return {
                ...state,
                showEditProduct: action.state
            }
        }
        case 'EDIT_THIS_PRODUCT' : {
            return {
                ...state,
                productToEdit: [{id: action.payload.id,
                    productName: action.payload.productName,
                    productType: action.payload.productType,
                    productDescription: action.payload.productDescription,
                    purchaseDate: action.payload.purchaseDate,
                    productPrice: action.payload.productPrice}]
            }
        }
        default: {
            return {...state}
        }
    }
}