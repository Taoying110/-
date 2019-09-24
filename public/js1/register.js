// var btn=document.getElementById("tijiao");
// var xhr=new XMLHttpRequest;
// btn.onclick=function(){
//         xhr.onreadystatechange=function(){
//             if(xhr.readyState==4&&xhr.status==200){
//                 var data = xhr.responseText;
//                 console.log(data);
//             }
//         var sge="uname="+inputName.value+"&upwd="+inputPwd.value;
//         console.log(sge); 
//         xhr.open("post","product/insert",true);
//         xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
//         xhr.send(sge);
//     }
// }
$('#tijiao').click(function() {
    $.ajax({
        url: 'product/insert',
        type: 'post',
        data: {
            "uname": $('#inputName').val(),
            "upwd": $('#inputPwd').val()
        },
        dataType: "json",
        success: function(result) {
            if (result.code == 0) {
                alert(result.msg);
            } else
            if (result.code == -1) {
                alert(result.msg);
            } else if (result.code == 1) {
                alert(result.msg);
                location.href = "forward.html";
            }
        }
    });
});