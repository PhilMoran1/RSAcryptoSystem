import RSACryptoSystem from './rsa';
import React, { useEffect, useState, useMemo } from 'react';

function NewPerson() {
    const counter: Worker = useMemo(
            () => new Worker(new URL("./worker.ts", import.meta.url)),
            []
        );

    if (window.Worker) {
        counter.postMessage("");

        counter.onmessage = (e: MessageEvent<{publicKey: string, privateKey: string}>) => {
         console.log(e.data)   
        }
    
    }
    function keygen() {
            console.log("en")
            //worker.postMessage(["hello"]);
        }
    const [name, setName] = useState("");
    // const [pubKey, setPubkey] = useState("");
    // const [privKey, setPrivkey] = useState("");
    const [keypair,setKeypair] = useState({});

    const rsa = new RSACryptoSystem();

    function nameChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    
    return (
        <>
            <div className='main'>
                {/* <h2>{name}</h2> */}
                {/* <p>{keypair.pubKey.slice(0,8)} ... {keypair.pubKey.slice(keypair.pubKey.length-8,keypair.pubKey.length)} </p> */}
                {/* <label>Message: </label> */}
                {/* <input type='text' value={message} onChange={handleInputChange}></input> */}
                {/* <button onClick={sendMessage}> send!</button> */}
                <label>Name: </label>
                <input type='text' onChange={nameChangeHandler}></input>
                <button onClick={keygen}>Generate Keys!</button>


            </div>
        </>
    );
}

export default NewPerson;