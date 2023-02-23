import RSACryptoSystem from './rsa';

onmessage = (e: MessageEvent<string>) => {
    window.crypto.getRandomValues(new Uint8Array(16));
    console.log(e.data)
    const rsa = new RSACryptoSystem();
    const keypair = rsa.genKeyPair(512);
    postMessage(keypair);
  };
  
  export {};