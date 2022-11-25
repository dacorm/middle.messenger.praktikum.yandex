(() => {
    const pug = require('pug-browser');
    console.log('pug', pug);
    window['pug'] = pug;
})();