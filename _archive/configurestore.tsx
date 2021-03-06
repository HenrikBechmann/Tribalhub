// copyright (c) 2016 Henrik Bechmann, Toronto, MIT Licence
// configurestore.tsx

import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import mainReducer from "../state/reducers"

// could be conditional list of middlewares; last first
const middlewares = [thunkMiddleware]//, reduxRouterMiddleware]

// TODO: this is an incorrect construct -- the second argument should be for persisted 
// stores; the first argument should be the combined reducers
const store = createStore(
    mainReducer,
    applyMiddleware(...middlewares) // the enhancer has last position
)

const configureStore = () => store

export default configureStore
