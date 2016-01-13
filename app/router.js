import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
	this.resource('register', function () {
		this.route('index', {path: '/'});
		this.route('code', {path: ':reg_id'});
	});
	this.resource('user', function () {
		this.route('get');
		this.route('give');
	});
});

export default Router;
