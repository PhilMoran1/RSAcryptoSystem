extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}

fn string_to_binary(s: &str) -> String {
    let mut result = String::new();
    let mut binary = String::new();
    for c in s.chars() {
        if (format!("0{:b}", c as u32).len() != 8) {
            binary = "0".repeat(8 - format!("0{:b}", c as u32).len()) + format!("0{:b}", c as u32).as_str();
        } else {
        binary = format!("0{:b}", c as u32);
        }
        result.push_str(&binary);
    }
    result
}

fn convert_to_u32(binary_str: &str) -> u32 {
    let decimal_num = u32::from_str_radix(binary_str, 2);
    match decimal_num {
        Ok(num) => {
            //println!("The decimal value is: {}", num);
             return num
            },
        Err(_) => {println!("Failed to convert binary string to decimal"); return 3u32},
    }
}

#[wasm_bindgen]
pub fn sha256(message: &str) -> JsValue {

    //const message: &str = "joenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnfjoenafnafpisnfpsnfpanspjnfpasjfnpasnf";

    let mut h0: u32 = 0x6a09e667;
    let mut  h1: u32 = 0xbb67ae85;
    let mut  h2: u32 = 0x3c6ef372;
    let mut  h3: u32 = 0xa54ff53a;
    let mut  h4: u32 = 0x510e527f;
    let mut  h5: u32 = 0x9b05688c;
    let mut  h6: u32 = 0x1f83d9ab;
    let mut  h7: u32 = 0x5be0cd19;
        

    // Initialize array of round constants:
    // (first 32 bits of the fractional parts of the cube roots of the first 64 primes 2..311):
    let k: Vec<u32> = vec![
       0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
       0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
       0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
       0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
       0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
       0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
       0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
       0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
    ];

    let mut paddedmessage: String = string_to_binary(message);
    let amount_of_chunks: usize = ((paddedmessage.len()as f64  / 512f64).ceil()) as usize;
    let pmlen: u64 = paddedmessage.len() as u64;
    paddedmessage.push('1');
    paddedmessage.push_str(("0".repeat(((amount_of_chunks * 512) - paddedmessage.len())- 64)).as_str());
    paddedmessage.push_str((format!("{:064b}", pmlen)).as_str());

    let mut chunks: Vec<String> = 
        paddedmessage.chars().collect::<Vec<char>>().chunks(512)
    .map(|chunk| chunk.iter().collect::<String>())
    .collect();

    for mut chunk in chunks {

     chunk.push_str(("0".repeat(48 * 32)).as_str());

    let substrings: Vec<String> = chunk.chars().collect::<Vec<char>>().chunks(32)
                               .map(|chunk| chunk.iter().collect::<String>())
                               .collect();

    let mut w:  Vec<u32> = vec![];

    for e in substrings {
        w.push(convert_to_u32(&e));
    }

    for i in 16..64 {
        let s0 = &w[i-15].rotate_right(7) ^ &w[i-15].rotate_right(18) ^ (&w[i-15] >> 3u32);
        let s1 = &w[i-2].rotate_right(17) ^ &w[i-2].rotate_right(19) ^ (&w[i-2] >> 10u32);
        w[i] = w[i-16].wrapping_add(s0).wrapping_add(w[i-7]).wrapping_add(s1);
    }

    let mut a = h0;
    let mut b = h1;
    let mut c = h2;
    let mut d = h3;
    let mut e = h4;
    let mut f = h5;
    let mut g = h6;
    let mut h = h7;


    for i in 0..64 {
            let mut S1 = (e.rotate_right(6)) ^ (e.rotate_right(11)) ^ (e.rotate_right(25));
            let mut ch = (e & f) ^ ((!e) & g);
            let temp1 = h.wrapping_add(S1).wrapping_add(ch).wrapping_add(k[i]).wrapping_add(w[i]);
            let mut S0 = (a.rotate_right(2)) ^ (a.rotate_right(13)) ^ (a.rotate_right(22));
            let mut maj = (a & b) ^ (a & c) ^ (b & c);
            let mut temp2 = S0.wrapping_add(maj);
    
            h = g;
            g = f;
            f = e;
            e = d.wrapping_add(temp1);
            d = c;
            c = b;
            b = a;
            a = temp1.wrapping_add(temp2);

    }

    h0 = h0.wrapping_add(a);
    h1 = h1.wrapping_add(b);
    h2 = h2.wrapping_add(c);
    h3 = h3.wrapping_add(d);
    h4 = h4.wrapping_add(e);
    h5 = h5.wrapping_add(f);
    h6 = h6.wrapping_add(g);
    h7 = h7.wrapping_add(h);
}
    let hash: String = format!("{:x}", h0) + format!("{:x}", h1).as_str() + format!("{:x}", h2).as_str() + format!("{:x}", h3).as_str() +  format!("{:x}", h4).as_str() +  format!("{:x}", h5).as_str() +  format!("{:x}", h6).as_str() +  format!("{:x}", h7).as_str();
    //alert(&format!("hash - {}!", hash));
    //println!("{}",hash);
    return JsValue::from_str(&format!("{}", hash))
}

