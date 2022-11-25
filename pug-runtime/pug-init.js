(() => {
    const pug = require('pug');
    console.log('pug', pug);
    window['pug'] = pug;
})();