enyo.Scroller.touchScrolling = !enyo.Scroller.hasTouchScrolling();
enyo.kind({
    name:"oxidiom",
    classes:"oxidiom",
    kind: "Control",
    searchWord:"",
    wordLength:"",
    pagenumber:"",
    components:[
        {kind:"searchInput",name:"searchInput",onSearch:"getWords"},
        {kind:"changeButton",name:"changeButton",onChange:"changeFile"},
        {kind:"searchFinal",name:"searchFinal",onTap:"show"},
        {kind:"changeIframe",name:"changeIframe"}
    ],
    
    getWords: function(inSender,inEvent){
        this.$.changeIframe.destroyClientControls();
        this.$.changeButton.destroyClientControls();
        this.$.searchFinal.destroyClientControls();
        this.wordLength = this.searchWord.length;	//wordLength = 輸入字串值的長度
        var request =  new enyo.Ajax({
            url: "chengyu/ch.json",
            method: "GET",
            handleAs: "json"
        });
        request.response(this, "processResponse");
        request.go({});
    },
    
    show: function(inSender,inEvent,pagenumber) {
        this.showButton();
        var request =  new enyo.Ajax({
            url: this.$.changeButton.$.buttons.controls[0].value,
            method: "GET",
            handleAs: "text"
        });
        request.response(this, "firstpage");
        request.go({});
    },
    
            
    firstpage :function(inSender,inResponse) {
        this.$.changeIframe.createComponent({
            allowHtml:true,
            content:inResponse
        })
        this.$.changeIframe.render(); 
    },
    
    showButton: function(inSender,inEvent){
        this.$.changeButton.destroyClientControls();
        this.$.changeIframe.destroyClientControls();
        this.$.changeButton.createComponent({
            kind: "onyx.RadioGroup",
            name:"buttons",
            components:[
                {kind: "onyx.Button",name:"cy",active:true,value:"chengyu/pho/cy/cy"+this.pagenumber+".htm",content:"音讀與釋義",ontap:"getpage"},
                {kind: "onyx.Button",name:"bj",value:"chengyu/pho/bj/bj"+this.pagenumber+".htm",content:"辨識",ontap:"getpage"},
                {kind: "onyx.Button",name:"yung",value:"chengyu/pho/yung/yung"+this.pagenumber+".htm",content:"用法說明",ontap:"getpage"},
                {kind: "onyx.Button",name:"sj",value:"chengyu/pho/sj/sj"+this.pagenumber+".htm",content:"書證",ontap:"getpage"}
            ]
        })
        this.$.changeButton.render();
    },
    
    processResponse: function(inSender, inResponse) {
        for(var key in inResponse){
			if (key.indexOf(this.searchWord) !=  "-1" && this.searchWord != ""){
			   	var W = key.length // W = 相對應成語的長度
				var S = key.indexOf(this.searchWord);   // S = 輸入字串值起始位置
                this.$.searchFinal.createComponent({
                    kind:"onyx.Button",
                    name:inResponse[key],
                    classes:"searchFinal_botton",
                    allowHtml:true,
                    content:""+'<a>'+key.substr(0 ,S)+'</a>'+'<a style = "color:#FF0000;">'+key.substr(S ,this.wordLength)+'</a>'+'<a>'+key.substr((S+this.wordLength) ,W)+'</a>'+"",
                    ontap:"show"
                }) 
                this.$.searchFinal.render();               
			}
		}
    },
    
    changeFile: function(inSender) {
        this.$.changeIframe.destroyClientControls();
        this.$.changeIframe.createComponent({
            allowHtml:true,
            content:inSender.getStr
        })
        //this.$.changeIframe.destroyClientControls();
        //alert(inSender.getStr)
        //~ alert(inSender.getStr)
        //~ this.$.changeIframe.setContent("")
        //~ this.$.changeIframe.addContent(inSender.getStr)
        this.$.changeIframe.render(); 
        inSender.getStr=""; 
    }
}); 

enyo.kind({
    name:"searchFinal",
    kind: "Scroller",
    horizontal: "hidden",
    vertical:"auto",
    scrollTop:"",
    attributes:{ondragstart:"return false"},
    classes:"searchFinal",
    components:[
    ],
    
    events: {
        onTap:""
    },
    
    show:   function(inSender){
        this.parent.pagenumber = inSender.name
        this.doTap();
    }
})

enyo.kind({
    name:"searchInput",
    classes:"searchInput",
    tag:"div",
    components:[
        {kind: "onyx.InputDecorator", classes:"searchBar",components: [
            {kind: "onyx.Input",name:"word", published:{value:"", placeholder: ""}}
        ]},
        {kind: "onyx.Button", classes:"searchBar",content: "搜尋",ontap:"search"},
        {name: "searchSpinner", kind: "Image", src: "assets/spinner.gif", showing: false}
    ],
    events: {
        onSearch:""
    },
    search: function(inSender , inEvent){
        this.parent.searchWord = this.$.word.getValue();
        this.doSearch();
    },
    //~ 
    //~ getKeyborad: function(inSender , inEvent){
        //~ exec_async("/usr/bin/oxim-agent -e keyboard_show"); 
    //~ }
})

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
        this.getStr = inResponse.replace('../picture/sybian.gif','chengyu/pho/picture/sybian.gif')
        this.getStr = this.getStr.replace('../picture/same.gif','chengyu/pho/picture/same.gif')
        this.getStr = this.getStr.replace('../picture/anti.gif','chengyu/pho/picture/anti.gif')
        this.doChange(inSender); 
    },
})

enyo.kind({
    name:"changeIframe",
    classes:"changeIframe",
    kind: "Scroller",
})
