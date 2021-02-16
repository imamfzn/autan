const crypto = require("crypto");
const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  token: String,
  expires: Date,
  created_ip: { type: String, alias: 'createdIp' },
  revoked: Date,
  revoked_ip: { type: String, alias: 'revokedIp' },
  replaced_token: { type: String, alias: 'replacedToken' },
},
{
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

schema.virtual('isExpired').get(function () {
  return Date.now() >= this.expires;
});

schema.virtual('isActive').get(function () {
  return !(this.revoked || this.isExpired);
})

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.id;
    delete ret.user;
  }
});

const RefreshToken = mongoose.model('RefreshToken', schema);

RefreshToken.generate = function (user, ip) {
  return new RefreshToken({
    user: user.id,
    token: crypto.randomBytes(40).toString('hex'),
    expires: new Date(Date.now() + 1*24*60*60*1000),
    created_ip: ip,
  });
}

module.exports = RefreshToken;
