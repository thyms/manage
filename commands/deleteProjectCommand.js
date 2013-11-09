var util = require('util')
  , q = require('q')
  , exec = q.denodeify(require('child_process').exec)
  , prompt = require('prompt')

var project_extensions = ['', '-presentation', '-presentation-functional', '-presentation-stubulator', 
                          '-core', '-core-functional', '-core-stubulator'];

command = {
  project_extensions: project_extensions,
	execute: function(project_name, options){
    var prompt_properties = [{
      name: 'username',
      description: 'Enter your username',
      required: true
    }, {
      name: 'password',
      description: 'Enter your password',
      required: true,
      hidden: true
    }, {
      name: 'project_name',
      conform: function (value) {
        return value === project_name;
      }
    }]

    prompt.start();
    prompt.get(prompt_properties, function (err, result) {
      if (err) { return onErr(err); }

      var extensions = options.withoutProjectExtensions ? [''] : options.projectExtensions;
      extensions.forEach(function(project_extension) {
        var repository_name = project_name + project_extension;
        var command = util.format('curl -X DELETE -u "%s:%s" https://api.github.com/repos/%s/%s', result.username, result.password, result.username, repository_name);
        exec(command)
          .then(function(stdout) {
            console.log('Project "%s" is deleted successfully...', repository_name);
          })
          .fail(function(err){ return onError(err); });
      })
    });
  }
}

module.exports = command;