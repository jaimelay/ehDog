const INITIAL_STATE = {
    user: {}
}

export default function AuthReducer(state = INITIAL_STATE, action) {
    switch(action.type){
        case "SIGNUP":
            return {...state, user: action.payload}

        case "LOGIN":
            return {...state, user: action.payload}
            
        case "LOGOUT": 
            return {...state, user: action.payload}    

        default: 
            return state;
    }
}