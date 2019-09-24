$('#chenggong').click(function () {
    $.ajax({
        url : 'product/select',
        type : 'post',
        data : {
            "uname" : $('#uname').val(),
            "upwd" : $('#upwd').val()
        },
        dataType:"json",
        success : function (result) {
            if(result.code==0){
                alert(result.msg);
            }else
            if(result.code==-1){
                alert(result.msg);
            }else if(result.code==1){
                alert(result.msg1);
                console.log(result.msg2)
                location.href=`../home.html?uname=${result.msg2}`;
                // location.href=`http://192.168.33.197:3000/my.html`
            }
        }
    });
});