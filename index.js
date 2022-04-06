const http = require('http');
const auth = require('basic-auth');
const compare = require('tsscmp');

// @todo put user and password.
const { userName, password } = { userName: 'user4', password: 'password4' };

/**
 * Basic function to validate credentials for example.
 *
 * Simple method to prevent short-circut and use timing-safe compare.
 */
const check = (name, pass) => {
  return compare(name, userName) && compare(pass, password);
};

// Create server.
const server = http.createServer((req, res) => {
  const credentials = auth(req);

  // Check credentials
  // The "check" function will typically be against your user store
  if (!credentials || !check(credentials.name, credentials.pass)) {
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="example"');
    res.end('Access denied');
  } else {
    res.end('Access granted');
  }
});

// Listen
server.listen(3000);
