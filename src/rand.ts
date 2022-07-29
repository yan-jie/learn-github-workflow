'use strict'

import BN from 'bn.js'

export namespace Rand {

  export async function randomBytes(byteSize: number): Promise<Buffer>{
     const crypto = require("crypto")
    return crypto.randomBytes(byteSize);
  }

  export async function randomBN(byteSize: number): Promise<BN> {
    const buf = await randomBytes(byteSize)
    return new BN(buf.toString('hex'), 16)
  }

  export async function randomBNStrict(byteSize: number): Promise<BN> {
    while (true) {
      let buf = await randomBytes(byteSize)
      let hByte = buf.readUInt8(0)
      if (hByte >= 127) {
        return new BN(buf.toString('hex'), 16)
      }
    }
  }

  export async function randomBNLt(max: BN): Promise<BN> {
    let byteLen = 1
    if (max.bitLength() % 8 === 0) {
      byteLen = max.bitLength() / 8
    } else {
      byteLen = Math.floor(max.bitLength() / 8) + 1
    }
    while (true) {
      let r = await randomBN(byteLen)
      r = r.mod(max)
      // to fix the bug in lib "bn.js" while byteLen === 1
      // @ts-ignore
      if (r.red) {
        // @ts-ignore
        return r.fromRed()
      } else {
        return r
      }
    }
  }

  /**
   * @Deprecated
   * @param max
   */
  export async function randomBNLtGCD(max: BN): Promise<BN> {
    while (true) {
      let r = await randomBNLt(max)
      if (r.gcd(max).eqn(1)) {
        return r
      }
    }
  }
  export async function randomBNLtCoPrime(max: BN): Promise<BN> {
    while (true) {
      let r = await randomBNLt(max)
      if (r.gcd(max).eqn(1)) {
        return r
      }
    }
  }

}
