# From https://github.com/marmelab/make-docker-command/blob/master/Makefile
# If the first argument is one of the supported commands...
SUPPORTED_COMMANDS := composer test ssh cache-clear
SUPPORTS_MAKE_ARGS := $(findstring $(firstword $(MAKECMDGOALS)), $(SUPPORTED_COMMANDS))
ifneq "$(SUPPORTS_MAKE_ARGS)" ""
  # use the rest as arguments for the command
  COMMAND_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
  # ...and turn them into do-nothing targets
  $(eval $(COMMAND_ARGS):;@:)
endif

composer:
	@docker-compose exec 'php' sh -c "composer $(COMMAND_ARGS)"

test:
	@docker-compose exec 'php' sh -c "./vendor/bin/phpunit"

ssh:
	@docker-compose exec 'php' /bin/bash

cache-clear:
	@docker-compose exec 'php' sh -c "rm -rf var/cache/*"
