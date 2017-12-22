import EmberRouter from '@ember/routing/router';
import config from 'give-me-love/config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
	this.route('register', function() {
		this.route('index', {path: '/'});
		this.route('code', {path: ':reg_id'});
	});
	this.route('user', function() {
		this.route('get', function() {
            this.route('info');
            this.route('scan', {path: '/scan'});
            this.route('send', {path: '/:timestamp'});
        });
		this.route('give', function() {
            this.route('scan');
            this.route('send', {path: '/:timestamp'});
        });
	});
});

export default Router;
