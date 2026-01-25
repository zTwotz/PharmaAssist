const { passportJwtSecret } = require('jwks-rsa');
const { UnauthorizedException } = require('@nestjs/common');

const provider = passportJwtSecret({
  jwksUri: 'http://localhost:1234/jwks.json',
  handleSigningKeyError: (err, cb) => {
    return cb(new UnauthorizedException('Invalid token signature'));
  }
});

provider({ }, { kid: 'invalid' }, (err, key) => {
  console.log("Callback result:", err.status, err.message);
});
