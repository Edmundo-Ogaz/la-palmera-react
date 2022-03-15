run:
	npm start

lint:
	./node_modules/eslint/bin/eslint.js --fix $(filter-out $@,$(MAKECMDGOALS))