import * as actionTypes from '../actiontypes/index'
// export const addToDoInitiate = () => {
//     return {
//         type: actionTypes.ADD_TODO_INITIATE
//     }
// }
export const addToDoCommit = (content) => {
    return {
        type: actionTypes.ADD_TODO_COMMIT,
        payload: { content },
        meta: {
            offline: {
                effect: {
                    url: "/api/sample",
                    method: "POST",
                    body: `name=${content}`,
                    headers: {
                        "content-type": "application/x-www-form urlencoded"
                    }
                }
            },
            commit: {
                type: actionTypes.ADD_TODO_COMMIT,
                meta: { content }
            },
            rollback: {
                type: actionTypes.ADD_TODO_ROLLBACK,
                meta: { content }
            }
        },

    }
}