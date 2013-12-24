project-create-on-repository-presentation:
	curl -u "$(user):$(password)" https://api.github.com/user/repos -d '{ "name": "$(repository-name)", "private": false, "has_issues": true, "has_wiki": true, "has_downloads": true }'
	curl -u "$(user):$(password)" https://api.github.com/user/repos -d '{ "name": "$(repository-name)-presentation", "private": false, "has_issues": true, "has_wiki": true, "has_downloads": true }'
	curl -u "$(user):$(password)" https://api.github.com/user/repos -d '{ "name": "$(repository-name)-presentation-functional", "private": false, "has_issues": true, "has_wiki": true, "has_downloads": true }'
	curl -u "$(user):$(password)" https://api.github.com/user/repos -d '{ "name": "$(repository-name)-presentation-stubulator", "private": false, "has_issues": true, "has_wiki": true, "has_downloads": true }'

project-create-on-repository:
	curl -u "$(user):$(password)" https://api.github.com/user/repos -d '{ "name": "$(repository-name)", "private": false, "has_issues": true, "has_wiki": true, "has_downloads": true }'
	curl -u "$(user):$(password)" https://api.github.com/user/repos -d '{ "name": "$(repository-name)-presentation", "private": false, "has_issues": true, "has_wiki": true, "has_downloads": true }'
	curl -u "$(user):$(password)" https://api.github.com/user/repos -d '{ "name": "$(repository-name)-presentation-functional", "private": false, "has_issues": true, "has_wiki": true, "has_downloads": true }'
	curl -u "$(user):$(password)" https://api.github.com/user/repos -d '{ "name": "$(repository-name)-presentation-stubulator", "private": false, "has_issues": true, "has_wiki": true, "has_downloads": true }'
	curl -u "$(user):$(password)" https://api.github.com/user/repos -d '{ "name": "$(repository-name)-core", "private": false, "has_issues": true, "has_wiki": true, "has_downloads": true }'
	curl -u "$(user):$(password)" https://api.github.com/user/repos -d '{ "name": "$(repository-name)-core-functional", "private": false, "has_issues": true, "has_wiki": true, "has_downloads": true }'
	curl -u "$(user):$(password)" https://api.github.com/user/repos -d '{ "name": "$(repository-name)-core-stubulator", "private": false, "has_issues": true, "has_wiki": true, "has_downloads": true }'

project-delete-on-repository:
	curl -X DELETE -u "$(user):$(password)" https://api.github.com/repos/$(user)/$(repository-name)
	curl -X DELETE -u "$(user):$(password)" https://api.github.com/repos/$(user)/$(repository-name)-presentation
	curl -X DELETE -u "$(user):$(password)" https://api.github.com/repos/$(user)/$(repository-name)-presentation-functional
	curl -X DELETE -u "$(user):$(password)" https://api.github.com/repos/$(user)/$(repository-name)-presentation-stubulator
	curl -X DELETE -u "$(user):$(password)" https://api.github.com/repos/$(user)/$(repository-name)-core
	curl -X DELETE -u "$(user):$(password)" https://api.github.com/repos/$(user)/$(repository-name)-core-functional
	curl -X DELETE -u "$(user):$(password)" https://api.github.com/repos/$(user)/$(repository-name)-core-stubulator
	heroku apps:destroy --app $(repository-name)-presentation-func01  --confirm $(repository-name)-presentation-func01
	heroku apps:destroy --app $(repository-name)-presentation-qa01    --confirm $(repository-name)-presentation-qa01
	heroku apps:destroy --app $(repository-name)-presentation-demo01  --confirm $(repository-name)-presentation-demo01
	heroku apps:destroy --app $(repository-name)-presentation-stage01 --confirm $(repository-name)-presentation-stage01
	heroku apps:destroy --app $(repository-name)-presentation-prod01  --confirm $(repository-name)-presentation-prod01
	heroku apps:destroy --app $(repository-name)-presentation-stub01  --confirm $(repository-name)-presentation-stub01
	heroku apps:destroy --app $(repository-name)-core-func01  --confirm $(repository-name)-core-func01
	heroku apps:destroy --app $(repository-name)-core-qa01    --confirm $(repository-name)-core-qa01
	heroku apps:destroy --app $(repository-name)-core-demo01  --confirm $(repository-name)-core-demo01
	heroku apps:destroy --app $(repository-name)-core-stage01 --confirm $(repository-name)-core-stage01
	heroku apps:destroy --app $(repository-name)-core-prod01  --confirm $(repository-name)-core-prod01
	heroku apps:destroy --app $(repository-name)-core-stub01  --confirm $(repository-name)-core-stub01


project-delete-on-repository-presentation:
	curl -X DELETE -u "$(user):$(password)" https://api.github.com/repos/$(user)/$(repository-name)
	curl -X DELETE -u "$(user):$(password)" https://api.github.com/repos/$(user)/$(repository-name)-presentation
	curl -X DELETE -u "$(user):$(password)" https://api.github.com/repos/$(user)/$(repository-name)-presentation-functional
	curl -X DELETE -u "$(user):$(password)" https://api.github.com/repos/$(user)/$(repository-name)-presentation-stubulator
	heroku apps:destroy --app $(repository-name)-presentation-func01  --confirm $(repository-name)-presentation-func01
	heroku apps:destroy --app $(repository-name)-presentation-qa01    --confirm $(repository-name)-presentation-qa01
	heroku apps:destroy --app $(repository-name)-presentation-demo01  --confirm $(repository-name)-presentation-demo01
	heroku apps:destroy --app $(repository-name)-presentation-stage01 --confirm $(repository-name)-presentation-stage01
	heroku apps:destroy --app $(repository-name)-presentation-prod01  --confirm $(repository-name)-presentation-prod01
	heroku apps:destroy --app $(repository-name)-presentation-stub01  --confirm $(repository-name)-presentation-stub01

project-initialize:
	echo "Working on sub-project '$(project-name)'"	
	cd /tmp/$(repository-name)/$(project-name) && \
	rm -rf .git && \
	git init && \
	git remote add origin git@github-$(user).com:$(user)/$(repository-name)-$(project-name).git && \
	git add -A && \
	git commit -m "@$(user) initial commit." && \
	git checkout -b develop && \
	git push --set-upstream origin develop && \
	git push --all

project-apply-template:
	echo "Applying template..."
	rm -rf /tmp/$(repository-name)
	git clone git@github.com:thyms/$(template-project-name).git /tmp/$(repository-name)
	cd /tmp/$(repository-name) && \
	git checkout $(template-project-tag) && \
	git submodule update --init && \
	rm -rf .git && \
	for file in `find . -name "*" -type f`; do sed -i '' s/$(template-project-name)/$(repository-name)/g $$file; done && \
	make setup-heroku && \
	mv presentation-functional/src/test/groovy/$(template-project-name) presentation-functional/src/test/groovy/$(repository-name) && \
	mv core/src/main/groovy/$(template-project-name) core/src/main/groovy/$(repository-name) && \
	mv core/src/test/groovy/$(template-project-name) core/src/test/groovy/$(repository-name) && \
	mv core-functional/src/test/groovy/$(template-project-name) core-functional/src/test/groovy/$(repository-name) && \
	make user=$(user) project-name=presentation project-initialize -f $(MAKEFILE_LIST)
	make user=$(user) project-name=presentation-functional project-initialize -f $(MAKEFILE_LIST)
	make user=$(user) project-name=presentation-stubulator project-initialize -f $(MAKEFILE_LIST)
	make user=$(user) project-name=core project-initialize -f $(MAKEFILE_LIST)
	make user=$(user) project-name=core-functional project-initialize -f $(MAKEFILE_LIST)
	make user=$(user) project-name=core-stubulator project-initialize -f $(MAKEFILE_LIST)
	cd /tmp/$(repository-name) && \
	git init && \
	git remote add origin git@github-$(user).com:$(user)/$(repository-name).git && \
	git add -A && \
	git commit -m "@$(user) initial commit." && \
	git checkout -b develop && \
	git push --set-upstream origin develop && \
	git push --all

project-apply-template-presentation:
	echo "Applying template..."
	rm -rf /tmp/$(repository-name)
	git clone git@github.com:thyms/$(template-project-name).git /tmp/$(repository-name)
	cd /tmp/$(repository-name) && \
	git checkout $(template-project-tag) && \
	git submodule update --init && \
	rm -rf .git && \
	for file in `find . -name "*" -type f`; do sed -i '' s/$(template-project-name)/$(repository-name)/g $$file; done && \
	make setup-heroku && \
	mv presentation-functional/src/test/groovy/$(template-project-name) presentation-functional/src/test/groovy/$(repository-name) && \
	make user=$(user) project-name=presentation project-initialize -f $(MAKEFILE_LIST)
	make user=$(user) project-name=presentation-functional project-initialize -f $(MAKEFILE_LIST)
	make user=$(user) project-name=presentation-stubulator project-initialize -f $(MAKEFILE_LIST)
	cd /tmp/$(repository-name) && \
	git init && \
	git remote add origin git@github-$(user).com:$(user)/$(repository-name).git && \
	git add -A && \
	git commit -m "@$(user) initial commit." && \
	git checkout -b develop && \
	git push --set-upstream origin develop && \
	git push --all