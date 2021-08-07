import React, { useState, useRef, useEffect } from 'react';
import MessageHistory from './MessageHistory'
import * as uuid from 'uuid';
import './App.css';

const LOCAL_STORAGE_KEY = 'messageApp.messages'
const MAX_CHAT_SIZE = 30

function App() {
    const usernameRef = useRef()

    const [messages, setMessages] = useState([ /*{ id: 1, name: 'Message 1' }*/ ])
    const messageNameRef = useRef()

    useEffect(() => {
        const storedMessages = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (storedMessages) setMessages(storedMessages)
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages))
    }, [messages])

    function handleClearMessages(e) {
        setMessages([])
    }

    function handleUsername(e) {
        const name = usernameRef.current.value // Username box input
        return name
    }

    function handleMessageBody(user, e) {
        const msg = messageNameRef.current.value // Text box input
        if (msg === '') return
        
        const name = user.concat(": ").concat(msg) // Add username to message

        setMessages(prevMessages => {
            return [...prevMessages, { id: uuid.v4(), name: name }]
        })
        if (messages.length >= MAX_CHAT_SIZE) messages.shift() // Keep chat under max size
        messageNameRef.current.value = null
    }

    function handleAddMessage(e) {
        handleMessageBody(handleUsername())
    }

    return (
        <>

            {/* Username */}
            <div>username:</div>
            <div><input ref={usernameRef} type="text"/></div>

            {/* Messages */}
            <div className="message-history"><MessageHistory messages={messages}/></div>

            {/* Text Box */}
            <input ref={messageNameRef} type="text"/>
            <button onClick={handleAddMessage}>Send</button>

            {/* Chat Manager */}
            <div><button onClick = {handleClearMessages}>Clear Messages</button></div>

        </>
    );
}

export default App;
