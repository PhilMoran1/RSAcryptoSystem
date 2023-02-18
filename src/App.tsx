import React, { useEffect, useState } from 'react';
// import './App.css';
import RSACryptoSystem from './rsa';
//import 'rsa.rsx';
//import { RSACryptoSystem } from './rsa';
// import Button from './Button';


function App() {
  const [click,setClick] = useState("")
  const [publicKeyState,setPublicKey] = useState("")
  const [x,setx] = useState(0);

  const rsa = new RSACryptoSystem()
  console.log(rsa)
  
  
  function onclickHandler() {
    //const {publicKey, privateKey} = rsa.genKeyPair();
    const alicepublicKey: string = "52225621997096883982458842712525243171685664724055452381025192074085501371424471594474933315312267552912846221893695046538721600035041389404878431769192070696013104831725636878670181220123527423399362748569430886259204310861804584502679964687834843003537622276574596870372628087656477132776537848411619689141"
    const aliceprivateKey: string = "2025289810421925486998476414145946648776097729468650262086691878729394109212739285554084609012712330221523699176691425618782686825595582513274921560971689373637334583270498166345465028543035844052689580525536929729017350159855325325819374913602996673689218584836881954288738265387436662384352106034391598977"
    
    const bobpublicKey: string = "6272819220256682492235125999125656300151134524785329023684488506173107279158917982863896985583114990697665100310984536063834827375133770044493674336814836985592389500340844591863395442153939598949440656984681601134663136819248403804905831112816151556876544919555818750947368983686751063531309264056702205289"
    const bobprivateKey: string = "3514336989947123168094314987104944113594598567931747345203829355648839281152295521259955530763618003775671292371002932857100925534168281043130967859756017768769033219038111504173678581821282588187345529608403367953754321873013767681395018941067418700009029783578738403992168304327836421349989658108904657793"
    
    
    //setPublicKey(publicKey.toString())
    //console.log("public key - ",publicKey)
    //console.log("private key - ", privateKey)
    const message = "hello i love you wont you tell me your name?!!!!!!"

    // alice sends to bob
    const encryptedMessage = rsa.encrypt(message , bobpublicKey)

    const decryptedMessage = rsa.decrypt(encryptedMessage, bobprivateKey, bobpublicKey)

    console.log(decryptedMessage)


  }
  return (
    <div>
      <h1> hola hermanito! </h1>
      <button onClick={onclickHandler}> genkeypair </button>
      {/* <button onClick={setClick("hello")}></button> */}
    </div>
  );
}

export default App;
