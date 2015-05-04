if (Meteor.isClient) {
	dashboards = Meteor.subscribe('dashboards',function(){
		if(Meteor.userId() && !Session.get(CURRENT_DASHBOARD)){
			Session.set(CURRENT_DASHBOARD,Dashboards.findOne({ownerid:Meteor.userId()}));
		}
	});
	current_widgets = Meteor.subscribe('current_widgets');
	
	Meteor.autorun(function() {
		if(Images.findOne(Session.get(CURRENT_DASHBOARD).background)) {
	        $('body').css('background-image','url('+Images.findOne(Session.get(CURRENT_DASHBOARD).background).url()+')');
	    }
	    else
	    {
	    	$('body').css('background-image','');
	    }
	});
}