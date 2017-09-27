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
        var lnNumPicker =document.getElementById('lnNum');
        chrome.storage.local.get("lNum", function(data) {
            if(typeof data.lNum != "undefined") {
                lnNumPicker.value=data.lNum;
                document.getElementById("lnNumDis").innerHTML=data.lNum;
            }
        });
        lnNumPicker.addEventListener('change', () => {
            chrome.storage.local.set({lNum: lnNumPicker.value});
            document.getElementById("lnNumDis").innerHTML=lnNumPicker.value;
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
