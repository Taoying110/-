//引入模块
const express=require("express");
var qs=require("querystring")
const pool=require("../pool");
//创建一个路由对象   
var router=express.Router();

router.get("/zcUname",(req,res)=>{
    var uname=(req.query.uname);
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        var sql="select* from user where uname=?";
        conn.query(sql,[uname],(err,result)=>{
            if(err)throw err;
            if(result==""){
                res.json({code:1,msg:"允许注册"});
            }else{
                res.json({code:-1,msg:"用户名以存在"});
            }
            conn.release();
        })  
    });
})
router.post("/zc",(req,res)=>{
    req.on("data",(buf)=>{
        var obj=qs.parse(buf.toString());
        pool.getConnection((err,conn)=>{
            if(err) throw err;
            var sql="INSERT INTO user (uname,password) VALUES (?,?);";
            conn.query(sql,[obj.uname,obj.password],(err,result)=>{
                console.log(reslut);
                if(err)throw err;
                if(result.affectedRows==0){
                    res.json({code:-1,msg:"注册失败"});
                }else{
                    res.json({code:1,msg:"注册成功"});
                }
                conn.release();
            })  
        });
    })
})
router.post("/dl",(req,res)=>{
    req.on("data",(buf)=>{
        var obj=qs.parse(buf.toString());
        pool.getConnection((err,conn)=>{
            if(err) throw err;
            var sql="select* from user where uname=? and password=?";
            conn.query(sql,[obj.uname,obj.password],(err,result)=>{
                if(err)throw err;
                if(result==""){
                    res.json({code:-1,msg:"登录失败"});
                }else{
                    res.json({code:1,msg:"登录成功"});
                }
                conn.release();
            })  
        });
    })
})
//注册 
router.post("/insert",(req,res)=>{
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        let params=req.body;
        var sql="SELECT * FROM xs where uname=?";
        conn.query(sql, params.uname,(err, result) => {
            if (err) throw err;
            else{
                if(result.length!==0){
                    res.json({code:0,msg:"该用户名已注册"})
                    res.end()
                }else if(result.length==0){
                    var sql="insert into xs(uname,upwd) values(?,?)"
                    conn.query(sql, [params.uname,params.upwd],(err, result) => {
                        if (err) throw err;
                        if(result.affectedRows>0){
                                res.json({code:1,msg:"注册成功"})
                            }else{
                                res.json({code:-1,msg:"注册失败"})
                            }
                    });
                }
            }
        });
    })
})
//登录
router.post("/select",(req,res)=>{
    pool.getConnection((err,conn)=>{
        if(err) throw err;
        let params=req.body;
        var sql="SELECT * FROM xs where uname=?";
        conn.query(sql, params.uname,(err, result) => {
            if (err) throw err;
            else{
                if(result.length==0){
                    res.json({code:0,msg:"你还没有注册，快去注册一个账号吧"});
                    res.end();
                }else if(result.length!==0){
                    var sql="SELECT * FROM xs where uname=? and upwd=?"
                    conn.query(sql, [params.uname,params.upwd],(err, result) => {
                        if (err) throw err;
                        else{
                            if(result.length==0){
                                res.json({code:-1,msg:"密码错误，请重新登录"});
                                res.end();
                            }else{
                                res.json({code:1,msg1:"登录成功",msg2:params.uname});
                                res.end();
                            }
                        }
                    });
                }
            }
        });
    })
})
//将router向外公开
module.exports=router;