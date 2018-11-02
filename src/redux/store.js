import {createStore} from 'redux';

let initialState = {
    loggedIn:false
}

function reducer(state, action)
{
    switch (action.type) {
        case "authResponse":
            // Need to evaluate if the user successfully logged in
            if (action.payload.success)
            {
                return {...state, loggedIn:true}
            }
            else
            {
                return state;// nothing changed
            }
    
        default:
            return state;
    }
}

let store = createStore(reducer, initialState);

export default store;