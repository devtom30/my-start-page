Widgets.register('link', {
	settings : {
		href: {
		    type: String,
		    label: "Website URL",
		    max: 400
		  },
		bgColor:{
			type:String,
			label: "Background Color",
			autoform: {
		    	type: "bootstrap-colorpicker",
		    	colorPickerOptions:{
		    		color:"rgba"
		    	}
		    }
		}
		},
	data:{
		href:"#",
		bgColor:"",
	},
	widgetTemplate:'widgetLink'
});

