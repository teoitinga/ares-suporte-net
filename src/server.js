const path = require('path');
const express = require('express');
const nameApp = 'dark-net';
const app = express();

app.use(express.static(`${__dirname}/dist/${nameApp}`));
app.get('/*', function(req, res){
    res.sendFile(path.join(`${__dirname}/dist/${nameApp}/index.html`));
});
app.listen(process.env.PORT || 4200);
