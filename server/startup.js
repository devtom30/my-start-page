Meteor.startup(function () {
	if (Dashboards.find().count() === 0) {
		Dashboards.insert({
			ownerid:null,
			widgets:[
			         {
			        	 row:1,col:1,sizex:1,sizey:1
			         }
			         ]
		});
	}
});