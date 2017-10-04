twitchChatUlClass = ".chat-lines";
twitchChatMessageClass1 = ".message-line";
twitchChatMessageClass2 = ".chat-line";
twitchChatMessageContent = ".message";
playerEle=".player-overlay";
var isCreated=false;
var hasChat=false;
var hasVid=false;
var rtime;
var timeout = false;
var delta = 50;
var msgCount = 0;
var linNum = 5;
var maxRec = 50;
var fOpacity = 1;
var switchStatus = true;
var fontClr="#83f4b7";
var custClr=false;
var fontSize=100;
var scrollSpeed=18;
var imgSize=21;
var RscrollSpeed=0;
var config = {attributes: false, childList: true, characterData: false};
var htmlBody = $("body")[0];
var BCCFinder = bulletCC();
var chatLoadedObserver = new MutationObserver(function (mutations, observer) {
    mutations.forEach(function (mutation) {
        var chatSelector = $(twitchChatUlClass);
        if (chatSelector.length > 0) {
            var target = chatSelector[0];
            BCCFinder.observe(target, config);
            var div=document.createElement("div");
            div.setAttribute("id","bccDiv");
            var mainVideo = document.getElementsByTagName("video"); 
            if (parseInt(mainVideo[0].clientHeight)!=0&&!isCreated) {
                isCreated=true;
                div.style.width= "100%";
                div.style.height= "85%";
                div.style.position="absolute";
                div.style.zIndex="2147483647";
                $(".player-fullscreen-overlay").append(div);
            }
            observer.disconnect();
        }
    })
});
function bulletCC() {
    return new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            mutation.addedNodes.forEach(function (addedNode) {
                var chatMessage = $(addedNode);
                if (!chatMessage.is(twitchChatMessageClass1, twitchChatMessageClass2)) {
                    return;
                }
                chrome.storage.local.get("mSwitch", function(data) {
                    if(typeof data.mSwitch != "undefined") {
                        switchStatus=data.mSwitch;
                    }
                });
                chrome.storage.local.get("fOpacity", function(data) {
                    if(typeof data.fOpacity != "undefined") {
                        fOpacity=data.fOpacity;
                    }
                });
                chrome.storage.local.get("fSize", function(data) {
                    if(typeof data.fSize != "undefined") {
                        fontSize=data.fSize;
                    }
                });
                chrome.storage.local.get("fColor", function(data) {
                    if(typeof data.fColor != "undefined") {
                        fontClr=data.fColor;
                    }
                });
                chrome.storage.local.get("maxRec", function(data) {
                    if(typeof data.maxRec != "undefined") {
                        maxRec=data.maxRec;
                    }
                });
                chrome.storage.local.get("randomColor", function(data) {
                    if(typeof data.randomColor != "undefined") {
                        custClr=data.randomColor;
                    }
                });
                var canvHeight = $("#bccDiv").height();
                if (fontSize < 150 ) {
                    imgSize=21;
                }else if (fontSize < 180) {
                    imgSize=22;
                }else if (fontSize < 200) {
                    imgSize=23;
                }else if (fontSize < 230) {
                    imgSize=24;
                }else if (fontSize <250) {
                    imgSize=25;
                }else{
                    imgSize=26;
                }
                linNum=parseInt(canvHeight/imgSize);
                if (linNum<1){
                    linNum=1;
                }
                chrome.storage.local.get("sSpeed", function(data) {
                    if(typeof data.sSpeed != "undefined") {
                        scrollSpeed=data.sSpeed; 
                        RscrollSpeed=scrollSpeed*(Math.random()*0.5+0.75);
                        if(RscrollSpeed<1){
                            RscrollSpeed=1;
                        }
                    }
                });
                var messageElement = chatMessage.find(twitchChatMessageContent);
                var bccDiv = document.getElementById("bccDiv"); 
                if (!switchStatus){
                    bccDiv.style.opacity=0;
                }else{
                    bccDiv.style.opacity=fOpacity;
                }
                msgCount+=1;
                fontRed=parseInt(255-Math.random()*128);
                fontGreen=parseInt(255-Math.random()*128);
                fontBlue=parseInt(255-Math.random()*128);
                currentPos=msgCount-(parseInt(msgCount/linNum)*linNum);
                evenLn=(parseInt(msgCount/linNum)%2)/2;
                totCount=msgCount-linNum;
                if (custClr){
                     var marqueeMsg='<marquee direction="left" id="Msg'+msgCount+'" scrollamount="'+RscrollSpeed+'" behavior="scroll" loop=1; style="white-space:nowrap;"><span style="font-size:'+fontSize+'%; color:'+fontClr+'">'+messageElement.html()+'</span></marquee>';
                }else{
                    var marqueeMsg='<marquee direction="left" id="Msg'+msgCount+'" scrollamount="'+RscrollSpeed+'" behavior="scroll" loop=1; style="white-space:nowrap;"><span style="font-size:'+fontSize+'%; color: rgb('+fontRed+','+fontGreen+','+fontBlue+')">'+messageElement.html()+'</span></marquee>';
                }
                console.log(msgCount);
                $("#bccDiv").append(marqueeMsg);
                insertHeight=imgSize*(currentPos+evenLn);
                $("#Msg"+msgCount).css('top',insertHeight);
                $("#Msg"+msgCount).css('position',"absolute");
                for (var x=msgCount-maxRec;x>0;x--){
                    if ($("#Msg"+x).length){
                        $("#Msg"+x).remove();
                    }else{
                        break;
                    }
                }
            });
        });
    });
}
chatLoadedObserver.observe(htmlBody, config);