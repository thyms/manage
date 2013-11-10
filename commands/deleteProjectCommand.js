var util = require('util')
  , spawn = require('child_process').spawn
  , prompt = require('prompt')

function consoleLog(data) {
  console.log("" + data);
}

command = {
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

      var make_file_path = __dirname + '/Makefile'
        , makeTarget = options.presentationLayerProject ? 'procet-delete-on-repository-presentation' : 'procet-delete-on-repository'
        , make_create_project = spawn('make', ['user='+result.username, 'password='+result.password, 'repository-name='+project_name, makeTarget, '-f', make_file_path]);
      make_create_project.stdout.on('data', consoleLog);
      make_create_project.stderr.on('data', consoleLog);
      make_create_project.on('exit', function(code) {
        var message = code == 0 ? 'Delete Project: Succesfully executed' : 'Delete Project: Exited unsuccessfully, Exit Code: ' + code;
        console.log(message);
      });
    });
  }
}

module.exports = command;