const redux = require('redux')
const reduxLogger = require('redux-logger')
const combineReducers = redux.combineReducers
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const logger = reduxLogger.createLogger()

const COUNTER_ADD = 'COUNTER_ADD'
const COUNTER_MINUS = 'COUNTER_MINUS'
const ITEM_ADD = 'ITEM_ADD'

const initialCounterState = {
    counter : 5
}

const initialItemState = {
    item : 10
}

//action creators
function addCounter() {
    return{
        type:COUNTER_ADD,
        info:'increment of counter'
    }
}

function subtractCounter() {
    return{
        type:COUNTER_MINUS,
        info:'decrement of counter'
    }
}

function addItem() {
    return{
        type: ITEM_ADD,
        info: 'adding of items'
    }
}
 
// reducer 
// (prevState, action) => newState 
const counterReducer = (state = initialCounterState, action) => {
    switch(action.type){
        case COUNTER_ADD : return{
            ...state, //spread operator (to keep other state as it except counter)
            counter:state.counter + 1
        }
        case COUNTER_MINUS : return{
            ...state,
            counter:state.counter - 1  
        }
        default: return state
    }
}

const itemReducer = ( state = initialItemState , action) => {
    switch(action.type){
        case ITEM_ADD : return{
            ...state,
            item: state.item + 1
        }
        default: return state
    }
}

const mainReducer = combineReducers({
    counter: counterReducer,
    item: itemReducer
})

//createStore(reducer)
const store = createStore(mainReducer)

//applying middleware
// const store = createStore(mainReducer, applyMiddleware(logger))

console.log('Initial State ',store.getState())

const unsubscribe = store.subscribe(()=>console.log('Updated State ',store.getState()))

//dispatchor takes action as a argument 
store.dispatch(addCounter())    
store.dispatch(addCounter())
store.dispatch(subtractCounter())
store.dispatch(subtractCounter())
store.dispatch(addItem())
store.dispatch(addItem())

unsubscribe()