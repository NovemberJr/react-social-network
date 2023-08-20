import { useState, useEffect, ChangeEvent } from 'react';

const ProfileStatus = (props: Props) => {
    let [status, setStatus] = useState(props.status);
    let [editMode, setEditMode] = useState(false);

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status)
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.target.value)
    }

    useEffect(() => {
        setStatus(props.status)
    }, [props.status]);
    
    return <>
        {!editMode &&
            <span className='profile__status' onDoubleClick={activateEditMode}>{status === '' ? '-----' : status}</span> 
        }
        {editMode &&
            <input className='profile__status-edit' autoFocus={true} value={status} onBlur={deactivateEditMode} onChange={onChange}></input>
        }
    </>
}

export default ProfileStatus

type Props = {
    status: string
    updateStatus: (status: string) => void
}
