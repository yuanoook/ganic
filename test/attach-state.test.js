const { live } = require('../src/ganic')

const {
  attachRef,
  attachState
} = require('../src/attach')

describe('attachState', () => {

  it(' with attachState', () => {
    let organ1SetState
    const organism1 = () => {
      // const x = attachRef()
      const [state, setState, parasite] = attachState(1)
      organ1SetState = setState
      return state
    }
    const organ1 = live(organism1, 1)

    const organism2 = () => {
      const [state, setState, parasite] = attachState(1)
      expect(organ1SetState === setState).toBe(false)
      return state
    }
    const organ2 = live(organism2, 2)
  })

})
