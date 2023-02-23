import RSACryptoSystem from './rsa';
import React, { useEffect, useState } from 'react';

interface Props {
    name: string,
    keypair: {
        pubKey: string;
        privKey: string;
    },
    contacts: {
        name: string;
        pubKey: string;
    }[],
    //onInputChange: (newValue: string) => void;
  }


const Person: React.FC<Props> = ({ name, keypair, contacts}) =>  {
    const [message, setMessage] = useState("");
    const rsa = new RSACryptoSystem()

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setMessage(event.target.value);
        console.log(message);
    }
    function sendMessage() {
        //rsa.encrypt(message, )
    }
    return (
        <>
            <div className='main'>
                <h2>{name}</h2>
                <p>{keypair.pubKey.slice(0,8)} ... {keypair.pubKey.slice(keypair.pubKey.length-8,keypair.pubKey.length)} </p>
                <label>Message: </label>
                <input type='text' value={message} onChange={handleInputChange}></input>
                <button onClick={sendMessage}> send!</button>
            </div>
        </>
    );
}

export default Person;