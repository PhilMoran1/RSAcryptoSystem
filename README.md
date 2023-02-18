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
Keep in mind that generating keypairs usually takes a couple of minutes.


# Encrypt
```
    const encryptedMessage = rsa.encrypt(message, reciever)
```


# Decrypt
```
    const decryptedMessage = rsa.decrypt(encryptedMessage, privateKey, publicKey)
```

# Other functions
```
getPrime(bits: number): bigint                 // generates a random prime number

isProbablyPrime(n: bigint, k: number): boolean // miller rabins primality test

randBetween(min: bigint, max: bigint): bigint  // random range for bigint

numberToBin(num: bigint): string

modInverse(e: bigint, phi: bigint): bigint

extendedEuclideanAlgorithm(a: bigint, b: bigint): [bigint, bigint, bigint] 

lcm(a: bigint, b: bigint): bigint

gcd(a: bigint, b: bigint): bigint 

modPow(base: bigint, exponent: bigint, modulus: bigint): bigint

```

Do not use this for production.