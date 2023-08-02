import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import authRedirect from '../../hoc/withAuth';
import { useState } from 'react';
import { addMessage } from '../../redux/dialogsReducer';
import './Dialogs.css';

const mstp = (state) => ({
    dialogs: state.dialogs.dialogs,
    messages: state.dialogs.messages
})

const Dialogs = ({ dialogs, messages, addMessage }) => {
    let [newMessage, setNewMessage] = useState('');
    let [dialogSelected, setDialogSelected] = useState(1);

    const onNewMessageChange = (e) => {
        setNewMessage(e.target.value)
    }

    const onSendClick = () => {
        if (newMessage.length > 0) {
            addMessage(newMessage)
        }
    }

    const onDialogClick = (e) => {
        setDialogSelected(+e.target.getAttribute('dialog'))
    }

    return <div className='block dialogs'>
        <div className='dialogs__left'>
            <h3 className='dialogs__title'>Dialogs</h3>
            <ul className='dialogs__list'>
                {dialogs.map(el => (<li
                    className={'dialogs__item ' + (el.id === dialogSelected ? 'active' : '')}
                    key={el.id}
                    dialog={el.id}
                    onClick={onDialogClick}
                >{el.name}</li>))}
            </ul>
        </div>
        <div className='dialogs__right'>
            <div className='dialogs__messages'>
                {messages.map(el => <div key={el.id} className={'dialogs__message ' + (el.user === 1 ? 'red' : 'white')}>
                    <p className='dialogs__text'>{el.text}</p>
                    <span className='dialogs__time'>{el.time}</span>
                </div>)}
            </div>
            <div className='dialogs__send'>
                <input type='text' onChange={onNewMessageChange} value={newMessage} placeholder='New message' className='profile__input'></input>
                <button onClick={onSendClick} className='profile__send button'>Send</button>
            </div>
        </div>
    </div>
}

export default compose(
    connect(mstp, { addMessage }),
    authRedirect
)(Dialogs)