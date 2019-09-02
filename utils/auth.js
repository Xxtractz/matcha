const Crypto = require('crypto');

const hashPassword = (plainText) =>{
    return Crypto.createHmac('sha256', 'secret key')
    .update(plainText)
    .digest('hex');
}

module.exports = { hashPassword };