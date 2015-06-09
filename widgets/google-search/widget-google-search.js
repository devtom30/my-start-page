Widgets.register('google-search', {
    info: {
        name: 'Google Search Bar',
        description: 'This widget allows you to search the internet using google directly.'
    },
    width_min: 2,
    width_max: 0,
    height_min: 1,
    height_max: 1,
    limit: 1,
    settings: {},
    data: {},
    widgetTemplate: 'widgetGoogleSearch'
});

if (Meteor.isClient) {
    Template.widgetGoogleSearch.rendered = function () {
        //Make sure the search library is loaded...
        //The triggers the go right after loading so we don't need to do anything fancy

        Gridfully.getGoogleAPI('search','1.0',{callback:function(){
            google.search.cse.element.go(document);
        }});


        //if (typeof google != 'undefined' && typeof google.search != 'undefined' && typeof google.search.cse != 'undefined' && typeof google.search.cse.element != 'undefined') {
        //    google.search.cse.element.go(document);
        //} else {
        //    (function () {
        //        var cx = '005718172074042364750:xsfrib__ubw'; // Insert your own Custom Search engine ID here
        //        var gcse = document.createElement('script');
        //        gcse.type = 'text/javascript';
        //        gcse.async = true;
        //        gcse.src = (document.location.protocol == 'https' ? 'https:' : 'http:') +
        //            '//www.google.com/cse/cse.js?cx=' + cx;
        //        var s = document.getElementsByTagName('script')[0];
        //        s.parentNode.insertBefore(gcse, s);
        //    })();
        //}

    };
}