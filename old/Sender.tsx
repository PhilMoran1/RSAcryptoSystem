import RSACryptoSystem from './rsa';
import React, { useEffect, useState } from 'react';
import './boxes.css';

interface Props {
    contacts: {
        name: string;
        keypair: {
            pubKey: string;
            privKey: string;
        },
    }[],

    onSendMessage: (message: {encryptedMessage: bigint, signature: bigint}) => void,
    onSenderChange: (sender: { name: string; keypair: { pubKey: string; privKey: string; } }) => void

    //onInputChange: (newValue: string) => void;
}


const Sender: React.FC<Props> = ({ contacts , onSendMessage, onSenderChange}) => {
    const [message, setMessage] = useState("");
    const [reciever, setReciever] = useState(contacts[1]);
    const [sender, setSender] = useState(contacts[0]);
    onSenderChange(sender)
    let encryptedMessage: bigint = 0n;
    let signature: bigint = 0n;
    const [encryptedOutput, setEncryptedOutput] = useState({ encryptedMessage, signature });

    const rsa = new RSACryptoSystem()

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setMessage(event.target.value);
        console.log(message);
    }

    function sendMessage() {
        const msg = rsa.encrypt(message, sender.keypair, reciever.keypair.pubKey);
        setEncryptedOutput(msg);
        onSendMessage(msg)
    }


    const handleSenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const optionValue = event.target.value;
        const option = contacts.find((option) => option.name === optionValue);

        if (option) {
            setSender(option);
            onSenderChange(option);
        }
    };

    const handleRecieverChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const optionValue = event.target.value;
        const option = contacts.find((option) => option.name === optionValue);

        if (option) {
            setReciever(option);
            console.log(option)
        }
    };

    return (
        <>
            <div className='Main'>

                    

                    <div>
                        <label>Select a sender:</label>
                        <select value={sender.name} onChange={handleSenderChange}>
                            {contacts.map((option) => (
                                <option key={option.name} value={option.name}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <p>{sender.keypair.pubKey.slice(0, 8)} ... {sender.keypair.pubKey.slice(sender.keypair.pubKey.length - 8, sender.keypair.pubKey.length)} </p>
                    <div>
                        <label>Select a reciever:</label>
                        <select value={reciever.name} onChange={handleRecieverChange}>
                            {contacts.map((option) => (
                                <option key={option.name} value={option.name}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    <br />
                    <label>Message: </label><br />
                    <input type='text' value={message} onChange={handleInputChange}></input>
                    <button onClick={sendMessage}> send!</button><br />
                    <label>Encrypted Output: </label>
                    <p className='largeOutput'>{(encryptedOutput.encryptedMessage).toString()}</p>
                    <label>Signature: </label>
                    <p className='largeOutput'>{(encryptedOutput.signature).toString()}</p>

                </div>
            </div>
        </>
    );
}

export default Sender;