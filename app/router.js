import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
	this.route('register', function () {
		this.route('index', {path: '/'});
		this.route('code', {path: ':reg_id'});
	});
	this.route('user', function () {
		this.route('get');
		this.route('give');
	});
});

export default Router;
