import DialogItem from './DialogItem';
import { useState } from 'react';
import './Dialogs.css';
import { DialogData, MessageData } from '../../typescript/types';

const Dialogs = ({ dialogs, messages, addMessage }: StateProps & DispatchProps) => {
    let [newMessage, setNewMessage] = useState('');
    let [dialogSelected, setDialogSelected] = useState(1);

    const onNewMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(e.target.value)
    }

    const onSendClick = () => {
        if (newMessage.length > 0) {
            addMessage(newMessage)
        }
    }

    return <div className='block dialogs'>
        <div className='dialogs__left'>
            <h3 className='dialogs__title'>Dialogs</h3>
            <ul className='dialogs__list'>
                {dialogs.map(el => (<DialogItem key={el.id} dialogId={el.id} username={el.name} clickCB={setDialogSelected} className={'dialogs__item ' + (el.id === dialogSelected ? 'active' : '')} />))}
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

export default Dialogs

export type StateProps = {
    dialogs: Array<DialogData>
    messages: Array<MessageData>
}

export type DispatchProps = {
    addMessage: (text: string) => void
}
