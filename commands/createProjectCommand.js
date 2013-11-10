var util = require('util')
  , spawn = require('child_process').spawn
  , prompt = require('prompt');

function consoleLog(data) {
  console.log("" + data);
}

var template_project_tag = 'template-0.1';

command = {
  template_project_tag: template_project_tag,
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
      if (err) { return consoleLog(err); }

      var make_file_path = __dirname + '/Makefile'
        , makeTarget = options.presentationLayerProject ? 'project-create-on-repository-presentation' : 'project-create-on-repository'
        , templateRepository = options.presentationLayerProject ? 'itachi' : 'anbu'
        , make_create_project = spawn('make', ['user='+result.username, 'password='+result.password, 'repository-name='+project_name, makeTarget, '-f', make_file_path]);
      make_create_project.stdout.on('data', consoleLog);
      make_create_project.stderr.on('data', consoleLog);
      make_create_project.on('exit', function(code) {
        if(code == 0){
          makeTarget = options.presentationLayerProject ? 'project-apply-template-presentation' : 'project-apply-template';

          make_apply_project = spawn('make', ['repository-name='+project_name, 'template-project-name='+templateRepository, 'template-project-tag='+options.templateProjectTag, makeTarget, '-f', make_file_path]);
          make_apply_project.stdout.on('data', consoleLog);
          make_apply_project.stderr.on('data', consoleLog);
          make_apply_project.on('exit', function(code) {
            var message = code == 0 ? 'Apply Template: Succesfully executed' : 'Apply Template: Exited unsuccessfully, Exit Code: ' + code;
            console.log(message);
          });
        } else {
          console.log('Create Project: Exited unsuccessfully, Exit Code: ' + code);
        }
      });
    });
  }
}

module.exports = command;