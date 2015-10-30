var port = 3000;

module.exports = {
  port : port,
  db   : 'mongodb://localhost/showdown_sports',
  'facebookAuth' : {
      'clientID'      : '177156945954815', // your App ID
      'clientSecret'  : '87cbade8d00e879dfb1ef0e82d82fc4c', // your App Secret
      'callbackURL'   : 'http://localhost:4000/auth/facebook/callback'
  },
  'twitterAuth' : {
      'consumerKey'    : 'jOttUbggEQjyvxHuAkeb55yMl',
      'consumerSecret' : '8MlIUTKAlwJyL1sJS3XVydgcQ5GFr8urMP5uj9xvTaRPy232mL',
      'callbackURL'    : 'http://localhost:4000/auth/twitter/callback'
  },
  'googleAuth' : {
      'clientID'     : '101017724802-cs5tc97ocod0u2m7vglcovsgchlnnhgn.apps.googleusercontent.com',
      'clientSecret' : 'x277bcOZKkw3vueoTYGsDDAj',
      'callbackURL'  : 'http://localhost:4000/auth/google/callback'
  },
  'sportsradarNFL' : {
    'key'          : 'dn99tfdpkq8eyu836hjc2pz9'
  },
  'sportsradarEPL' : {
    'key'          : 'vgpmmwsd4jvmps27nrc9h2fv'
  },
  'footballData'   : {
    'key'          : 'c162cb6d7e56493d934b712f58e282f4'
  },
  'StatsFC'        : {
    'key'          : '_rTEZZsI666qy0yAOslDCb8yhlUuRBDwYjiC9q6a'
  }
};
