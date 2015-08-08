AutoForm.hooks({
	widgetConfiguration : {
		onSubmit : function(insertDoc, updateDoc, currentDoc) {
			Widgets_Collection.findOne(this.docId).modify(insertDoc);
			this.done();
			$('#widgetConfigModal').modal('hide');
			return false;
		}
	},
	backgroundConfiguration : {
		onSubmit : function(insertDoc, updateDoc, currentDoc) {
			Dashboards.update(this.docId,updateDoc);
			this.done();
			$('#backgroundConfigModal').modal('hide');
			return false;
		}
	}
});
//AutoForm.setDefaultTemplate('bootstrap3');
//AutoForm.setDefaultTemplateForType('afObjectField', 'plain-object');