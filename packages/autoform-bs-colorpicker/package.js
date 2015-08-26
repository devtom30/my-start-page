Package.describe({
  name: 'salketer:autoform-bs-colorpicker',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
	api.versionsFrom('1.1.0.2');
	api.use('templating@1.0.0');
	api.use('blaze@2.0.0');
	api.use('aldeed:autoform');
	api.addFiles([
	              "lib/bootstrap-colorpicker/dist/js/bootstrap-colorpicker.js",
	              "lib/bootstrap-colorpicker/dist/img/bootstrap-colorpicker/alpha.png",
	              "lib/bootstrap-colorpicker/dist/img/bootstrap-colorpicker/hue.png",
	              "lib/bootstrap-colorpicker/dist/img/bootstrap-colorpicker/saturation.png",
	              'autoform-bs-colorpicker.html',
	              'autoform-bs-colorpicker.js',
	              'path-override.css'
	            ], 'client');
});