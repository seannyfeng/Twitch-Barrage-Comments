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
var linNum=5;
var fontClr="#83f4b7";
var fontSize=4;
var scrollSpeed=18;
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
                div.style.height= "80%";
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
                chrome.storage.local.get("lNum", function(data) {
                    if(typeof data.lNum != "undefined") {
                        linNum=data.lNum;
                    }
                });
                chrome.storage.local.get("sSpeed", function(data) {
                    if(typeof data.sSpeed != "undefined") {
                        scrollSpeed=data.sSpeed;     
                    }
                });
                var messageElement = chatMessage.find(twitchChatMessageContent);
                var bccDiv = document.getElementById("bccDiv"); 
                msgCount+=1;
                totCount=msgCount-linNum;
                if(msgCount>linNum){
                    for(var x=totCount;x>0;x--){
                        if ($("#Msg"+x).length){
                            $("#Msg"+x).remove();
                        }else{
                            break;
                        }
                    }
                    if (((msgCount-1)%linNum)!=0){
                        insertCount=msgCount-1;
                        $('<marquee direction="left" id="Msg'+msgCount+'" scrollamount="'+scrollSpeed+'" behavior="scroll" loop=1; style="white-space:nowrap;"><font size='+fontSize+', color="'+fontClr+'">'+messageElement.text()+'</font></marquee>').insertAfter('#Msg'+insertCount);
                    }else{
                        insertCount=msgCount-linNum+1;
                        $('<marquee direction="left" id="Msg'+msgCount+'" scrollamount="'+scrollSpeed+'" behavior="scroll" loop=1; style="white-space:nowrap;"><font size='+fontSize+', color="'+fontClr+'">'+messageElement.text()+'</font></marquee>').insertBefore('#Msg'+insertCount);
                    }
                }else {
                     $("#bccDiv").append('<marquee direction="left" id="Msg'+msgCount+'" scrollamount="'+scrollSpeed+'" behavior="scroll" loop=1; style="white-space:nowrap;"><font size='+fontSize+', color="'+fontClr+'">'+messageElement.text()+'</font></marquee>');
                }
            });
        });
    });
}
chatLoadedObserver.observe(htmlBody, config);