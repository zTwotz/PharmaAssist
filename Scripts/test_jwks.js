const { passportJwtSecret } = require('jwks-rsa');

const provider = passportJwtSecret({
  jwksUri: 'http://localhost:1234/jwks.json',
  handleSigningKeyError: (err, cb) => {
    console.log("Error caught:", err.message);
    // return an error
    cb(null, null); // What happens if we return null for the key?
  }
});

provider({ header: { kid: 'invalid' } }, (err, key) => {
  console.log("Callback result:", { err, key });
});
