var util = require('util')
  , q = require('q')
  , exec = q.denodeify(require('child_process').exec)
  , prompt = require('prompt');

var project_extensions = ['', '-presentation', '-presentation-functional', '-presentation-stubulator', 
                          '-core', '-core-functional', '-core-stubulator']
  , project_extensions_short = ['', '-presentation', '-presentation-functional', '-presentation-stubulator'];

command = {
  project_extensions: project_extensions,
  execute1:  function(project_name, options){
    console.log('options: ', options);
  },
	execute: function(project_name, options){
    schema = {
      properties: {
        username: {
          description: 'Enter your username',
          required: true
        },
        password: {
          hidden: true,
          required: true
        }
      }
    };

    prompt.start();
    prompt.get(schema, function (err, result) {
      if (err) { return onErr(err); }

      var extensions = options.shortProjectExtensions ? project_extensions_short : options.withoutProjectExtensions ? [''] : options.projectExtensions;
      extensions.forEach(function(project_extension) {
        var repository_name = project_name + project_extension;
        var repo_options = { "name": repository_name,
                             "private": false,
                             "has_issues": true,
                             "has_wiki": true,
                             "has_downloads": true }
        var command = util.format('curl -u "%s:%s" https://api.github.com/user/repos -d \'%s\'', result.username, result.password, JSON.stringify(repo_options));
        exec(command)
          .then(function(stdout) {
            console.log('Project "%s" is created successfully...', repository_name);
          })
          .fail(function(err){ return onError(err); });
      })
    });
  }
}


module.exports = command;