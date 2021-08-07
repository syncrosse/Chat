import React from 'react'
import Message from './Message'

export default function MessageHistory( { messages, toggleMessage } ) {
    return (
        messages.map(message => {
            return <Message key={message.id} toggleMessage={toggleMessage} message={message} />
        })
    )
}
