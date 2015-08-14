Widgets.register('rss-reader', {
    info: {
        name: 'RSS Reader',
        description: 'This widget allows you to receive updates from your favorite RSS Feeds.'
    },
    width_min: 3,
    width_max: 0,
    height_min: 1,
    height_max: 0,
    limit: 0,
    settings: {
        feed_url: {
            type: String,
            label: 'RSS feed URL',
            max: 400
        },
        bgColor: {
            type: String,
            label: 'Background Color',
            optional: true,
            autoform: {
                type: 'bootstrap-colorpicker',
                colorPickerOptions: {
                    format: 'rgba'
                }
            }
        },
        fontColor: {
            type: String,
            label: 'Text Color',
            optional: true,
            autoform: {
                type: 'bootstrap-colorpicker',
                colorPickerOptions: {
                    format: 'rgb'
                }
            }
        }
    },
    data: {
        feed_url: '',
        bgColor: 'rgba(255,255,255,0.9)',
        fontColor: 'rgb(0,0,0,1)'
    },
    widgetTemplate: 'widgetRssReader',
    feedEntries:[],
    feedInfo:{}
});
var grabRssFeed = function (widget) {
    if (widget.data.feed_url !== '') {
        Gridfully.getGoogleAPI('feeds', '1', {
                callback: function () {
                    var feed = new google.feeds.Feed(widget.data.feed_url);
                    feed.load(function (result) {
                        if (!result.error) {
                            var new_entries = [];
                            for (var i = 0; i < result.feed.entries.length; i++) {
                                var entry = result.feed.entries[i];
                                var brand_new = true;
                                $.each(widget.feedEntries,function(key,elem){
                                    if(elem.link === entry.link){
                                        brand_new = false;
                                        return false;
                                    }
                                });
                                if(brand_new){
                                    delete entry.categories;
                                    delete entry.author;
                                    delete entry.content;
                                    delete entry.contentSnippet;
                                    new_entries.push(entry);
                                }
                            }
                            widget.modify({feedEntries:new_entries.concat(widget.feedEntries).slice(0,10)});

                            if(!widget.feedInfo.title){
                                widget.modify({feedInfo:{
                                    title:result.feed.title,
                                    link:result.feed.link,
                                    description:result.feed.description
                                }});
                            }
                        }
                    });
                }
            }
        );
    }
};
if (Meteor.isClient) {
    Template.widgetRssReader.rendered = function () {
        grabRssFeed(this.data);
    };
    Template.widgetRssReader.helpers({
        attributes:function() {
            var attributes = {};
            attributes.style = '';
            if (this.data.bgColor !== '') {
                attributes.style += 'background-color:' + this.data.bgColor + ';';
            }
            if (this.data.fontColor !== '') {
                attributes.style += 'color:' + this.data.fontColor + ';';
            }
            return attributes;
        },titleAttributes:function(){
            return {title:this.feedInfo.description};
        },feedEntries:function(){
            return this.feedEntries.slice(0,2+(this.height-1)*3);
        }
    });
    Template.widgetRssReaderEntry.helpers({
        attrs:function() {
            return {class:this.read?'':'new',title:this.title};
        },titleAttributes:function(){
            return '';
        }
    });
    Template.widgetRssReader.events({
       'click li a':function(event){
           var target_url = $(event.currentTarget).prop('href');
           var widget = Blaze.getData($(event.currentTarget).closest('.widget')[0]);
           $.each(widget.feedEntries,function(key,elem){
               if(elem.link === target_url){
                   widget.feedEntries[key].read=true;
               }
           });
           widget.modify({feedEntries:widget.feedEntries});
       }
    });
}

