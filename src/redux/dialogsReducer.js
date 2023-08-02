//import { usersAPI, followAPI } from '../api/api';

const ADD_MESSAGE = 'dialogs/ADD_MESSAGE';

const initialState = {
    dialogs: [
        {id: 1, name: 'Name 1'},
        {id: 2, name: 'Name 2'},
        {id: 3, name: 'Name 3'},
        {id: 4, name: 'Name 4'},
    ],
    messages: [
        {id: 1, user: 1, text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit', time: '15:23'},
        {id: 2, user: 2, text:'Duis ut dui ultricies, blandit ante at, vulputate arcu', time: '15:24'},
        {id: 3, user: 1, text:'Praesent rutrum fringilla dignissim', time: '15:30'},
        {id: 4, user: 2, text:'Duis id sapien vitae quam ornare venenatis et eget leo', time: '16:12'}
    ]
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            const id = state.messages.length + 1;
            const date = new Date();
            const time = date.getHours() + ':' + ('0' + date.getMinutes()).slice(-2);
            const message = {id: id, user: 1, text: action.text, time: time};
            return {
                ...state,
                messages: [
                    ...state.messages,
                    message
                ]
            }
        default:
            return state
    }
}

export default dialogsReducer

//action creators

export const addMessage = (text) => ({
    type: ADD_MESSAGE,
    text: text
})

//thunks
