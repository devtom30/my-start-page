/* global AutoForm, $ */

AutoForm.addInputType("bootstrap-iconpicker", {
  template: "afBootstrapIconpicker",
  valueOut: function () {
	 return this.find('input').val();
//    if (this.val()) {
//      return this.val();
//    }
  },
//  valueConverters: {
//    "string": function (val) {
//      return (val instanceof Date) ? AutoForm.Utility.dateToDateStringUTC(val) : val;
//    },
//    "stringArray": function (val) {
//      if (val instanceof Date) {
//        return [AutoForm.Utility.dateToDateStringUTC(val)];
//      }
//      return val;
//    },
//    "number": function (val) {
//      return (val instanceof Date) ? val.getTime() : val;
//    },
//    "numberArray": function (val) {
//      if (val instanceof Date) {
//        return [val.getTime()];
//      }
//      return val;
//    },
//    "dateArray": function (val) {
//      if (val instanceof Date) {
//        return [val];
//      }
//      return val;
//    }
//  }
});

Template.afBootstrapIconpicker.helpers({
  atts: function addFormControlAtts() {
    var atts = _.clone(this.atts);
    // Add bootstrap class
    atts = AutoForm.Utility.addClass(atts, "form-control");
    atts.value = this.value;
    delete atts.iconPickerOptions;
    return atts;
  }
});

Template.afBootstrapIconpicker.rendered = function () {
  var $input = this.data.atts.buttonClasses ? this.$('.input-group.icon') : this.$('button');
  var data = this.data;
  data.atts.value = data.value;
  // instanciate datepicker
  var options ={ 
	    arrowClass: 'btn-primary',
	    arrowPrevIconClass: 'fa fa-chevron-left',
	    arrowNextIconClass: 'fa fa-chevron-right',
	    cols: 10,
	    icon: data.value,
	    iconset: 'fontawesome',   
	    labelHeader: '{0} of {1} pages',
	    labelFooter: '{0} - {1} of {2} icons',
	    placement: 'bottom',
	    rows: 10,
	    search: false,
	    selectedClass: 'btn-primary btn-lg',
	    unselectedClass: 'btn-default btn-lg'
	}
//  data.atts.iconPickerOptions
//  $input.parent('.input-group').colorpicker();
  $input.iconpicker(options);
//$input.iconpicker({ 
//    arrowClass: 'btn-danger',
//    arrowPrevIconClass: 'glyphicon glyphicon-chevron-left',
//    arrowNextIconClass: 'glyphicon glyphicon-chevron-right',
//    cols: 5,
//    icon: 'fa-key',
//    iconset: 'fontawesome',   
//    labelHeader: '{0} of {1} pages',
//    labelFooter: '{0} - {1} of {2} icons',
//    placement: 'bottom',
//    rows: 5,
//    search: true,
//    searchText: 'Search',
//    selectedClass: 'btn-success',
//    unselectedClass: ''
//});
  // set and reactively update values
//  this.autorun(function () {
//    var data = Template.currentData();
//    // set field value
//    $input.parent('.input-group').colorpicker('update', data.value);
//  });
};

//Template.afBootstrapColorpicker.destroyed = function () {
//  var $input = this.data.atts.buttonClasses ? this.$('.input-group.color') : this.$('input');
//  
//  $input.parent('.input-group').colorpicker('destroy');
//  
//};
