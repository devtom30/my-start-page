if (Meteor.isClient) {
	current_dashboard = Meteor.subscribe('dashboard');
	current_widgets = Meteor.subscribe('current_widgets');
}
