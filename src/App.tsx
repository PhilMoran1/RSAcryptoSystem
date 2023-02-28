import React, { useEffect, useState } from 'react';
import { isReadable } from 'stream';
import './App.css';
import RSACryptoSystem from './rsa';


import SelectPerson from './components/SelectPerson';
import InputBox from './components/InputBox';
import DisplayBox from './components/DisplayBox';
import CreateNewContact from './components/CreateNewContact';
// import { encrypt } from 'sjcl';
//import * as wasm from './rust-sha256/pkg/rust_sha256';
// import Person from './Person';
// import NewPerson from './old/NewPerson';
// import Sender from './Sender'
// import Reciever from './Reciever'


//import 'rsa.rsx';
//import { RSACryptoSystem } from './rsa';
// import Button from './Button';
//import * as wasm from './sha256/sha256.js';
// const rust = import("./sha256/sha256");
// console.log(rust);
// rust.then(m => console.log(m));
// Import the WebAssembly module
// Import the WebAssembly module
// TypeScript code
// import init, {sha256} from './sha256/pkg/sha256'

function App() {
  const rsa = new RSACryptoSystem()
  
  const alice = {
    pubKey: "52225621997096883982458842712525243171685664724055452381025192074085501371424471594474933315312267552912846221893695046538721600035041389404878431769192070696013104831725636878670181220123527423399362748569430886259204310861804584502679964687834843003537622276574596870372628087656477132776537848411619689141",
    privKey: "2025289810421925486998476414145946648776097729468650262086691878729394109212739285554084609012712330221523699176691425618782686825595582513274921560971689373637334583270498166345465028543035844052689580525536929729017350159855325325819374913602996673689218584836881954288738265387436662384352106034391598977"
  };

  const bob = {
    pubKey: "6272819220256682492235125999125656300151134524785329023684488506173107279158917982863896985583114990697665100310984536063834827375133770044493674336814836985592389500340844591863395442153939598949440656984681601134663136819248403804905831112816151556876544919555818750947368983686751063531309264056702205289",
    privKey: "3514336989947123168094314987104944113594598567931747345203829355648839281152295521259955530763618003775671292371002932857100925534168281043130967859756017768769033219038111504173678581821282588187345529608403367953754321873013767681395018941067418700009029783578738403992168304327836421349989658108904657793"
  };
  const [contacts, setContacts] = useState(
  [
    {
      name: "alice",
      keypair: alice
    },
    {
      name: "bob",
      keypair: bob
    }
  ]);
  
  const [sender, setSender] = useState(contacts[0]);
  const [reciever, setReciever] = useState(contacts[0]);
  const [person, setPerson] = useState(contacts[0]);


  const [message, setMessage] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState({ encryptedMessage: 0n, signature: 0n });
  const [decryptedMessage, setDecryptedMessage] = useState({ decryptedMessage: "", signed: true });


  function senderChangeHandler(sender: { name: string; keypair: { pubKey: string; privKey: string; }}) {
    setSender(sender)
  }

  function messageChangeHandler(input: string) {
    setMessage(input)
  }
  
  useEffect(() => {
    try {
    console.log(sender.keypair)
    const msg = rsa.encrypt(message, sender.keypair, reciever.keypair.pubKey); 
    setEncryptedMessage(msg)
    } catch {
      console.log("could not encrypt")
      setEncryptedMessage({ encryptedMessage: 0n, signature: 0n })
    }
  }, [message,person,reciever,sender])


  function recieverChangeHandler(reciever: { name: string; keypair: { pubKey: string; privKey: string; }}) {
    setReciever(reciever)
  }
  
  function personChangeHandler(reciever: { name: string; keypair: { pubKey: string; privKey: string; }}) {
    setPerson(reciever)
  }


  useEffect(() => {
    try {
    const msg = rsa.decrypt(encryptedMessage, person.keypair, sender.keypair.pubKey);
    setDecryptedMessage(msg)
    } catch {
      console.log("could not decrypt")
      setDecryptedMessage({ decryptedMessage: "", signed: true })
    }
  }, [encryptedMessage,person,reciever,sender])

  function addNewContactHandler(NewContact:  {name: string, keypair: { pubKey: string, privKey: string}}) {
    setContacts(prevContacts => [...prevContacts, NewContact]);
    alert("Created new contact - \n" + NewContact.name + "\nPublic Key: " + NewContact.keypair.pubKey + "\n\nPrivate Key:" + NewContact.keypair.privKey )
  } 
  
  return (
    <div className='MainPage'>

      {/* SENDER */}
      <h2>Encrypt</h2>
      <SelectPerson contacts={contacts} label={"Sender"} onPersonChange={senderChangeHandler}></SelectPerson><br/>
      <SelectPerson contacts={contacts} label={"Reciever"} onPersonChange={recieverChangeHandler}></SelectPerson>
      <InputBox label={"Messsage"} onInputChange={messageChangeHandler}></InputBox><br/><br/>
      <DisplayBox label={"Encrypted Message"} content={encryptedMessage.encryptedMessage.toString()}></DisplayBox><br/><br/>
      <DisplayBox label={"Signature"} content={encryptedMessage.signature.toString()}></DisplayBox><br/><br/>

      {/* Reciever */}
      <h2>Decrypt</h2>
      <SelectPerson contacts={contacts} label={"Decrypter"} onPersonChange={personChangeHandler}></SelectPerson>
      <DisplayBox label={"Decrypted Message"} content={decryptedMessage.decryptedMessage.toString()}></DisplayBox><br/>

      <h2>Create New Keypair</h2>
      <CreateNewContact onNewContact={addNewContactHandler}></CreateNewContact>

    </div>
  );
}

export default App;
