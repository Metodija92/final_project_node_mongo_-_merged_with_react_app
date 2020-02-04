import { createStore, combineReducers, applyMiddleware } from 'redux'
// import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { productsReducer } from './reducers/productsReducer'

const singleReducer = combineReducers({
    productsReducer,
})

// Create an epmty store object
const store = createStore(
    singleReducer,
    applyMiddleware(thunk)
)

// console.log(store.getState())

export default store