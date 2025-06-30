import React, {useEffect, useState} from 'react'
import {io} from 'socket.io-client'

const socket = io('http://localhost:3000');

const ChatSection = ({ itemId, currentUser }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(()=>{
        socket.emit('join-room', itemId); //send data to the server

        socket.on('chat-message', (msg)=>{ //get data from the server
            setMessages((prev)=> [...prev, msg])
        });
        return ()=>{
            socket.off('chat-message');
        };
    },[itemId]);

    const sendMessage = ()=>{
        if(input.trim()){
            socket.emit('chat-message',{
                itemId,
                message: input,
                sender: currentUser.name
            })
        }
        setInput('');
    }
  return (
    <div className="mt-4 p-4 border rounded bg-gray-50">
      <div style={{ maxHeight: 200, overflowY: 'auto' }}>
        {messages.map((msg, idx) => (
          <div key={idx}><b>{msg.sender}:</b> {msg.message}</div>
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          className="border p-2 rounded flex-1"
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-2 rounded">
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatSection