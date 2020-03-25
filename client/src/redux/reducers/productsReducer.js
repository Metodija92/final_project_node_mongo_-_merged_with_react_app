const initialUserState = {
    products: [],
    productToEdit: [],
    subUsers: [],
    showEditProduct: false,
    didUpdate: false,
    jwt: null,
    getAllPostsStarted: false,
    getAllPostsFailed: false,
    createOrEditStarted: false,
    createOrEditFailed: false,
    createUserStarted: false,
    createUserFailed: false
}

export function productsReducer (state = initialUserState, action) {
    switch(action.type) {
        case 'GET_JWT' : {
            return {
                ...state,
                jwt: action.payload
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
                getAllPostsStarted: false,
                getAllPostsFailed: false,
                products: action.payload
            }
        }
        case 'GET_ALL_POSTS_STARTED' : {
            return {
                ...state,
                getAllPostsStarted: true,
                getAllPostsFailed: false
            }
        }
        case 'GET_ALL_POSTS_FAILED' : {
            return {
                ...state,
                getAllPostsStarted: false,
                getAllPostsFailed: true
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