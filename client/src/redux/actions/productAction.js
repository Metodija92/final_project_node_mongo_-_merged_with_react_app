import axios from 'axios'

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


// Thunk actions test

export const getProductsCall = () => {
    return async (dispatch) => {
        dispatch(getAllPostsStarted());
        axios.get("https://desolate-escarpment-53492.herokuapp.com/api/v1/products/?sort=purchaseDate:desc", 
        { headers: {"Authorization" : `Bearer ${localStorage.getItem('jwt')}`}})
        .then(res=>{
            dispatch({
                type: 'GET_PRODUCTS',
                payload: res.data
            });
        })
        .catch(err=>{
            dispatch(getAllPostsFailed());
            console.log(err);
        })
    }
}

export const getProductsSorted = (sortQuery) => {
    return async (dispatch) => {
        dispatch(getAllPostsStarted());
        axios.get(`https://desolate-escarpment-53492.herokuapp.com/api/v1/products/?sort=${sortQuery}`,
        { headers: {"Authorization" : `Bearer ${localStorage.getItem('jwt')}`}})
        .then(res=>{
            // store.dispatch(getProducts(res.data))
            dispatch({
                type: 'GET_PRODUCTS',
                payload: res.data
            });
            // store.dispatch(didUpdate(false))
            dispatch({
                type: 'DID_UPDATE',
                payload: false
            });
            console.log('did update')
        })
        .catch(err=>{
            dispatch(getAllPostsFailed());
            console.log(err)
        });
    }
}

export const getExpencesFiltered = (from, to) => {
    return async (dispatch) => {
        dispatch(getAllPostsStarted());
        axios.get(`https://desolate-escarpment-53492.herokuapp.com/api/v1/products/?date_from=${from}&date_to=${to}&sort=purchaseDate:desc`,
        { headers: {"Authorization" : `Bearer ${localStorage.getItem('jwt')}`}})
        .then(res=>{
            dispatch({
                type: 'GET_PRODUCTS',
                payload: res.data
            });
        })
        .catch(err=>{
            dispatch(getAllPostsFailed());
            console.log(err)
        })
    }
}

const getAllPostsStarted = () => {
    return {
        type: 'GET_ALL_POSTS_STARTED'
    }
}

const getAllPostsFailed = () => {
    return {
        type: 'GET_ALL_POSTS_FAILED'
    }
}
