Dashboards = new Mongo.Collection('dashboards');

//// Calculate a default name for a list in the form of 'List A'
//Dashboards.defaultName = function() {
//	var nextNumber = 1;
//	while (Dashboards.findOne({name : nextNumber})) {
//		nextNumber = nextNumber + 1;
//	}
//	return nextNumber;
//};