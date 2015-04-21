Widgets.register('link', {
	settings : {
		href: {
		    type: String,
		    label: "Website URL",
		    max: 400
		  }
		},
	data:{
		href:"#"
	},
	widgetTemplate:'widgetLink'
});

