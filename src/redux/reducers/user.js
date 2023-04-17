import { USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE, USER_FOLLOWING_STATE_CHANGE, CLEAR_DATA} from "../constants"

const initialState = {
    currentUser: null,
    posts: [],
    following: [],
}

export const user = (state = initialState, action) => {

    /*
    console.log('----------------------')
    console.log('reducer user action.currentUser: ' + action.currentUser)
    console.log('reducer user action.posts: ' + action.posts)    
    console.log('reducer user action.following: ' + action.following)
    console.log('reducer user state: ' + state)        
    console.log('----------------------')
    */
    console.log('reducer user action.currentUser: ' + action.currentUser)

    switch (action.type) {        
        case USER_STATE_CHANGE:
            return {
                ...state,
                currentUser: action.currentUser
            }        
        case USER_POSTS_STATE_CHANGE:
            return {
                ...state,
                posts: action.posts
            }

        case USER_FOLLOWING_STATE_CHANGE:
            return {
                ...state,
                following: action.following
            }
        case CLEAR_DATA:
            return initialState
        default:
            return state;
    }
}