// // @ts-check
// Load the WebAssembly module from the "src" directory
import init, {sha256} from './sha256/pkg/sha256'

class RSACryptoSystem {

    constructor() {
      init().then(m => {const a = m.sha256(10,10)}); // this needs explination
    }

    

    decimalToBinary(decimal: number, bits: number): string {
      let binary: string = "";
      let quotient: number = decimal;
      let remainder: number;
    
      while (quotient > 0) {
        remainder = quotient % 2;
        binary = remainder.toString() + binary;
        quotient = Math.floor(quotient / 2);
      }
    
      return binary;
    }

    randBetween(min: bigint, max: bigint): bigint {
        const range = max - min;
        const rangeBits = range.toString(2).length;
        
        let randomBits = "";
       
        for (let i = 0; i < rangeBits; i++) {
          randomBits += Math.floor(Math.random() * 2);
        }
         
        const randomInt = BigInt("0b" + randomBits);
        if (randomInt >= range) {
          return this.randBetween(min, max);
        }
        return randomInt + min;
      }
    
    modPow(base: bigint, exponent: bigint, modulus: bigint): bigint {
        let result = BigInt(1);
        let currentBase = base % modulus;
        let currentExp = exponent;
        while (currentExp > 0) {
          if (currentExp % BigInt(2) === BigInt(1)) {
            result = (result * currentBase) % modulus;
          }
          currentBase = (currentBase * currentBase) % modulus;
          currentExp = currentExp / BigInt(2);
        }
        return result;
      }
      
      // Primes
    isProbablyPrime(n: bigint, k: number): boolean {
        const bigints = [
            BigInt(0),
            BigInt(1),
            BigInt(2),
            BigInt(3),
            BigInt(4),
            BigInt(5),
        ]
        // Handle base cases
        if (n <= 1) return false;
        if (n <= 3) return true;
      
        // Find r and d such that n-1 = 2^r * d
        let r = 0;
        let d = n - bigints[1];
        while (d % bigints[2] === bigints[0]) {
          r++;
          d /= bigints[2];
        }

        let count = 0;
        // Repeat k times
        for (let i = 0; i < k; i++) {
          // Pick a random witness a in [2, n-2]
          const min = bigints[2];
          const max = n - bigints[2];
          const a = this.randBetween(min,max)

          // Compute a^d mod n
          //let x = (a ** d) % n;
          let x = this.modPow(a,d,n)
      
          // If x is 1 or n-1, then n is probably prime
          if (x === bigints[1] || x === n - bigints[1]) {continue};
      
          // Repeat r-1 times
          for (let j = 0; j < r - 1; j++) {
            // Compute x^2 mod n
            x = (x * x) % n;
      
            // If x is n-1, then n is probably prime
            if (x === n - bigints[1]) {break;}
          }
      
          // If x is not n-1, then n is composite
          if (x !== n - bigints[1]) {return false};
          //if (count > 1000) {console.log(count); count = 0}
          //count++
        }
      
        // If we've made it through all the iterations, n is probably prime
        return true;
      }
    
    getPrime(bits: number): bigint  {
        let randBigInt: bigint = BigInt(0)
        const numBytes = bits / 8;

        while (true) {
            // random n bit integer
            
            const randBuf = new Uint8Array(numBytes);
            window.crypto.getRandomValues(randBuf);

            const randHex = Array.from(randBuf).map(b => b.toString(16).padStart(2, '0')).join('');
            randBigInt = BigInt('0x' + randHex);
            
            if (this.isProbablyPrime(randBigInt,10000)) { break } // else {console.log("aintprimetime")}
        }

        return randBigInt
    } 
    /////////

    // Math
    gcd(a: bigint, b: bigint): bigint {
        if (b === 0n) {
            return a;
        }

        return this.gcd(b, a % b);
    }
      
    lcm(a: bigint, b: bigint): bigint {
        return (a * b) / this.gcd(a, b);
    }
    extendedEuclideanAlgorithm(a: bigint, b: bigint): [bigint, bigint, bigint] {
        if (b === 0n) {
          return [a, 1n, 0n];
        }
      
        const [gcd, x1, y1] = this.extendedEuclideanAlgorithm(b, a % b);
        const x = y1;
        const y = x1 - (a / b) * y1;
      
        return [gcd, x, y];
      }

    modInverse(e: bigint, phi: bigint): bigint {
        const [gcd, d, y] = this.extendedEuclideanAlgorithm(e, phi);
      
        if (gcd !== 1n) {
          throw new Error('e is not invertible modulo phi');
        }
      
        return d < 0n ? d + phi : d;
      }
      
      ////////////
   
        

      // binary 
      numberToBin(num: bigint): string {
            let binary = "";
            let remainder: bigint;
          
            while (num > 0) {
              remainder = num % 2n;
              binary = remainder.toString() + binary;
              num = num / 2n;
            }
            console.log("number to bin - ",binary)
            return binary;
          }
          
      binaryToString(binary: string): string {

            let result = "";
            for (let i = 0; i < binary.length; i += 7) {
                const byte =  binary.substring(i, i + 7);
                //console.log(byte)
              const charCode = parseInt(byte, 2);
              result += String.fromCharCode(charCode);
            }
            return result;
          }

      stringToBinary(data: string): string {
            let messagebin = "";
            // message to binary
            for (var i = 0; i < data.length; i++) {
                let byte = data[i].charCodeAt(0).toString(2)
                //if (byte.length < 8) {byte = Array(8-byte.length).fill(0).join('') + byte}
                //console.log(byte.length)
                messagebin += byte.length < 7 ? " " + byte: byte;
            }
            return messagebin
        }

      binaryToNumber(data: string) {
        // binary to number
        let n = BigInt(0)
        let x = BigInt(1)
        for (var i = data.length-1; i >= 0; i--) {
            // console.log(data[i])
            if (data[i] == "1") {
                n += x
            }
            //console.log(x)
            x *= BigInt(2)
        }
        return n
      }
      // Main functions
      genKeyPair(bits: number) {
        console.log("generating keypair")

        // p and q, two large prime numbers
        const p: bigint = this.getPrime(bits);
        const q: bigint = this.getPrime(bits);

        console.log("p and q created")
        console.log(p)
        console.log(q)

        // n - n is released as part of the public key.
        const n: bigint = (p * q);

        // ctf (Carmichael's totient function. ) = λ(n) = lcm(p − 1, q − 1).
        const one: bigint = BigInt(1);
        const ctf: bigint = this.lcm(p - one, q - one);

        // e - e is released as part of the public key.
        const e: bigint = BigInt(65537);

        // d ≡ e^−1 (mod ctf); 

        const phi = (p - 1n) * (q - 1n);

        const d = this.modInverse(e, phi);


        return { 
            publicKey: n.toString(),
            privateKey: d.toString()
        }

        }
        
        encrypt(message: string,  sender: {pubKey: string, privKey: string}, reciever: string) {
            
            let messagebin = this.stringToBinary(message)

            console.log(message)
            
            const hash = BigInt(parseInt(sha256(message),16));

            console.log("hash - ",hash)
            
            const signature = this.modPow(hash,BigInt(sender.privKey),BigInt(sender.pubKey));
            
            console.log("sig - ",signature)


            // binary to number
            const n = this.binaryToNumber(messagebin)

            console.log("encrypt bin - ",messagebin)
            console.log("n - ", n)
            console.log("encrypted n to string - " , n.toString(2))
            console.log("bin to string - ", this.binaryToString(messagebin))

            console.log(BigInt(reciever))

            // c ≡ m^e mod n
            const encryptedMessage = this.modPow(n,BigInt(65537),BigInt(reciever))
            
            return {encryptedMessage, signature}
          
        }

        decrypt(message: {encryptedMessage: bigint, signature: bigint}, reciever: {pubKey: string, privKey: string}, sender: string) {

            const m = this.modPow(message.encryptedMessage,BigInt(reciever.privKey),BigInt(reciever.pubKey));
            
            const mbin = this.numberToBin(m) //m.toString(2)
            
            console.log("decryptbin - ", mbin)

            console.log("result - ",this.binaryToString(mbin))

            const decryptedMessage = this.binaryToString(mbin);

            const a = BigInt(parseInt(sha256(decryptedMessage),16))
            //const a = sha256(this.binaryToString(mbin));
            console.log("a - ",a)
            const b = this.modPow(message.signature,BigInt(65537),BigInt(sender))
            console.log("b - ", b)
            if (a == b) {
              console.log("message has been signed")
            }


        }

}

export default RSACryptoSystem;