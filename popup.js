function getCurrentTabUrl(callback) {
    var queryInfo = {
        active: true,
        currentWindow: true
    };
    chrome.tabs.query(queryInfo, (tabs) => {
        var tab = tabs[0];
        var url = tab.url;
        console.assert(typeof url == 'string', 'tab.url should be a string');
        callback(url);
    });
}
document.addEventListener('DOMContentLoaded', () => {
    getCurrentTabUrl((url) => {
        var masterSwitch =document.getElementById('masterSwitch');
        chrome.storage.local.get("mSwitch", function(data) {
            if(typeof data.mSwitch != "undefined") {
                masterSwitch.checked=data.mSwitch;
                if(masterSwitch.checked){
                    document.getElementById("switchStatus").innerHTML="ON";
                }else{
                    document.getElementById("switchStatus").innerHTML="OFF";
                }
            }
        });
        masterSwitch.addEventListener('change', () => {
            chrome.storage.local.set({mSwitch: masterSwitch.checked});
            if(masterSwitch.checked){
                    document.getElementById("switchStatus").innerHTML="ON";
                }else{
                    document.getElementById("switchStatus").innerHTML="OFF";
                }
        });  
        var randomColor =document.getElementById('randomColor');
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
        
        
        
        
        
        var opacityPicker =document.getElementById('opacitySet');
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
        
        
        var colorPicker =document.getElementById('fontColor');
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
        var sizePicker =document.getElementById('fontSize');
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
        var lnNumPicker =document.getElementById('commentBuffer');
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
        var ssPicker =document.getElementById('sSpeed');
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
