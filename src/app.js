import Pace from 'pace-js';
import css from './sass/style.scss';

Pace.start();

Pace.on('done', function() {

    document.getElementById('cover').remove();        
    document.body.removeAttribute('style');

    console.log('pace loaded');
});
