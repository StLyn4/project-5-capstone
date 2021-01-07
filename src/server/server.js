const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const argv = require('yargs').argv;
const child_process = require('child_process');
const APIs = require('./APIs');

const app = express();
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
  extended: true
}))

// You can make an additional check for the request method, but in this project this is unnecessary
for (const [address, callback] of Object.entries(APIs)) {
  app.get(address, callback);
}

// designates what port the app will listen to for incoming requests
// Optionally, specify the port in the arguments: --port=3000
const port = argv.port || process.env.PORT || 3000;
app.listen(argv.mode === 'dev' ? 3000 : port, () => {
  if (argv.mode === 'dev') {
    const assert = require('assert');
    assert(argv.config, 'In development mode, the config file must be specified!');
    const WPC = require(path.resolve(argv.config));
    const devPort = WPC.devServer.port || 8080;
    if (port === devPort) {
      throw new TypeError('Server for API and development must be running on different ports!\n' +
      'Change the port for the development server in the config!');
    }
    console.log('The server for the API started on the 3000th port.');
    console.log(`The development server will run on port ${devPort} (just wait).`);
    child_process.spawn(
     'webpack-dev-server',
      ['--open', '--config', argv.config],
      {
        shell: true,
        stdio: "inherit"
      }
    );
  } else {
    // In development mode, only the server for the API should work on this port.
    // Not the delivery of resources
    app.use(express.static('dist'));
    app.get('/', (req, res) => res.sendFile(path.resolve('dist/index.html')));
    console.log(`SA app listening on port ${port}!`);
  }
})
