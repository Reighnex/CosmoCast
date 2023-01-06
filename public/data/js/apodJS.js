var today = new Date().toISOString().split("T")[0];

$(document).ready(function() {
    $("#getApod").click(function(){
        if(inputCheck()){
            return;
        }
        resetAll();
        var date = $("#date").val();
        $.get("http://localhost:3000/apodapi?date=" + encodeURI(date), function(data, status) {
            if(status == "success") {
                var parsed = JSON.parse(data);
                if(!parsed.media_type){
                    document.getElementById("title").innerHTML = "오늘은 사진이 없나봅니다 :(";
                    return;
                }

                if(parsed.media_type == "image" && parsed.hdurl){
                    $("#image").css("display", "inline-block");
                    document.getElementById("image").setAttribute("src", parsed.hdurl);
                }
                else if(parsed.media_type == "video"){
                    $("#video").css("display", "inline-block");
                    document.getElementById("video").setAttribute("src", parsed.url);
                }
                else{
                    $("#image").css("display", "inline-block");
                    document.getElementById("image").setAttribute("src", parsed.url);
                }
                $("#explanation").css("display", "inline-block");
                document.getElementById("title").innerHTML = parsed.title;
                document.getElementById("explanation").innerHTML = "&nbsp" + parsed.explanation;
                if(parsed.copyright){
                    document.getElementById("copyright").innerHTML = "&copy; " + parsed.copyright;
                    $("#copyright").css("display", "inline-block");
                }
            }
        });
    });
});
function inputCheck() {
    if($("#date").val() == ""){
        alert("날짜를 선택하세요.");
        document.getElementById("date").focus();
        return 1;
    }
    var minDate = new Date($("#date").attr("min"));
    var maxDate = new Date($("#date").attr("max"));
    var curDate = new Date($("#date").val());
    if(minDate > curDate || maxDate < curDate){
        alert("범위 내의 날짜를 선택하세요. ("+ $("#date").attr("min") +" ~ "+ $("#date").attr("max") +")");
        document.getElementById("date").focus();
        return 1;
    }
    return 0;
}
function resetAll() {
    $("#apodDiv").css("display", "inline-block");
    $(".apod").html("");
    $("#image").css("display", "none");
    $("#video").css("display", "none");
    $("#explanation").css("display", "none");
    $("#copyright").css("display", "none");
    document.getElementById("image").setAttribute("src", "");
    document.getElementById("video").setAttribute("src", "");
    document.getElementById("title").innerHTML = "Loading...";
}