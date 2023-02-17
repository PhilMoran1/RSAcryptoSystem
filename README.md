# RSA crypto system

This script provides a class that generates RSA keys, encrypts and decrypts messages.

# Initialize
```
    const rsa = RSACryptoSystem()
```


# Generate Keypairs
```
    const {publicKey, privateKey} = rsa.genKeypair(bits)
```
Keep in mind that generating keypairs usually takes a couple minutes.


# Encrypt
```
    const encryptedMessage = rsa.encrypt(message, reciever)
```


# Decrypt
```
    const decryptedMessage = rsa.decrypt(encryptedMessage, privateKey, publicKey)
```



Do not use this for production.