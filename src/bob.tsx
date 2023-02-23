import RSACryptoSystem from './rsa';
import React, { useEffect, useState } from 'react';


function Bob() {
    const [message, setMessage] = useState("");
    const rsa = new RSACryptoSystem()

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setMessage(event.target.value);
        console.log(message);
    }
    function sendMessage() {
        rsa.encrypt(message, )
    }
    return (
        <>
            <div className='main'>
                <h2>Bob</h2>
                <label>Message: </label>
                <input type='text' value={message} onChange={handleInputChange}></input>
                <button onClick={sendMessage}> send!</button>
            </div>
        </>
    );
}

export default Bob