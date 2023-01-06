var today = new Date()
var curYear = today.getFullYear();
var curMonth = ("0" + (today.getMonth() + 1)).slice(-2);
var aeisItem, totcnt;

$(document).ready(function() {
    $("#getAeis").click(function(){
        if(inputCheck()){
            return;
        }
        resetAll();
        var solYear = $("#month").val().slice(undefined, 4);
        var solMonth = $("#month").val().slice(-2);
        $.get("http://localhost:3000/aeisapi?solYear=" + encodeURI(solYear) + "&solMonth=" + encodeURI(solMonth), function(data, status) {
            if(status == "success") {
                var xmlDoc = new DOMParser().parseFromString(data, "text/xml");
                aeisItem = xmlDoc.getElementsByTagName("item");
                totcnt = xmlDoc.getElementsByTagName("totalCount")[0].childNodes[0].nodeValue;

                var MEmonthData = aeisItem[0].getElementsByTagName("locdate")[0].childNodes[0].nodeValue;
                document.getElementById("MEmonth").innerHTML = MEmonthData.slice(undefined, 4) + "-" + MEmonthData.slice(4, 6);
                document.getElementById("MEtitle").innerHTML = aeisItem[0].getElementsByTagName("astroTitle")[0].childNodes[0].nodeValue;
                document.getElementById("MEinfo").innerHTML = aeisItem[0].getElementsByTagName("astroEvent")[0].childNodes[0].nodeValue;
                $("#MEmonth").css("display", "inline");
                $("#MEinfo").css("display", "inline-block");
                
                while(aeisItem[1].getElementsByTagName("seq")[0].childNodes[0].nodeValue != 1){
                    aeisItem[1].parentNode.removeChild(aeisItem[1]);
                    totcnt -= 1;
                }
                displayPageIndex();
                displayAeis(1);
            }
        });
    });
});
function inputCheck() {
    if($("#month").val() == ""){
        alert("달을 선택하세요.");
        document.getElementById("month").focus();
        return 1;
    }
    var minDate = new Date($("#month").attr("min"));
    var maxDate = new Date($("#month").attr("max"));
    var curDate = new Date($("#month").val());
    if(minDate > curDate || maxDate < curDate){
        alert("범위 내의 달을 선택하세요. ("+ $("#month").attr("min") +" ~ "+ $("#month").attr("max") +")");
        document.getElementById("month").focus();
        return 1;
    }
    return 0;
}
function displayPageIndex() {
    var num = Math.ceil((totcnt - 1)/10);
    for(var i=0; i<num; i++){
        var pageId = "#page" + (i + 1);
        $(pageId).css("display", "inline");
    }
}
function displayAeis(page) {
    var ind = 10 * (page - 1);
    for(var i=1; i<=10; i++){
        if(i+ind >= totcnt){
            break;
        }
        var locdate = aeisItem[i+ind].getElementsByTagName("locdate")[0].childNodes[0].nodeValue;
        var ldFormatted = locdate.slice(undefined, 4) + "-" + locdate.slice(4, 6) + "-" + locdate.slice(-2);
        if(aeisItem[i+ind].getElementsByTagName("astroTime")[0]){
            document.getElementById("date" + i).innerHTML = ldFormatted + " " + aeisItem[i+ind].getElementsByTagName("astroTime")[0].childNodes[0].nodeValue;
        }
        else{
            document.getElementById("date" + i).innerHTML = ldFormatted;
        }
        document.getElementById("event" + i).innerHTML = aeisItem[i+ind].getElementsByTagName("astroEvent")[0].childNodes[0].nodeValue;
        
        var divId = "#div" + i;
        $(divId).css("display", "inline-block");
    }
    var curPage = "#page" + page + " button";
    $(curPage).addClass("enabled");
}
function resetDiv() {
    $(".aeisDiv").css("display", "none");
    for(var i=1; i<=10; i++){
        document.getElementById("date" + i).innerHTML = "";
        document.getElementById("event" + i).innerHTML = "";
    }
}
function resetAll() {
    $(".monthlyEvent").css("display", "inline-block");
    $(".monthlyEvent *").html("")
    document.getElementById("MEtitle").innerHTML = "Loading...";
    $("#MEmonth").css("display", "none");
    $("#MEinfo").css("display", "none");
    $(".pages li").css("display", "none");
    $(".pages li button").removeClass("enabled");
    resetDiv();
}
function changePage(page) {
    resetDiv();
    $(".pages li button").removeClass("enabled");
    displayAeis(page);
}