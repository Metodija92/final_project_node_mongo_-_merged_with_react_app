import axios from 'axios'

import Cookies from 'universal-cookie';
const cookies = new Cookies();

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

export function editThisProduct (edit_this_product) {
    return {
        type: 'EDIT_THIS_PRODUCT',
        payload: edit_this_product
    }
}


// Thunk actions test

export const userLoginIn = (email, password, history) => {
    return async (dispatch) => {
        dispatch(userLoginStarted());
        axios.post('/api/v1/auth/login', {
            email,
            password
        })
        .then(res=>{
            dispatch(userLoginSuccess());
            cookies.set('userInfo', {
                'name': res.data.first_name,
                'lastName': res.data.last_name,
                'email': res.data.email,
                'status': res.data.status,
                'birthday': res.data.birthday,
                'country': res.data.country,
                'telephone': res.data.telephone,
                'user_type': res.data.user_type,
                'user_id': res.data.user_id,
                'supervisor_id': res.data.supervisor_id
            });
            cookies.set('jwt', res.data.jwt);
        })
        .then(() => {
            history.push("/products")
        })
        .catch(err=>{
            dispatch(userLoginFailed());
            console.log(err.response.data);
        });
    }
}

export const userRegister = (createUserData, history) => {
    return async (dispatch) => {
        dispatch(createUserStarted());
        axios.post('/api/v1/auth/register', {
            ...createUserData,
            user_type: 'admin',
            _created: new Date(),
        })
        .then(res => {
            setTimeout(() => {
                dispatch(userLoginIn(createUserData.email, createUserData.password, history))
                dispatch(createUserSuccess());
            }, 1000);
        })
        .catch(err=>{
            dispatch(createUserFailed())
            dispatch({
                type: 'GET_ERROR_MESSAGE',
                payload: err.response.data
            })
            // console.log(err.response.data)
        });
    }
}

export const subUserRegister = (createUserData) => {
    return async (dispatch) => {
        dispatch(createUserStarted());
        axios.post('/api/v1/auth/register', {
            ...createUserData,
            user_type: 'user',
            _created: new Date(),
        })
        .then(res => {
            setTimeout(() => {
                dispatch(createUserSuccess());
            }, 1000);
        })
        .catch(err=>{
            dispatch(createUserFailed())
            dispatch({
                type: 'GET_ERROR_MESSAGE',
                payload: err.response.data
            })
            // console.log(err.response.data)
        });
    }
}

export const getSubUser = () => {
    return async (dispatch) => {
        axios.get('/api/v1/auth/find-users', 
        { headers: {"Authorization" : `Bearer ${cookies.get('jwt')}`}})
        .then(res => {
            dispatch({
                type: 'GET_SUB_USER',
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
        });
    }
}

export const getProductsCall = (user_type) => {
    return async (dispatch) => {
        dispatch(getAllProductsStarted());
        axios.get(`/api/v1/products/?sort=purchaseDate:desc&user_type=${user_type}`, 
        { headers: {"Authorization" : `Bearer ${cookies.get('jwt')}`}})
        .then(res=>{
            dispatch({
                type: 'GET_PRODUCTS',
                payload: res.data
            });
        })
        .catch(err=>{
            dispatch(getAllProductsFailed());
            console.log(err);
        })
    }
}

export const getProductsSorted = (sortQuery, user_type) => {
    return async (dispatch) => {
        dispatch(getAllProductsStarted());
        axios.get(`/api/v1/products/?sort=${sortQuery}&user_type=${user_type}`,
        { headers: {"Authorization" : `Bearer ${cookies.get('jwt')}`}})
        .then(res=>{
            dispatch({
                type: 'GET_PRODUCTS',
                payload: res.data
            });
            dispatch({
                type: 'DID_UPDATE',
                payload: false
            });
        })
        .catch(err=>{
            dispatch(getAllProductsFailed());
            console.log(err)
        });
    }
}


export const getExpencesFiltered = (from, to, user_type) => {
    return async (dispatch) => {
        dispatch(getAllProductsStarted());
        axios.get(`/api/v1/products/?date_from=${from}&date_to=${to}&sort=purchaseDate:desc&user_type=${user_type}`,
        { headers: {"Authorization" : `Bearer ${cookies.get('jwt')}`}})
        .then(res=>{
            dispatch({
                type: 'GET_PRODUCTS',
                payload: res.data
            });
        })
        .catch(err=>{
            dispatch(getAllProductsFailed());
            console.log(err)
        })
    }
}

export const createNewProduct = (newProduct) => {
    return async (dispatch) => {
        dispatch(createOrEditStarted());
        axios.post('/api/v1/products/', {
            ...newProduct,
            _created: new Date()
        }, { headers: {"Authorization" : `Bearer ${cookies.get('jwt')}`}})
        .then(res => {
            // console.log(res);
            dispatch(createOrEditSuccess());
            dispatch({
                type: 'DID_UPDATE',
                state: true
            });
        })
        .catch(err => {
            dispatch(createOrEditFailed());
            console.log(err);
        });
    }
}

export const editExistingProduct = (id, edit_product) => {
    return async (dispatch) => {
        dispatch(createOrEditStarted());
        axios.put(`/api/v1/products/${id}`, {
            ...edit_product,
            _modified: new Date()
        }, { headers: {"Authorization" : `Bearer ${cookies.get('jwt')}`}})
        .then(res => {
            // console.log(res);
            dispatch(createOrEditSuccess());
            dispatch({
                type: 'CHANGE_NEW_TO_EDIT',
                state: false
            });
            dispatch({
                type: 'DID_UPDATE',
                state: true
            });
        })
        .catch(err => {
            console.log(err);
            dispatch(createOrEditFailed());
            alert('All the fields must be filled out in order to edit your product succesfuly!')
        });
    }
}

export const deleteProduct = (id) => {
    return async () => {
        axios.delete(`/api/v1/products/${id}`,
        { headers: {"Authorization" : `Bearer ${cookies.get('jwt')}`}})
        .then(res => {
            // console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
    }
}

const userLoginStarted = () => {
    return {
        type: 'USER_LOGIN_STARTED'
    }
}

const userLoginFailed = () => {
    return {
        type: 'USER_LOGIN_FAILED'
    }
}

const userLoginSuccess = () => {
    return {
        type: 'USER_LOGIN_SUCCESS'
    }
}

const createUserStarted = () => {
    return {
        type: 'CREATE_USER_STARTED'
    }
}

const createUserFailed = () => {
    return {
        type: 'CREATE_USER_FAILED'
    }
}

const createUserSuccess = () => {
    return {
        type: 'CREATE_USER_SUCCESS'
    }
}

const getAllProductsStarted = () => {
    return {
        type: 'GET_ALL_PRODUCTS_STARTED'
    }
}

const getAllProductsFailed = () => {
    return {
        type: 'GET_ALL_PRODUCTS_FAILED'
    }
}

const createOrEditStarted = () => {
    return {
        type: 'CREATE_OR_EDIT_PRODUCT_STARTED'
    }
}

const createOrEditFailed = () => {
    return {
        type: 'CREATE_OR_EDIT_PRODUCT_FAILED'
    }
}

const createOrEditSuccess = () => {
    return {
        type: 'CREATE_OR_EDIT_PRODUCT_SUCCESS'
    }
}
