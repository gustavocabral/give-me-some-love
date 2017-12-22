# From https://github.com/marmelab/make-docker-command/blob/master/Makefile
# If the first argument is one of the supported commands...
SUPPORTED_COMMANDS := yarn bower ember be-composer be-test e2e-composer e2e-test fixtures
SUPPORTS_MAKE_ARGS := $(findstring $(firstword $(MAKECMDGOALS)), $(SUPPORTED_COMMANDS))
ifneq "$(SUPPORTS_MAKE_ARGS)" ""
  # use the rest as arguments for the command
  COMMAND_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  # ...and turn them into do-nothing targets
  $(eval $(COMMAND_ARGS):;@:)
endif

up:
	@docker-compose up --abort-on-container-exit --remove-orphans

stop:
	@docker-compose stop

clean:
	@docker-compose down -v --remove-orphans

fresh-up: clean
	@docker-compose up --force-recreate --build --abort-on-container-exit --remove-orphans

yarn:
	@docker-compose exec 'ember' -sh -c "yarn $(COMMANDS_ARGS)"

bower:
	@docker-compose exec 'ember' -sh -c "node_modules/bower/bin/bower $(COMMANDS_ARGS)"

ember:
	@docker-compose exec 'ember' sh -c "node_modules/ember-cli/bin/ember $(COMMAND_ARGS)"

be-bash:
	@docker-compose exec 'php' /bin/bash

fe-bash:
	@docker-compose exec 'ember' /bin/bash

