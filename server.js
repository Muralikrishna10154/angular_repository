//Install express server
const express = require('express');
const path = require('path');

const app = express();

//serve only the static files from the dist directory
//Replace the '/dist/<to_your_project_name>'

app.use(express.static(__dirname + '/dist/reactive-forms-heroku'));

app.get('*', function (req, res) {
    // Replace the '/dist/<to_your_project_name>/index.html'
    res.sendFile(path.join(__dirname + '/dist/reactive-forms-heroku/index.html'));
});

//start the app by listening on the default Heroku port

app.listen(process.env.PORT || 8080);