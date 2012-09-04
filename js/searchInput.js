enyo.kind({
    name:"searchInput",
    classes:"searchInput",
    searchWord:"",
    tag:"div",
    components:[
        {kind: "onyx.InputDecorator", classes:"searchBar",components: [
            {kind: "onyx.Input",name:"word", published:{value:"", placeholder: ""},ontap:"getKeyborad"}
        ]},
        {kind: "onyx.Button", classes:"searchBar",content: "搜尋",ontap:"search"},
    ],
    events: {
        onSearch:""
    },
    search: function(inSender , inEvent){
        this.searchWord = this.$.word.getValue();
        this.doSearch();
    },
    
    getKeyborad: function(inSender , inEvent){
        exec_async("/usr/bin/oxim-agent -e keyboard_show"); 
    }
});
