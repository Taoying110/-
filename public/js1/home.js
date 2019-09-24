//更新主页面
var url=location.search.slice(1);
console.log(location.search)
console.log(url.length);
if(url.length==0){
    console.log($("#sddhs"))
    $(".beforelogin").css("display","block");
    $(".afterlogin").css("display","none");
}else{
    $(".beforelogin").css("display","none");
    $(".afterlogin").css("display","block");
    var arr=url.split("=");
    var obj={};
    obj[arr[0]]=decodeURI(arr[1]);
    $(".card-top-right-box .text-ellipsis").html(obj[arr[0]]);
}
$(".tuichu").click(function(e){
    e.preventDefault();
    location.href="http://127.0.0.1:3000/home.html";
})
$(".shopcarticon").click(function(e){
    e.preventDefault();
    window.open(`http://127.0.0.1:3000/shoucang.html${decodeURI(location.search)}`);
})


