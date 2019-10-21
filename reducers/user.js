const initialState = {
    userList: [],
    messages: [],
    text:[],
    name: null,
    
};

export const INPUT_REQUEST = 'INPUT_REQUEST';
export const MESSAGE_REQUEST = 'MESSAGE_REQUEST';
export const TEXT_REQUEST = 'MESSAGE_REQUEST';
export const USERS_REQUEST = 'MESSAGE_REQUEST';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case INPUT_REQUEST: {
            return {
                ...state,
                name: action.data,
            }
        }
        case MESSAGE_REQUEST: {
            return {
                ...state,
                messages: [action.data, ...state.messages]
            }
        }
        case TEXT_REQUEST: {
            return {
                ...state,
                text: [action.data, ...state.text]
            }
        }
        case USERS_REQUEST: {
            return {
                ...state,
                userList: [action.data, ...state.userList]
            }
        }
        default: {
            return {
                ...state,
            }
        }
    }
}


export default reducer;