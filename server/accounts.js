Accounts.onCreateUser(function(options,userDoc){
    Dashboards.insert({
        name:'My First Dashboard',
        ownerid:userDoc._id,
        home:true
    });
    return userDoc;
});