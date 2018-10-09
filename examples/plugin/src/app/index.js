import '../publicPathIndex';
import './index.css';
import imgURL from './image.png';
import logger from './modules/logger';

console.log('Heres an URL of dynamically imported asset.');
console.log(imgURL);

console.log('I can not be hot-reloaded!');
console.log('But my imports can be😉!@');

logger();

// Dynamic import
import('./modules/dynamic.js').then(({ default: _ }) => {
	console.log('I am dynamically imported');
	_();
});

if (module.hot) {
	module.hot.accept('./modules/logger.js', () => {
		/* eslint-disable global-require */
		const newLogger = require('./modules/logger').default;
		newLogger();
	});
	module.hot.accept('./modules/dynamic.js', () => {
		/* eslint-disable global-require */
		const newLogger = require('./modules/dynamic').default;
		newLogger();
	});
}
