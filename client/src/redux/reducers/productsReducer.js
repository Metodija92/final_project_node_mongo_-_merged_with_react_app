const initialUserState = {
    products: [],
    productToEdit: [],
    subUsers: [],
    showEditProduct: false,
    didUpdate: false,
    jwt: null,
    getAllProductsStarted: false,
    getAllProductsFailed: false,
    createOrEditStarted: false,
    createOrEditFailed: false,
    createUserStarted: false,
    createUserFailed: false,
    userLoginStarted: false,
    userLoginFailed: false
}

export function productsReducer (state = initialUserState, action) {
    switch(action.type) {
        case 'GET_JWT' : {
            return {
                ...state,
                jwt: action.payload
            }
        }
        case 'USER_LOGIN_STARTED' : {
            return {
                ...state,
                userLoginStarted: true,
                userLoginFailed: false
            }
        }
        case 'USER_LOGIN_FAILED' : {
            return {
                ...state,
                userLoginStarted: false,
                userLoginFailed: true
            }
        }
        case 'USER_LOGIN_SUCCESS' : {
            return {
                ...state,
                userLoginStarted: false,
                userLoginFailed: false
            }
        }
        case 'CREATE_USER_STARTED' : {
            return {
                ...state,
                createUserStarted: true,
                createUserFailed: false
            }
        }
        case 'CREATE_USER_FAILED' : {
            return {
                ...state,
                createUserStarted: false,
                createUserFailed: true
            }
        }
        case 'CREATE_USER_SUCCESS' : {
            return {
                ...state,
                createUserStarted: false,
                createUserFailed: false
            }
        }
        case 'GET_SUB_USER' : {
            return {
                ...state,
                subUsers: action.payload
            }
        }
        case 'GET_PRODUCTS' : {
            return {
                ...state,
                getAllProductsStarted: false,
                getAllProductsFailed: false,
                products: action.payload
            }
        }
        case 'GET_ALL_PRODUCTS_STARTED' : {
            return {
                ...state,
                getAllProductsStarted: true,
                getAllProductsFailed: false
            }
        }
        case 'GET_ALL_PRODUCTS_FAILED' : {
            return {
                ...state,
                getAllProductsStarted: false,
                getAllProductsFailed: true
            }
        }
        case 'CREATE_OR_EDIT_PRODUCT_STARTED' : {
            return {
                ...state,
                createOrEditStarted: true,
                createOrEditFailed: false
            }
        }
        case 'CREATE_OR_EDIT_PRODUCT_FAILED' : {
            return {
                ...state,
                createOrEditStarted: false,
                createOrEditFailed: true
            }
        }
        case 'CREATE_OR_EDIT_PRODUCT_SUCCESS' : {
            return {
                ...state,
                createOrEditStarted: false,
                createOrEditFailed: false
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
                productToEdit: [action.payload]
            }
        }
        default: {
            return {...state}
        }
    }
}