import RSACryptoSystem from '../rsa';
import React, { useEffect, useState, useMemo } from 'react';

// const counter: Worker = useMemo(
    //         () => new Worker(new URL("./worker.ts", import.meta.url)),
    //         []
    //     );

    // if (window.Worker) {
    //     counter.postMessage("");

    //     counter.onmessage = (e: MessageEvent<{publicKey: string, privateKey: string}>) => {
    //      console.log(e.data)   
    //     }
    
    // }
interface Props {
        onNewContact: (newValue: {name: string, keypair: {pubKey: string, privKey: string}}) => void;
      }

const NewPerson: React.FC<Props> = ({onNewContact}) =>  {
    function keygen() {
            setKeypair(rsa.genKeyPair(512));
        }
    const [name, setName] = useState("");
    const [keypair,setKeypair] = useState({pubKey: "", privKey: ""});

    const rsa = new RSACryptoSystem();

    function nameChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    function createNewPerson() {
        if (name != "" && keypair.pubKey != "") {
            onNewContact(
                {
                    name: name,
                    keypair: keypair
                }
            )
            setName("")
            setKeypair({pubKey: "", privKey: ""})
        } else {
            alert("You have to provide a name and a keypair!")
        }
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
                <button onClick={createNewPerson}> Create New Person </button>


            </div>
        </>
    );
}

export default NewPerson;