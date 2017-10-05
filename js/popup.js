var ssPicker = document.getElementById('sSpeed');
var sizePicker = document.getElementById('fontSize');
var colorPicker = document.getElementById('fontColor');
var lnNumPicker = document.getElementById('commentBuffer');
var switchStatus = document.getElementById("switchStatus");
var masterSwitch = document.getElementById('masterSwitch');
var randomColor  = document.getElementById('randomColor');
var opacityPicker = document.getElementById('opacitySet');
var urlErrorMsg = chrome.i18n.getMessage("tUrlErrorMsg");
document.title = chrome.i18n.getMessage("extName");
document.getElementById("tOpacity").innerHTML = chrome.i18n.getMessage("tOpacity");
document.getElementById("tContactUs").innerHTML = chrome.i18n.getMessage("tContactUs");
document.getElementById("settingTitle").innerHTML = chrome.i18n.getMessage("popupTitle");
document.getElementById("tScrollSpeed").innerHTML = chrome.i18n.getMessage("tScrollSpeed");
document.getElementById("tMasterSwitch").innerHTML = chrome.i18n.getMessage("tMasterSwitch");
document.getElementById("tCommentBuffer").innerHTML = chrome.i18n.getMessage("tCommentBuffer");
document.getElementById("tChooseFontSize").innerHTML = chrome.i18n.getMessage("tChooseFontSize");
document.getElementById("tChooseFontColor").innerHTML = chrome.i18n.getMessage("tChooseFontColor");
document.getElementById("tCustomizedColor").innerHTML = chrome.i18n.getMessage("tCustomizedColor");
switchStatus.innerHTML = chrome.i18n.getMessage("tON");
function getCurrentTabUrl(callback) {
    var queryInfo = {
        active: true,
        currentWindow: true
    };
    chrome.tabs.query(queryInfo, (tabs) => {
        var tab = tabs[0];
        var url = tab.url;
        console.assert(typeof url == 'string', urlErrorMsg);
        callback(url);
    });
}
document.addEventListener('DOMContentLoaded', () => {
    getCurrentTabUrl((url) => {
        chrome.storage.local.get("mSwitch", function(data) {
            if(typeof data.mSwitch != "undefined") {
                masterSwitch.checked=data.mSwitch;
                if(masterSwitch.checked){
                    switchStatus.innerHTML=chrome.i18n.getMessage("tON");
                }else{
                    switchStatus.innerHTML=chrome.i18n.getMessage("tOFF");
                }
            }
        });
        masterSwitch.addEventListener('change', () => {
            chrome.storage.local.set({mSwitch: masterSwitch.checked});
            if(masterSwitch.checked){
                    switchStatus.innerHTML=chrome.i18n.getMessage("tON");
            }else{
                switchStatus.innerHTML=chrome.i18n.getMessage("tOFF");
            }
        });  
        
        chrome.storage.local.get("randomColor", function(data) {
            if(typeof data.randomColor != "undefined") {
                randomColor.checked=data.randomColor;
            }
            if(randomColor.checked){
                document.getElementById("colorSettings").style.display="block";
            }else{
                document.getElementById("colorSettings").style.display="none";
            }
        });
        randomColor.addEventListener('change', () => {
            chrome.storage.local.set({randomColor: randomColor.checked});
            if(randomColor.checked){
                document.getElementById("colorSettings").style.display="block";
            }else{
                document.getElementById("colorSettings").style.display="none";
            }
        });
        chrome.storage.local.get("fOpacity", function(data) {
            if(typeof data.fOpacity != "undefined") {
                opacityPicker.value=data.fOpacity;
                document.getElementById("opacityDis").innerHTML=data.fOpacity;
            }
        });
        opacityPicker.addEventListener('change', () => {
            chrome.storage.local.set({fOpacity: opacityPicker.value});
            document.getElementById("opacityDis").innerHTML=opacityPicker.value;
        });  
        chrome.storage.local.get("fColor", function(data) {
            if(typeof data.fColor != "undefined") {
                colorPicker.value=data.fColor;
                document.getElementById("fColorDis").innerHTML=data.fColor;
            }
        });
        colorPicker.addEventListener('change', () => {
            chrome.storage.local.set({fColor: colorPicker.value});
            document.getElementById("fColorDis").innerHTML=colorPicker.value;
        });
        chrome.storage.local.get("fSize", function(data) {
            if(typeof data.fSize != "undefined") {
                sizePicker.value=data.fSize;
                document.getElementById("fSizeDis").innerHTML=data.fSize;
            }
        });
        sizePicker.addEventListener('change', () => {
            chrome.storage.local.set({fSize: sizePicker.value});
            document.getElementById("fSizeDis").innerHTML=sizePicker.value;
        });  
        chrome.storage.local.get("maxRec", function(data) {
            if(typeof data.maxRec != "undefined") {
                lnNumPicker.value=data.maxRec;
                document.getElementById("cbDis").innerHTML=data.maxRec;
            }
        });
        lnNumPicker.addEventListener('change', () => {
            chrome.storage.local.set({maxRec: lnNumPicker.value});
            document.getElementById("cbDis").innerHTML=lnNumPicker.value;
        });      
        chrome.storage.local.get("sSpeed", function(data) {
            if(typeof data.sSpeed != "undefined") {
                ssPicker.value=data.sSpeed;
                document.getElementById("ssDis").innerHTML=data.sSpeed;
            }
        });
        ssPicker.addEventListener('change', () => {
            chrome.storage.local.set({sSpeed: ssPicker.value});
            document.getElementById("ssDis").innerHTML=ssPicker.value;
        });  
  });
});
