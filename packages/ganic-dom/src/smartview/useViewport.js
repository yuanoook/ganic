const { useState } = require('ganic-usex');
const { floor } = require('./utils');
const useGlobalInterval = require('./useGlobalInterval');

const getViewport = (unit = 1) => ({
  width: floor(window.innerWidth, unit),
  height: floor(window.innerHeight, unit),
  scrollX: floor(document.documentElement.scrollLeft, unit),
  scrollY: floor(document.documentElement.scrollTop, unit),
});

const useViewport = (unit = 10) => {
  const [viewport, setViewport] = useState(getViewport);
  useGlobalInterval(() => setViewport(getViewport(unit)), 100);
  return viewport;
};

module.exports = useViewport;
