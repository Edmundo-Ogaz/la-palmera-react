run:
	npm start

lint:
	./node_modules/eslint/bin/eslint.js $(filter-out $@,$(MAKECMDGOALS))

lint-fix:
	./node_modules/eslint/bin/eslint.js --fix $(filter-out $@,$(MAKECMDGOALS))

version-pachage-installed:
	npm list $(filter-out $@,$(MAKECMDGOALS))