enyo.Scroller.touchScrolling = !enyo.Scroller.hasTouchScrolling();
enyo.kind({
    name:"oxidiom",
    classes:"oxidiom",
    kind: "Control",
    searchWord:"",
    wordLength:"",
    pagenumber:"",
    getStr:"",
    components:[
        {kind:"searchInput",name:"searchInput",onSearch:"getWords"},
        {kind:"changeButton",name:"changeButton",onChange:"changeFile"},
        {kind:"searchFinal",name:"searchFinal",onTap:"show"},
        {kind:"changeIframe",name:"changeIframe"}
    ],
    
    getWords: function(inSender,inEvent){
        this.searchWord = this.$.searchInput.searchWord;
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
    
    show: function(inSender,inEvent) {
        this.pagenumber = this.$.searchFinal.pagenumber;
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
        this.getStr = inResponse;
        this.deletegetSt();
        this.$.changeIframe.createComponent({
            allowHtml:true,
            content:this.getStr
        })
        this.$.changeIframe.render();
        this.getStr=""
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
			}
		}
        this.$.searchFinal.render();  
    },
    
    changeFile: function(inSender) {
        this.getStr = inSender.getStr
        this.deletegetSt();
        this.$.changeIframe.destroyClientControls();
        this.$.changeIframe.createComponent({
            allowHtml:true,
            content:this.getStr
        })
        //this.$.changeIframe.destroyClientControls();
        //alert(inSender.getStr)
        //~ alert(inSender.getStr)
        //~ this.$.changeIframe.setContent("")
        //~ this.$.changeIframe.addContent(inSender.getStr)
        this.$.changeIframe.render(); 
        this.getStr=""; 
    },
    
    deletegetSt: function(inSender , inEvent) {
        this.getStr = this.getStr.replace('../picture/sybian.gif','chengyu/pho/picture/sybian.gif')
        this.getStr = this.getStr.replace('../picture/same.gif','chengyu/pho/picture/same.gif')
        this.getStr = this.getStr.replace('../picture/anti.gif','chengyu/pho/picture/anti.gif')
        this.getStr = this.getStr.replace('<font size=-2 color="#999900"><b><i>1></i></b></font>','')
        this.getStr = this.getStr.replace('<font size=-2 color="#999900"><b><i>2></i></b></font>','')
        this.getStr = this.getStr.replace('<font size=-2 color="#999900"><b><i>3></i></b></font>','')
        this.getStr = this.getStr.replace('<font size=-2 color="#999900"><b><i>4></i></b></font>','')
        this.getStr = this.getStr.replace('<font size=-2 color="#999900"><b><i>5></i></b></font>','')
        this.getStr = this.getStr.replace('<font size=-2 color="#999900"><b><i>6></i></b></font>','')
        this.getStr = this.getStr.replace('<font size=-2 color="#999900"><b><i>7></i></b></font>','')
        this.getStr = this.getStr.replace('<font size=-2 color="#999900"><b><i>8></i></b></font>','')
        this.getStr = this.getStr.replace('<font size=-2 color="#999900"><b><i>9></i></b></font>','')
        this.getStr = this.getStr.replace('<font size=-2 color="#999900"><b><i>10></i></b></font>','')
    }
}); 
