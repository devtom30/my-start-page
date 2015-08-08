Package.describe({
  name: 'salketer:autoform-bs-iconpicker',
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
	api.use('aldeed:autoform@4.0.0 || 5.0.0');
	api.addFiles([
	              "lib/bootstrap-iconpicker/js/iconset/iconset-fontawesome-4.2.0.min.js",
	              "lib/bootstrap-iconpicker/js/bootstrap-iconpicker.min.js",
	              "lib/bootstrap-iconpicker/css/bootstrap-iconpicker.min.css",
	              'autoform-bs-iconpicker.html',
	              'autoform-bs-iconpicker.js',
	            ], 'client');
});