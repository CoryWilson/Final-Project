var port = 3000;

module.exports = {
  port : port,
  db   : 'mongodb://localhost/showdown_sports',
  'facebookAuth' : {
      'clientID'      : '177156945954815', // your App ID
      'clientSecret'  : '87ab6bca4c1a5da34b1c38a5ee00fa2e', // your App Secret
      'callbackURL'   : 'http://localhost:4000/auth/facebook/callback'
  },
  'twitterAuth' : {
      'consumerKey'    : 'Lsanv2vdnBy7eXMAGl4F9w3DX',
      'consumerSecret' : 'ND0Tc5VaW3E3lzFn839o92HosXhtKRlDenEL8OFixs9f0HzKvH',
      'callbackURL'    : 'http://localhost:4000/auth/twitter/callback'
  },
  'googleAuth' : {
      'clientID'     : '101017724802-cs5tc97ocod0u2m7vglcovsgchlnnhgn.apps.googleusercontent.com',
      'clientSecret' : '-AaqIioijjyi-iGdkoncL3ny',
      'callbackURL'  : 'http://localhost:4000/auth/google/callback'
  }
};
