Widgets.register('link', {
	info:{
		name:'Link to a website',
		description:'This widget allows you to create a simple button to reach your favorite website.'
	},
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
		    		format:"rgba"
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

Template.widgetLink.helpers({
	'attributes':function(){
		var attributes = {};
		if(this.data.bgColor!=''){
			attributes.style='background-color:'+this.data.bgColor+';';
		}
		return attributes;
	}
});