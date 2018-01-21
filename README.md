# give-me-love

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Docker](https://www.docker.com/)

## Installation

* `git clone <repository-url>` this repository
* `cd give-me-love`

## Enter container

$ docker run -ti -v $(pwd):/myapp -p 4200:4200 -p 49152:49152 -p 7020:7020 danlynn/ember-cli:latest bash

## Install npm and bower packages inside container

$ /myapp/frontend# yarn install
$ /myapp/frontend# bower --allow-root install

$ /myapp# sysctl -w fs.inotify.max_user_watches=10000000000
https://facebook.github.io/watchman/docs/troubleshooting.html#poison-inotify-add-watch

## Start development server

$ /myapp/frontend# ember serve --watcher polling

## Once container is setup
 
$ docker-compose up

## Running / Development

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

* `ember deploy production`
* `ember deploy:list production`
* `ember deploy:activate production --revision=005c4e7`

* [ember-deploy](http://ember-cli-deploy.com/docs/v1.0.x/deploying-your-app/)

## Further Reading / Useful Links

* [ember.js](https://emberjs.com/)
* [ember-cli](https://ember-cli.com/)
* [docker-ember-cli](https://hub.docker.com/r/danlynn/ember-cli/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

### AWS

* [https app](https://d24zzlz44szl2b.cloudfront.net/)
* [http app](http://give-me-love.s3-website-sa-east-1.amazonaws.com/)
* [AWS setup: S3+CloudFront](http://blog.testdouble.com/posts/2015-11-03-deploying-ember-to-aws-cloudfront-using-ember-cli-deploy)

### Security

- https://devcenter.heroku.com/articles/ssl-certificate-self
- https://developers.google.com/web/progressive-web-apps/checklist
- Web Crypto API: https://github.com/diafygi/webcrypto-examples/#ecdsa---generatekey
- Web Crypto API table: https://diafygi.github.io/webcrypto-examples/

### TODO

- TEST: Use environment camera on Android: { facingMode: { exact: "environment" }
- Add audio feedback: bip when scan is done
- create private/public keys

- Give: Send `love` to server

- Stop camera after scan: Android
    - re-scan: pause -> play
- scan button on ios
    - img thumbnail
- refactor routes (back support)
    - id -> json
    - service
- Add favorite `lovers`
