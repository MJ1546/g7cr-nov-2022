import * as actionTypes from '../actiontypes/index'
const initialState = {
    id: ""
}

export const toDoReducer = (state = initialState, action) => {
    let newState = null;
    switch (action.type) {
        case actionTypes.ADD_TODO_COMMIT:
            newState = {
                ...state,
                todoItem: action.payload.content
            }
            break;

        default:
            newState = {
                ...state
            }
            break;
    }
    return newState
}