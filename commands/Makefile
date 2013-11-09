create-project-on-repository:
	curl -u "$(user):$(password)" https://api.github.com/user/repos -d '{ "name": "$(repository-name)", "private": false, "has_issues": true, "has_wiki": true, "has_downloads": true }'
	curl -u "$(user):$(password)" https://api.github.com/user/repos -d '{ "name": "$(repository-name)-presentation", "private": false, "has_issues": true, "has_wiki": true, "has_downloads": true }'
	curl -u "$(user):$(password)" https://api.github.com/user/repos -d '{ "name": "$(repository-name)-presentation-functional", "private": false, "has_issues": true, "has_wiki": true, "has_downloads": true }'
	curl -u "$(user):$(password)" https://api.github.com/user/repos -d '{ "name": "$(repository-name)-presentation-stubulator", "private": false, "has_issues": true, "has_wiki": true, "has_downloads": true }'
	curl -u "$(user):$(password)" https://api.github.com/user/repos -d '{ "name": "$(repository-name)-core", "private": false, "has_issues": true, "has_wiki": true, "has_downloads": true }'
	curl -u "$(user):$(password)" https://api.github.com/user/repos -d '{ "name": "$(repository-name)-core-functional", "private": false, "has_issues": true, "has_wiki": true, "has_downloads": true }'
	curl -u "$(user):$(password)" https://api.github.com/user/repos -d '{ "name": "$(repository-name)-core-stubulator", "private": false, "has_issues": true, "has_wiki": true, "has_downloads": true }'
