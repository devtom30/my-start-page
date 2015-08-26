var meldDBCallback = function(src_user_id, dst_user_id){
    Dashboards.update({ownerid: src_user_id}, {$set: {ownerid: dst_user_id}}, {multi: true});
    Widgets_Collection.update({ownerid: src_user_id}, {$set: {ownerid: dst_user_id}}, {multi: true});
    Dashboards.update({ownerid: src_user_id}, {$set: {ownerid: dst_user_id}}, {multi: true});
};

AccountsMeld.configure({
    askBeforeMeld: false,
    meldDBCallback: meldDBCallback
});