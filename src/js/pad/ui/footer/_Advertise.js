define([
	],function() {
	// var shell = gui.Shell;
	
	var _cookie = store.get('_time') || { donate : 0 };

	function loop() {
		var now = new Date().getTime();

		if (_cookie.donate < now) {
			$('#donate-btn>button').popover('show');
			_cookie.donate = now + Math.random() * 1000 * 60 * 60 * 8;
			store.set('_time', _cookie);
		}
	}

	var Adver = Backbone.View.extend({
		el: '#donate-btn',

		events: {
			'click': 'donateHandler'
		},

		initialize: function() {
			this.$('button[data-toggle=popover]').popover({
				content: i18n.t('pad:donate.desc'),
				title: i18n.t('pad:donate.title')
			});

			window.setInterval(loop, 10000);
		},

		hide: function() {
			this.$('button[data-toggle=popover]').popover('hide');
		},

		donateHandler: function(e) {
			e.preventDefault();

			if (e.target.id == 'donate-link') {
				_cookie.donate = new Date().getTime() + Math.random() * 1000 * 60 * 60 * 24 * 7;
				store.set('_time', _cookie);
			} 
		}
	});

	return new Adver;

});