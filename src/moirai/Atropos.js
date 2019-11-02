'use strict';

// todo: all the functions bellow

// clear: reset everything inside
const clear = organ => organ.clear();

// remove: cut off all the relationships, remove from parent
const remove = organ => organ.remove();

// shutdown: remove parasites, stop receiving, stop updating
const shutdown = organ => organ.shutdown();

// shutup: stop waking listeners
const shutup = organ => organ.shutup();

// destroy: clear, remove, shutdown, shutup
const destroy = organ => organ.destroy();

module.exports = {
  clear,
  remove,
  shutdown,
  shutup,
  destroy,
};
