// // @ts-check

class RSACryptoSystem {

    //leftRotate(num: number, count: number): number { return (num << count) | (num >>> (64 - count)); }
    //rightRotate(num: number, count: number): number { return (num >>> count) | (num << (64 - count)); }
    //rightShift(num: number, count: number): number {return num >>> count;}

    rightRotate(data: string, amount: number): string {
      const a = data.slice(0 , data.length-amount)
      const b = data.slice(data.length - amount,data.length)
      return b + a
    }

    rightShift(data: string, amount: number): string {
      const a = data.slice(data.length-amount,data.length);
      return (Array(amount).fill("0").join("") + a)
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

    // SHA256(data: string) {

    //     // let h0 = 0x6a09e667
    //     // let h1 = 0xbb67ae85
    //     // let h2 = 0x3c6ef372
    //     // let h3 = 0xa54ff53a
    //     // let h4 = 0x510e527f
    //     // let h5 = 0x9b05688c
    //     // let h6 = 0x1f83d9ab
    //     // let h7 = 0x5be0cd19

    //     let inithv = new Uint32Array([
    //       0x6a09e667,
    //       0xbb67ae85,
    //       0x3c6ef372,
    //       0xa54ff53a,
    //       0x510e527f,
    //       0x9b05688c,
    //       0x1f83d9ab,
    //       0x5be0cd19
    //     ]);

    //     // Initialize array of round constants:
    //     // (first 32 bits of the fractional parts of the cube roots of the first 64 primes 2..311):

    //     // const k = [
    //     // 0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    //     // 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    //     // 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    //     // 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    //     // 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    //     // 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    //     // 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    //     // 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
    //     // ]
        
    //     // Pre-processing (Padding):
    //     // begin with the original message of length L bits
    //     // append a single '1' bit
    //     // append K '0' bits, where K is the minimum number >= 0 such that (L + 1 + K + 64) is a multiple of 512
    //     // append L as a 64-bit big-endian integer, making the total post-processed length a multiple of 512 bits
    //     // such that the bits in the message are: <original message of length L> 1 <K zeros> <L as 64 bit integer> , (the number of bits will be a multiple of 512)

    //     // this creates one chunck
    //     let databin = this.stringToBinary(data); // message in binary
    //     console.log(databin)

    //     let databinlen = this.numberToBin(BigInt(databin.length)); // binary rep of length of message
    //     console.log(databin.length)
       
    //     let databinlen64: string = databinlen.length < 64 ?  Array(64 -databinlen.length).fill(0).join('') + databinlen: "0"; // length of message rep as 64 int in binary
    //     console.log(databinlen64)
    //     console.log(databinlen64.length)

    //     let chunck = (databin + "1" + (Array(512 - (databin.length + 65)).fill(0)).join('') + databinlen64); 
    //     console.log("chunck")
    //     console.log(chunck)
    //     console.log(chunck.length)

    //     let H = []
    //     for (let i = 0; i < H.length; i++) {
    //       H.push(this.decimalToBinary(inithv[i],32))
    //     }
        
    //     //Process the message in successive 512-bit chunks:
    //     //break message into 512-bit chunks
    //     //for each chunk

    //         // create a 64-entry message schedule array w[0..63] of 32-bit words
    //         // (The initial values in w[0..63] don't matter, so many implementations zero them here)
    //         // copy chunk into first 16 words w[0..15] of the message schedule array

    //     let w = [];

    //     for (let i = 0; i < chunck.length; i+= 32) {
    //         w.push(chunck.slice(i,i+32));
    //     }
        
    //             // // Extend the first 16 words into the remaining 48 words w[16..63] of the message schedule array:

    //     w = w.concat(
    //       Array(48).fill("00000000000000000000000000000000")
    //     )
    //     console.log("w - ", w);
            
    //     //for i from 16 to 63
    //     for (let i = 16; i < 63; i++) {
    //       let w15: string = w[i-15];
    //       let w2: string = w[i-2];
    //       let s0 = this.rightRotate(w15,7) ^ this.rightRotate(w15,18) ^ this.rightShift(w15,3);
    //       let s1 = this.rightRotate(w2,17) ^ this.rightRotate(w2,19) ^ this.rightShift(w2,10);
    //       //w[i] = w[i-16] + s0 + w[i-7] + s1;
    //       //let s0 = (w[i-15] rightrotate  7) Xor (w[i-15] rightrotate 18) xor (w[i-15] rightshift  3)
    //       //let s1 = (w[i-2] rightrotate 17) xor (w[i-2] rightrotate 19) xor (w[i-2] rightshift 10)
    //       //w[i] := w[i-16] + s0 + w[i-7] + s1
    //     }
            
        //     //Initialize working variables to current hash value:
            // let a = H[0]
            // let b = H[1]
            // let c = H[2]
            // let d = H[3]
            // let e = H[4]
            // let f = H[5]
            // let g = H[6]
            // let h = H[7]

            // let a = h0
            // let b = h1
            // let c = h2
            // let d = h3
            // let e = h4
            // let f = h5
            // let g = h6
            // let h = h7

        //     //let abc = new Uint32Array(H); 

        //     //Compression function main loop:
        //     //for i from 0 to 63
        //     for (let i = 0; i < 63; i++) {
                
        //         //S1 := (e rightrotate 6) xor (e rightrotate 11) xor (e rightrotate 25)
        //         //ch := (e and f) xor ((not e) and g)
        //         //temp1 := h + S1 + ch + k[i] + w[i]
        //         //S0 := (a rightrotate 2) xor (a rightrotate 13) xor (a rightrotate 22)
        //         //maj := (a and b) xor (a and c) xor (b and c)
        //         //temp2 := S0 + maj

        //         let S1 = this.rightRotate(h4,6) ^ this.rightRotate(h4,11) ^ this.rightRotate(h4,25);
        //         let ch = (h4 & h5) ^ ((~h4) & h6);
        //         let temp1 = h7 + S1 + ch + k[i] + w[i];
        //         let S0 = this.rightRotate(a,2) ^ this.rightRotate(a,13) ^ this.rightRotate(a,22);
        //         let maj = (h0 & h1) ^ (h0 & h2) ^ (h1 & h2);
        //         let temp2 = S0 + maj
                
        
        //         h = g
        //         g = f
        //         f = e
        //         e = d + temp1
        //         d = c
        //         c = b
        //         b = a
        //         a = temp1 + temp2

        //     }

        //     //Add the compressed chunk to the current hash value:
        //     h0 += a
        //     h1 += b
        //     h2 += c
        //     h3 += d
        //     h4 += e
        //     h5 += f
        //     h6 += g
        //     h7 += h

        // //Produce the final hash value (big-endian):
        // // let hash: string = h0.toString(16) + h1.toString(16) +  h2.toString(16) +  h3.toString(16) + h4.toString(16) +  h5.toString(16) +  h6.toString(16) +  h7.toString(16);

        // // return hash
        // let hash = [h0, h1, h2, h3, h4, h5, h6, h7].map(x => x.toString(16)).join('')
        // console.log(hash)
        // return hash; // return the hash value as a string in hex representation.
    // }

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
        /*
        The Miller-Rabin test is a probabilistic algorithm used to determine
        whether a given number is prime or composite. It is based on the observation
        that if a number n is composite, then there exists a witness a
        such that a^(n-1) is not congruent to 1 modulo n.
        In other words, if we can find such a witness a,
        then we can conclude that n is composite. On the other hand,
        if we can't find such a witness for a given number of iterations,
        we can conclude that n is probably prime.

        Here is a high-level overview of the Miller-Rabin algorithm:

        1. Write n-1 as 2^r * d, where d is odd.
        2. Pick a random integer a in the range [2, n-2].
        3. Compute a^d mod n.
        4. If a^d is congruent to 1 modulo n, then n is probably prime (return true).
        5. For each i in the range [0, r-1], compute a^(2^i * d) mod n.
        6. If a^(2^i * d) is congruent to -1 modulo n for some i, then n is probably prime (return true).
        7. If none of the above conditions hold, then n is composite (return false).

        */ 

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
            
            if (this.isProbablyPrime(randBigInt,100000)) { break } // else {console.log("aintprimetime")}
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
                console.log(byte)
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
                if (byte.length < 8) {byte = Array(8-byte.length).fill(0).join('') + byte}
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
        

        
        encrypt(message: string, reciever: string) {

            let messagebin = this.stringToBinary(message)
            //let encoder = new TextEncoder()
            //let messagehash = window.crypto.subtle.digest("SHA-256",encoder.encode(message))
            
            //sha256('Message to hash');
            //for (let i; i < messagebin.length; i++)
            // binary to number
            let n = BigInt(0)
            let x = BigInt(1)
            for (var i = messagebin.length-1; i >= 0; i--) {
                //console.log(messagebin[i])
                if (messagebin[i] == "1") {
                    n += x
                }
                //console.log(x)
                x *= BigInt(2)
            }

            console.log("encrypt bin - ",messagebin)
            console.log("n - ", n)
            console.log("encrypted n to string - " , n.toString(2))
            console.log("bin to string - ", this.binaryToString(messagebin))

            console.log(BigInt(reciever))
            // c ≡ m^e mod n
            const c = this.modPow(n,BigInt(65537),BigInt(reciever))
            
            return c
          
        }

        decrypt(message: bigint, privateKey: string, sender: string) {

            const m = this.modPow(message,BigInt(privateKey),BigInt(sender));
            
            const mbin = this.numberToBin(m) //m.toString(2)
            
            console.log("decryptbin - ", mbin)

            console.log("result - ",this.binaryToString(mbin))


        }

}



export default RSACryptoSystem;