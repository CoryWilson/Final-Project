module.exports = function(shipit) {
  require('shipit-deploy')(shipit);
  shipit.initConfig({
    default : {
      workspace : '/tmp/Final-Project',
      deployTo  : '/var/opt',
      repositoryUrl: 'https://github.com/CoryWilson/Final-Project.git',
      ignores: ['.git','node_modules'],
      keepReleases: 2,
      deleteOnRollback: false,
      key: '~/.ssh/config',
      shallowClone: true
    },
    local : {
      servers : 'localhost:4000'
    },
    production : {
      servers : 'cory@45.55.51.247'
    }
  });

  shipit.task('hello', function(){
    return shipit.log('hello world');
  });
};
