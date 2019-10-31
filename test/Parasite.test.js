const { Organ } = require('../src/Organ')
const { Parasite } = require('../src/Parasite')

describe('Parasite', () => {

  it('should create a Parasite', () => {
    const parasite = new Parasite({
      organ: new Organ({ organism: () => {} })
    })
    expect(parasite instanceof Parasite).toBe(true)
  })

})
