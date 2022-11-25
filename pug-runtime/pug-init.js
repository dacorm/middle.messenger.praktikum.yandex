(() => {
    const pug = require('src/pug');
    console.log('pug', pug);
    window['pug'] = pug;
})();