var days = 3; // for subtraction
var today = new Date();
var last = new Date(today.getTime() - (days * 24 * 60 * 60 * 1000));
var maxDate = last.getFullYear() + "-" + ("0" + (last.getMonth() + 1)).slice(-2) + "-" + ("0" + last.getDate()).slice(-2);

$(document).ready(function() {
    $("#getMrp").click(function(){
        if(inputCheck()){
            return;
        }
        resetAll();
        var earth_date = $("#earth_date").val();
        $.get("http://localhost:3000/mrpapi?earth_date=" + encodeURI(earth_date), function(data, status) {
            if(status == "success") {
                $("#title").html("MRP of " + earth_date);
                
                var parsedArr = JSON.parse(data).photos;
                for(var i=0; i<4; i++){
                    if(parsedArr[i]){
                        $("img.mrp").css("display", "inline");
                        $(".mrpDiv p").css("display", "block");
                        document.getElementById("image" + i).setAttribute("src", parsedArr[i].img_src)
                        document.getElementById("info" + i).innerHTML = parsedArr[i].rover.name + " - ID : " + parsedArr[i].id + "<br />" + parsedArr[i].camera.full_name;
                    }
                    else{
                        $(".mrpDiv p").css("display", "block");
                        document.getElementById("image" + i).setAttribute("src", "")
                        document.getElementById("info" + i).innerHTML = "찍힌 사진이 없나봅니다 :(";
                    }
                }
            }
        });
    });
});
function inputCheck() {
    if($("#earth_date").val() == ""){
        alert("날짜를 선택하세요.");
        document.getElementById("earth_date").focus();
        return 1;
    }
    var minDate = new Date($("#earth_date").attr("min"));
    var maxDate = new Date($("#earth_date").attr("max"));
    var curDate = new Date($("#earth_date").val());
    if(minDate > curDate || maxDate < curDate){
        alert("범위 내의 날짜를 선택하세요. ("+ $("#earth_date").attr("min") +" ~ "+ $("#earth_date").attr("max") +")");
        document.getElementById("earth_date").focus();
        return 1;
    }
    return 0;
}
function resetAll() {
    $(".divContainer").css("display", "inline-block");
    $(".mrpDiv img").css("display", "none");
    $(".mrpDiv p").css("display", "none");
    $(".mrp").html("");
    $("#title").html("Loading...");
    $("img.mrp").attr("src", "");
}