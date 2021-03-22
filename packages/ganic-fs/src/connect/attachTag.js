const { getUpdatingOrgan, attach } = require('ganic');
const { organMap } = require('./shared');
const { removeFile } = require('./utils');
const { taskify } = require('../../../shared/taskQueue');

const engage = taskify((organ, tagName, attrs) => {
  let fileDesc = organMap.get(organ);
  if (!attrs.name) {
    throw new Error('No file name!');
  }
  if (!fileDesc) {
    organMap.set(organ, {
      tagName,
      attrs,
    });
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
