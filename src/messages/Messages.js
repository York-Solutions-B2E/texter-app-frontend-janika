import './styles.css'

function Messages({key, message}) {
    console.log(message)
    return (
        <div key={key}>
            <p><span>{message.user.username}</span> <span>{message.timestamp}</span>: {message.text} </p>
            <span>{message.status}</span>
        </div>
    )
}

export default Messages;