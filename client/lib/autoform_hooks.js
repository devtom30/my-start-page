AutoForm.hooks({
	widgetConfiguration : {
		onSubmit : function(insertDoc, updateDoc, currentDoc) {
			Widgets_Collection.findOne(this.docId).modify(insertDoc);
			this.done();
		}
	}
});