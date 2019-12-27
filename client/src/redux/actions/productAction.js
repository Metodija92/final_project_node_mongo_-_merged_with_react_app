export function getJwt (data) {
    return {
        type: 'GET_JWT',
        payload: data
    }
}

export function getProducts (data) {
    return {
        type: 'GET_PRODUCTS',
        payload: data
    }
}

export function didUpdate (newState) {
    return {
        type: 'DID_UPDATE',
        state: newState
    }
}

export function changeNewToEditProduct (newState) {
    return {
        type: 'CHANGE_NEW_TO_EDIT',
        state: newState
    }
}

export function editThisProduct 
(id, productName, productType, productDescription, purchaseDate, productPrice) {
    return {
        type: 'EDIT_THIS_PRODUCT',
        payload: {
            id, productName, productType, productDescription, purchaseDate, productPrice
        }
    }
}


