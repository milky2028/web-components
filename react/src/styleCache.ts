import createCache from '@emotion/cache';

// by default, emotion creates a stylesheet at in the head of the current document
// these styles do not affect shadow dom
// create a container for emotion's styles so we can mount that to the dom ourselves
const stylesContainer = document.createElement('div');
stylesContainer.id = 'styles-container';

const shadowCache = createCache({
  key: 'shadow',
  container: stylesContainer
});

export { shadowCache, stylesContainer };
