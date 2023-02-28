# RSA crypto system

This script provides a class that generates RSA keys, encrypts and decrypts messages as well as signs.

# Initialize
```
    const rsa = new RSACryptoSystem()
```


# Generate Keypairs
```
    const keypair = rsa.genKeypair(bits)
```

# Encrypt
```
    const encryptedMessage = rsa.encrypt(message, sender, reciever)
```
This function also signs the message


# Decrypt
```
    const decryptedMessage = rsa.decrypt(encryptedMessage, reciever, sender)
```

# Other functions
```
getPrime(bits: number): bigint                 // generates a big random prime number

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