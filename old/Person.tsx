import RSACryptoSystem from './rsa';
import React, { useEffect, useState } from 'react';
import './Person.css';
interface Props {
    data: {
        name: string;
        keypair: {
            pubKey: string;
            privKey: string;
        }
    },
    contacts: {
        name: string;
        keypair: {
            pubKey: string;
            privKey: string;
        },
    }[],
    //onInputChange: (newValue: string) => void;
  }


const Person: React.FC<Props> = ({ data, contacts}) =>  {
    const [message, setMessage] = useState("");
    const [selectedOption, setSelectedOption] = useState(contacts[0]);
    let encryptedMessage: bigint = 0n;
    let signature: bigint = 0n;

    const [encryptedOutput, setEncryptedOutput] = useState({encryptedMessage, signature});

    const rsa = new RSACryptoSystem()

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setMessage(event.target.value);
        console.log(message);
    }
    function sendMessage() {
        setEncryptedOutput(rsa.encrypt(message, data.keypair, selectedOption.keypair.pubKey));
    }


    const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const optionValue = event.target.value;
        const option = contacts.find((option) => option.name === optionValue);

        if (option) {
        setSelectedOption(option);
        console.log(option)
        }
    };
    return (
        <>
            <div className='personMain'>
                <div className='left'>
                    <h2>{data.name}</h2>
                    <p>{data.keypair.pubKey.slice(0,8)} ... {data.keypair.pubKey.slice(data.keypair.pubKey.length-8,data.keypair.pubKey.length)} </p>
                    <div>
                        <label>Select a contact:</label>
                        <select value={selectedOption.name} onChange={handleOptionChange}>
                            {contacts.map((option) => (
                            <option key={option.name} value={option.name}>
                                {option.name}
                            </option>
                            ))}
                        </select>
                        </div>
                    <label>Message: </label><br />
                    <input type='text' value={message} onChange={handleInputChange}></input>
                    <button onClick={sendMessage}> send!</button><br />
                    <label>Encrypted Output: </label>
                    <p>{(encryptedOutput.encryptedMessage).toString()}</p>
                    <label>Signature: </label>
                    <p>{(encryptedOutput.signature).toString()}</p>
                </div>
                <div className='right'>
                    <h2> Messages: </h2>
                    <div>
                        <label>Select a contact:</label>
                        <select value={selectedOption.name} onChange={handleOptionChange}>
                            {contacts.map((option) => (
                            <option key={option.name} value={option.name}>
                                {option.name}
                            </option>
                            ))}
                        </select>
                        </div>
                </div>
            </div>
        </>
    );
}

export default Person;