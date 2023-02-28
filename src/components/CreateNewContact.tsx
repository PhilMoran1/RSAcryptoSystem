import React, { useEffect, useState } from 'react';
import RSACryptoSystem from '../rsa';

import './CreateNewContact.css'

interface Props {
    onNewContact: (newValue: {name: string, keypair: {pubKey: string, privKey: string}}) => void;
}

const CreateNewContact: React.FC<Props> = ({ onNewContact}) => {
    const [name, setName] = useState("");
    const [keypair,setKeypair] = useState({pubKey: "", privKey: ""});

    const rsa = new RSACryptoSystem();

    function keygen() {
        setKeypair(rsa.genKeyPair(512));
    }

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
        <div className='newcontactmain'>
            <label>Name </label><br/>
            <input type='text' onChange={nameChangeHandler}></input><br/><br/>
            <button onClick={keygen}>Generate Keys!</button><br/><br/>
            <p>Public Key: </p>
            <p>{keypair.pubKey.slice(0, 8)} ... {keypair.pubKey.slice(keypair.pubKey.length - 8, keypair.pubKey.length)} </p>
            <p>Private Key: </p>
            <p>{keypair.privKey.slice(0, 8)} ... {keypair.privKey.slice(keypair.privKey.length - 8, keypair.privKey.length)} </p>

            <button onClick={createNewPerson}> Create New Person </button>
        </div>
    );
}

export default CreateNewContact;