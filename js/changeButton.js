enyo.kind({
    name:"changeButton",
    classes:"changeButton",
    tag:"div",
    getStr:"",
    events: {
        onChange:""
    },
    
    getpage:   function(inSender,inEvent){
        var request =  new enyo.Ajax({
            url:inSender.value,
            method: "GET",
            handleAs: "text"
        });
        request.response(this,"changeContent");
        request.go({});         
    },
    changeContent: function(inSender,inResponse){
        this.getStr = inResponse;
        this.doChange(); 
    }
});
