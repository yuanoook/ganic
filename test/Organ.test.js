const { Organ } = require('../src/Organ')

describe('Organ', () => {

  it('should create an organ', () => {
    const organ = new Organ({
      organism: () => {}
    })
    expect(organ instanceof Organ).toBe(true)
  })

})
