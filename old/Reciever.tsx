import RSACryptoSystem from './rsa';
import React, { useEffect, useState } from 'react';
// import './Person.css';
import { decrypt, random } from 'sjcl';
import './boxes.css'
interface Props {
    contacts: {
        name: string;
        keypair: {
            pubKey: string;
            privKey: string;
        },
    }[],
    message: {
        encryptedMessage: bigint,
        signature: bigint
    },
    sender: {
        name: string,
        keypair: {
            pubKey: string;
            privKey: string;
        }
    }
    //onInputChange: (newValue: string) => void;
  }


const Reciever: React.FC<Props> = ({ contacts, message , sender}) =>  {
    const [msg, setMsg] = useState(message);
    const [selectedOption, setSelectedOption] = useState(contacts[0]);
    const [decryptedOutput, setDecryptedOutput] = useState({decryptedMessage: "", signed: false})
    
    const rsa = new RSACryptoSystem()

    const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const optionValue = event.target.value;
        const option = contacts.find((option) => option.name === optionValue);

        if (option) {
        setSelectedOption(option);
        console.log(option)
        }
    };
    console.log("sender")
    console.log(sender)
    //console.log("RECIEVER MESSAGE: " + message.encryptedMessage.toString())

    useEffect(() => {
        try {
        console.log("sender-keypait.pub" + sender.keypair.pubKey)
        setDecryptedOutput(rsa.decrypt(message, selectedOption.keypair, sender.keypair.pubKey))
        //console.log(decryptedOutput)
        }
        catch {
            console.log("catch")
        }
        // console.log("hey")
    },[selectedOption,message.encryptedMessage])

    return (
        <>
            <div className='Main'>
                <div className='left'>
                    <h2>{selectedOption.name}</h2>
                    <p>{selectedOption.keypair.pubKey.slice(0,8)} ... {selectedOption.keypair.pubKey.slice(selectedOption.keypair.pubKey.length-8,selectedOption.keypair.pubKey.length)} </p>
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
                    <p>{(message.encryptedMessage).toString()}</p>
                    <label>Signature </label>
                    <p>{(message.signature).toString()}</p>
                    <label>Decrypted Output: signed: {(decryptedOutput.signed).toString()}</label>
                    <p>{(decryptedOutput.decryptedMessage)}</p>
                   
                </div>
               
            </div>
        </>
    );
}

export default Reciever;