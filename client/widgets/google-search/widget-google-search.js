Widgets.register('google-search', {
    info:{
        name:'Google Search Bar',
        description:'This widget allows you to search the internet using google directly.'
    },
    width_min : 2,
    width_max : 0,
    height_min : 1,
    height_max : 1,
    settings : {
        href: {
            type: String,
            label: 'Website URL',
            max: 400
        }
    },
    data:{
        href:'#'
    },
    widgetTemplate:'widgetGoogleSearch'
});

(function() {
    var cx = '005718172074042364750:xsfrib__ubw'; // Insert your own Custom Search engine ID here
    var gcse = document.createElement('script'); gcse.type = 'text/javascript'; gcse.async = true;
    gcse.src = (document.location.protocol == 'https' ? 'https:' : 'http:') +
        '//www.google.com/cse/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(gcse, s);
})();