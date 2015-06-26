REPORTER = spec
MOCHA_OPTS = --ui bdd -c

test:
	clear
	echo Starting test ****************************
	./node_modules/.bin/mocha \
	--reporter $(REPORTER) \
	$(MOCHA_OPTS)
	tests/*.spec.js
	echo Ending tests

.PHONY: test
