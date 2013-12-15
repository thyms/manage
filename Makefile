# type 'make -s list' to see list of targets.

run-app:
	echo 'No app to run for this project'

test-app:
	echo 'No test to run for this project'

test-app-ci:
	make test-app

setup-project:
	npm link .

.PHONY: no_targets__ list
no_targets__:
list:
	sh -c "$(MAKE) -p no_targets__ | awk -F':' '/^[a-zA-Z0-9][^\$$#\/\\t=]*:([^=]|$$)/ {split(\$$1,A,/ /);for(i in A)print A[i]}' | grep -v '__\$$' | sort"
