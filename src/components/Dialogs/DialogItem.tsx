const DialogItem = ({ className, dialogId, username, clickCB }: DialogItemProps) => {
    const handleClick = () => {
        clickCB(dialogId)
    }

    return <li
        className={className}
        onClick={ handleClick }
    >{username}</li>
}

export default DialogItem

type DialogItemProps = {
    className: string
    dialogId: number
    username: string
    clickCB: (id: number) => void
}
