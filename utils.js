const crypto = require('crypto');

const calculateMaxAge = 1 * 60 * 60 * 1000; // 1 hour = 60 minutes * 60 seconds * 1000 milliseconds

function generateToken() {
    return crypto.randomBytes(16).toString('hex');
}

module.exports = { calculateMaxAge, generateToken };
