var util = require('util')
  , q = require('q')
  , exec = q.denodeify(require('child_process').exec)
  , prompt = require('prompt');

var project_extensions = ['', '-presentation', '-presentation-functional', '-presentation-stubulator', 
                          '-core', '-core-functional', '-core-stubulator']
  , project_extensions_short = ['', '-presentation', '-presentation-functional', '-presentation-stubulator'];

command = {
  project_extensions: project_extensions,
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

      var make_file_path = __dirname + '/Makefile';
      var command = util.format("make user=%s password=%s repository-name=%s create-project-on-repository -f %s", result.username, result.password, project_name, make_file_path);
      exec(command)
        .then(function(stdout) {
          console.log('Project "%s" is created successfully...', project_name);
        })
        .fail(function(err){ return onError(err); });
    });
  }
}

module.exports = command;