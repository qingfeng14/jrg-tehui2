function ajax(opts){
       var xmlhttp;
       if(window.XMLHttpRequest){
        xmlhttp= new XMLHttpRequest();    //code for IE7+,ff ,chrome,opera,safari
       }else{
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");  // code for IE 6, 5
       }
      

       xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4 & xmlhttp.status==200) {
            var json=JSON.parse(xmlhttp.responseText);   //将后台传送的json数据转换字符串对象
            opts.success(json);  // 数据传入目标函数
        }
        if (xmlhttp.readyState === 4 && xmlhttp.status === 404) {
            opts.error();//失败之后如何处理
        }
       }

     var dataStr='';
     for(var key in opts.data){
        dataStr += key +'='+opts.data[key]+'&';  //拼装键值对
     }
     dataStr= dataStr.substr(0,dataStr.length-1);  // 删除最后的&符号

     if (opts.type.toLowerCase() ==='get') {
        xmlhttp.open(opts.type,opts.url+'?'+dataStr,true);
        xmlhttp.send();
     }
     else {
        xmlhttp.open(opts.type,opts.url,true);
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded")
        xmlhttp.send(dataStr);
     }
}