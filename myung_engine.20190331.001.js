/**
 * 일자 : 2019-03-31
 * 버전 : 1.20190331.001
 * 저자 : kmh
 * 이메일 : kimchiman91@naver.com
 **/

//var G_B_MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
var canvas = null;
var ctx = null;

function demo_init()
{
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    
    // 캔버스 초기화
   // objInterval = setInterval(start, 100);

    var imgTile001 = new Image();
    
    imgTile001.addEventListener('load', function(){
        ctx.drawImage(imgTile001, 0, 0);
        ctx.drawImage(imgTile001, 32, 0);
        ctx.drawImage(imgTile001, 64, 0);
        ctx.drawImage(imgTile001, 96, 0);
        ctx.drawImage(imgTile001, 128, 0);
    },false);
    imgTile001.src='./image/tile_map001.png';
   
}

function start()
{
       // 모바일이면 화면에 조이스틱을 보여라
//    if(B_MOBILE){
//        
//    }
    
 
}

function end()
{
    
}

function create_module()
{
    
}
