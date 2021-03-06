const { getUpdatingOrgan, attach } = require('ganic');
const { organMap } = require('./shared');
const { removeFile } = require('./utils');
const { taskify } = require('../../../shared/taskQueue');
const applyAttrs = require('./applyAttrs');

const engage = taskify((organ, tagName, attrs) => {
  const fileDesc = organMap.get(organ);
  if (!attrs.name) {
    throw new Error('No file name!');
  }

  const newFileDesc = {
    tagName,
    attrs,
    ...fileDesc,
  };
  organMap.set(organ, newFileDesc);

  if (fileDesc) {
    applyAttrs(organ, newFileDesc);
  }
});

const release = taskify(organ => {
  const fileDesc = organMap.get(organ);
  organMap.delete(organ);
  if (fileDesc) {
    removeFile(fileDesc);
  }
});

const newParasitismByTag = tagName => attrs => {
  const organ = getUpdatingOrgan();
  engage(organ, tagName, attrs);
  return ({ ending }) => {
    if (ending) {
      release(organ);
    }
  };
};

const tagParasitismMap = {};
const parasitismFactory = tagName => {
  if (!tagParasitismMap[tagName]) {
    tagParasitismMap[tagName] = newParasitismByTag(tagName);
  }
  return tagParasitismMap[tagName];
};

const attachTag = (tagName, attrs) => attach(
  parasitismFactory(tagName), attrs,
);

module.exports = attachTag;
