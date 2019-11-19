
const {create, attach} = require('../Ganic');

describe('attach in Ganic', () => {
  it('should get different parasite from different organism', () => {
    const organism1 = () => attach(1);
    const organism2 = () => attach(2);

    const organ1 = create({organism: organism1, props: 1});
    const organ2 = create({organism: organism2, props: 2});

    expect(organ1).not.toBe(organ2);
    expect(organ1.parasites[0]).not.toBe(organ2.parasites[0]);
  });
});
