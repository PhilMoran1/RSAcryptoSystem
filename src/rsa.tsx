
// /**
//  * This file is just a silly example to show everything working in the browser.
//  * When you're ready to start on your site, clear the file. Happy hacking!
//  **/
// // @ts-check

// //import confetti from 'canvas-confetti';
class RSACryptoSystem {

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
    
      

    getPrime(): bigint  {
        let randBigInt: bigint = BigInt(0)
        const numBits = 512;
        const numBytes = numBits / 8;

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
      

    genKeyPair() {
        console.log("generating keypair")
        // p and q, two large prime numbers
        const p: bigint = this.getPrime();
        const q: bigint = this.getPrime();

        console.log("p and q created")
        console.log(p)
        console.log(q)
        // const p: bigint = BigInt("11772081684726778652942951653652502300969153429777407875457646938026511219479684945318685024283675835349934539450041447865645585010604524119921435092952437")
        // const q: bigint = BigInt("4436396501126470242512235253290373561645400323276531567719129437215916023446002773255598403873117365731561214870362971176095938695903549178118526429462593")

        // for (let i in q.toString())
        // console.log("P -", p.toString())
        // console.log("Q -", q.toString())

        // n - n is released as part of the public key.
        const n: bigint = (p * q);

        // ctf (Carmichael's totient function. ) = λ(n) = lcm(p − 1, q − 1).
        const one: bigint = BigInt(1);
        const ctf: bigint = this.lcm(p - one, q - one);

        // e - e is released as part of the public key.
        const e: bigint = BigInt(65537);

        // d ≡ e^−1 (mod ctf); 
        //const d = e ** -1n % ctf;
        // const [gcd, d, y] = this.extendedEuclideanAlgorithm(e, ctf);

        // if (gcd !== 1n) {
        // throw new Error('e is not invertible modulo ctf');
        // }

        const phi = (p - 1n) * (q - 1n);

        const d = this.modInverse(e, phi);


        return { 
            publicKey: n.toString(),
            privateKey: d.toString()
        }

        }
        

        encrypt(message: string, reciever: string) {

            let messagebin = "";
            // message to binary
            for (var i = 0; i < message.length; i++) {
                messagebin += message[i].charCodeAt(0).toString(2);
            }

            console.log("encrypt bin - ",messagebin)

            // binary to number
            let n = BigInt(0)
            let x = BigInt(1)
            for (var i = messagebin.length; i > 0; i--) {
                if (messagebin[i] == "1") {
                    n += x
                }
                x *= BigInt(2)
            }
            console.log(n)
            console.log("encrypted n to string - " , n.toString(2))
            console.log(BigInt(reciever))
            // c ≡ m^e mod n
            const c = this.modPow(n,BigInt(65537),BigInt(reciever))
            
            return c

        }

        decrypt(message: bigint, privateKey: string, sender: string) {

            const m = this.modPow(message,BigInt(privateKey),BigInt(sender));
            
            const mbin = m.toString(2)
            
            console.log("decryptbin - ",mbin)
        }

}



export default RSACryptoSystem;