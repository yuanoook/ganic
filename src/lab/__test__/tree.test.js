'use strict';

const {attach} = require('../../Ganic');
const {OrganTree} = require('../OrganTree');

describe('organTree', () => {
  it('should new & vanish a OrganTree properly', () => {
    const content = '2';

    const organism1 = () => ({organism: organism2, props: attach(1)});
    const organism2 = () => attach(content);

    const organDesc = {organism: organism1, props: 1};
    const envRoot = document.createElement('div');
    const tree = new OrganTree({organDesc, envRoot});

    expect(envRoot.textContent).toBe(content);
    tree.vanish();
    expect(envRoot.textContent).toBe('');
  });
});
