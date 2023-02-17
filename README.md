# RSA crypto system

This script provides a class that generates RSA keys, encrypts and decrypts messages.

# Initialize
'''
    const rsa = RSACryptoSystem()
'''

# Generate Keypairs
'''
    const {publicKey, privateKey} = rsa.genKeypair()
'''

# Encrypt
'''
    const encryptedMessage = rsa.encrypt(message, reciever)
'''

# Decrypt
'''
    const decryptedMessage = rsa.decrypt(encryptedMessage, privateKey, publicKey)
'''


Do not use this for production.