import React, { useState, useEffect } from 'react';

const ProfileStatus = (props) => {
    let [status, setStatus] = useState(props.status);
    let [editMode, setEditMode] = useState(false);

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status)
    }

    const onChange = (e) => {
        setStatus(e.target.value)
    }

    useEffect(() => {
        setStatus(props.status)
    }, [props.status]);
    
    return <>
        {!editMode &&
            <span className='profile__status' onDoubleClick={activateEditMode}>{status}</span> 
        }
        {editMode &&
            <input className='profile__status-edit' autoFocus={true} value={status} onBlur={deactivateEditMode} onChange={onChange}></input>
        }
    </>
}

export default ProfileStatus