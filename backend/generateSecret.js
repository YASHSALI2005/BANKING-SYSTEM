const crypto = require('crypto');

// Generate a random string of 64 bytes (512 bits)
const secret = crypto.randomBytes(64).toString('hex');

console.log('Your secure JWT secret key:');
console.log(secret);
console.log('\nCopy this key and paste it in your .env file as JWT_SECRET'); 