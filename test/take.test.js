const { live, take } = require('../src/Ganic')

describe('take in Ganic', () => {

  it('should get different parasite from different organism', () => {
    let organ1Parasite

    const organism1 = () => {
      organ1Parasite = take(1)
    }

    const organism2 = () => {
      const parasite = take(2)
      expect(organ1Parasite === parasite).toBe(false)
    }

    live(organism1, 1)
    live(organism2, 2)
  })

})
