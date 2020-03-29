window.place.onchange = function() {
  localStorage.place = window.place.value;
  window.location.reload();
};
window.env.onchange = function() {
  localStorage.env = window.env.value;
  window.location.reload();
};
window.place.value = localStorage.place || window.place.value;
window.env.value = localStorage.env || window.env.value;

const host = window.place.value === 'local'
  ? '../build/node_modules/'
  : 'https://unpkg.com/';

const srcs = ['ganic', 'ganic-usex', 'ganic-pandora', 'ganic-dom', 'ganic-dom-air'].map(name =>
  `${host}${name}/umd/${name}.${window.env.value}.js`
);

srcs.map(src => {
  document.write(`<script src='${src}'><\/script>`);
  document.write(`<div><a href='${src}'>${src}<\/a></div>`);
});