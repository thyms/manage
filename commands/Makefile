project-create-on-repository:
	curl -u "$(user):$(password)" https://api.github.com/user/repos -d '{ "name": "$(repository-name)", "private": false, "has_issues": true, "has_wiki": true, "has_downloads": true }'
	curl -u "$(user):$(password)" https://api.github.com/user/repos -d '{ "name": "$(repository-name)-presentation", "private": false, "has_issues": true, "has_wiki": true, "has_downloads": true }'
	curl -u "$(user):$(password)" https://api.github.com/user/repos -d '{ "name": "$(repository-name)-presentation-functional", "private": false, "has_issues": true, "has_wiki": true, "has_downloads": true }'
	curl -u "$(user):$(password)" https://api.github.com/user/repos -d '{ "name": "$(repository-name)-presentation-stubulator", "private": false, "has_issues": true, "has_wiki": true, "has_downloads": true }'
	curl -u "$(user):$(password)" https://api.github.com/user/repos -d '{ "name": "$(repository-name)-core", "private": false, "has_issues": true, "has_wiki": true, "has_downloads": true }'
	curl -u "$(user):$(password)" https://api.github.com/user/repos -d '{ "name": "$(repository-name)-core-functional", "private": false, "has_issues": true, "has_wiki": true, "has_downloads": true }'
	curl -u "$(user):$(password)" https://api.github.com/user/repos -d '{ "name": "$(repository-name)-core-stubulator", "private": false, "has_issues": true, "has_wiki": true, "has_downloads": true }'

project-initialize:
	echo "Working on sub-project '$(project-name)'"	
	cd /tmp/filmster/$(project-name) && \
	rm .git && \
	git init && \
	git remote add origin git@github.com:thyms/$(repository-name)-$(project-name).git && \
	git add -A && \
	git commit -m "@thyms initial commit." && \
	git checkout -b develop && \
	git push --all

project-apply-template:
	echo "Applying template..."
	rm -rf /tmp/filmster
	git clone git@github-FILMSTER.com:deniz-kalfa/filmster.git /tmp/filmster
	cd /tmp/filmster && \
	git checkout template-0.2 && \
	git submodule update --init && \
	rm -rf .git && \
	for file in `find . -name "*" -type f`; do sed -i '' s/[Ff]ilmster/$(repository-name)/g $$file; done && \
	for file in `find . -name "*" -type f`; do sed -i '' s/deniz-kalfa/thyms/g $$file; done && \
	mv presentation-functional/src/test/groovy/filmster presentation-functional/src/test/groovy/$(repository-name) && \
	mv core/src/main/groovy/filmster core/src/main/groovy/$(repository-name) && \
	mv core/src/test/groovy/mentat core/src/test/groovy/$(repository-name) && \
	mv core-functional/src/test/groovy/filmster core/src/test/groovy/$(repository-name) && \
	make project-name=presentation repository-name=$(repository-name) project-initialize -f $(MAKEFILE_LIST)
	make project-name=presentation-functional project-initialize -f $(MAKEFILE_LIST)
	make project-name=presentation-stubulator project-initialize -f $(MAKEFILE_LIST)
	make project-name=core project-initialize -f $(MAKEFILE_LIST)
	make project-name=core-functional project-initialize -f $(MAKEFILE_LIST)
	make project-name=core-stubulator project-initialize -f $(MAKEFILE_LIST)
	cd /tmp/filmster && \
	git init && \
	git remote add origin git@github.com:thyms/$(repository-name).git && \
	git add -A && \
	git commit -m "@thyms initial commit." && \
	git checkout -b develop && \
	git push --all