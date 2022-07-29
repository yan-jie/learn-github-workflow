import {Rand} from '../src/rand';

describe('Generate random number:', function () {
  async function test (Cls, cases) {
    for (var i = 1; i <= 32; i++) {
      let r1 = await Rand.randomBytes(i)
      console.log(r1.length)
      console.log(r1)
      let r2 = await Rand.randomBN(i)
      console.log(r2.toString())
    }
  }

  it('it should support Random!', function () {
    test(null, [])
  })
})
