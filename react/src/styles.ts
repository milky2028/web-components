import createEmotion from 'create-emotion';

// by default, emotion creates a stylesheet at in the head of the current document
// these styles do not affect shadow dom
// create a container for emotion's styles so we can mount that to the dom ourselves
const stylesContainer = document.createElement('div');
stylesContainer.id = 'styles-container';

const stylesheet = createEmotion({
  key: 'shadow',
  container: stylesContainer
});

export { stylesheet, stylesContainer };
