enyo.kind({
    name:"searchFinal",
    kind: "Scroller",
    horizontal: "hidden",
    vertical:"auto",
    scrollTop:"",
    attributes:{ondragstart:"return false"},
    classes:"searchFinal",
    pagenumber:"",
    components:[
    ],
    
    events: {
        onTap:""
    },
    
    show:   function(inSender){
        this.pagenumber = inSender.name
        this.doTap();
    }
});
