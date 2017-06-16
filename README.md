# give-me-love

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Docker](https://www.docker.com/)

## Installation

* `git clone <repository-url>` this repository
* `cd give-me-love`


## Setup Docker env:

If docker machine does not exist:
$ docker-machine create --driver virtualbox default

then
$ docker-machine start default

## Enter container

$ docker run -ti -v $(pwd):/myapp -p 4200:4200 -p 49152:49152 danlynn/ember-cli:2.10.0 bash

## Install npm and bower packages inside container

$ /myapp# npm install
$ /myapp# bower --allow-root install


$ /myapp# sysctl -w fs.inotify.max_user_watches=10000000000
https://facebook.github.io/watchman/docs/troubleshooting.html#poison-inotify-add-watch

## Start development server

$ /myapp# ember serve --watcher polling

## Once container is setup
 
$ docker-compose up

## Reference

https://github.com/danlynn/ember-cli



This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Bower](https://bower.io/)
* [Ember CLI](https://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* `cd give-me-love`
* `npm install`
* `bower install`

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
