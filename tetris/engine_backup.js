/*jslint plusplus: false */ // 요게 뭔지..

var canvas = null;
var ctx = null;

// 사용자가 움직이는 블록
var BLOCK_USER = null;
var tetris_area = null;

var pos_x = 0;
var pos_y = 0;

var ANGLE_ = 0;
var objInterval = null;
var MAP_ = null;


function init_map()
{
    MAP_ = [
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],    
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1]
    ];    
}

window.onload = function() 
{    
    var st1 = "";
    var arr_ = turn_array(ARR_J_BLOCK_, 3);
   // st1 = arr_;
    for(var i=0; i<arr_.length; i++){
        st1 += "[";
        for(var j=0; j<arr_[0].length; j++){
            st1 += arr_[i][j].toString();// + 
        }
        st1 += "]\n";
    }
//    arr_ = turn_array(ARR_J_BLOCK_, 1);
//    st1 += arr_;
//    arr_ = turn_array(ARR_J_BLOCK_, 2);
//    st1 += arr_;
//    arr_ = turn_array(ARR_J_BLOCK_, 3);
//    st1 += arr_;
//    arr_ = turn_array(ARR_J_BLOCK_, 4);
//    st1 += arr_;
//    arr_ = turn_array(ARR_J_BLOCK_, 5);
//    st1 += arr_;
    alert(st1);
    
    init_map();
    
    canvas = document.getElementById("cnvTetrisMap");
    ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.rect(0,0,150,75);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.save();    
    ctx.closePath();
    
    ctx.translate(30,0);
    ctx.rotate(ANGLE_ * 90 * Math.PI / 180);
    imgData = ctx.getImageData(0, 0, 100, 200);
    COLOR_ = random_color();
    
    objInterval = setInterval(test_func, 20);
}

var imgData = null;

function copy1() {
  ctx.beginPath();
  ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  ctx.putImageData(imgData, 0, 0);
  ctx.closePath();
}

var pos_x = 0;
var pos_y = 0;
var bPos_x = false;
var bPos_y = false;

var COLOR_ = null;

function test_func()
{   
    clearInterval(objInterval); 
    copy1();
    draw_block_j_2();

    switch(ANGLE_){
        case 0:
            ctx.translate(0,1);
            break;
        case 1:
            ctx.translate(1,0);
            break;
        case 2:
            ctx.translate(0,-1);
            break;
        case 3:
            ctx.translate(-1,0);
            break;
        default:
            ctx.translate(1,1);
            break;
    }

    pos_y++;


    if(pos_y > 200){
        COLOR_ = random_color();
        imgData = ctx.getImageData(0, 0, 100, 200);
        
        var nTotal = 201;// + nArrowDown*10;
        if(ANGLE_ == 0){
            ctx.translate(0,-nTotal);    
        }
        else if(ANGLE_ == 1){
            ctx.translate(-nTotal, 0);
        }
        else if(ANGLE_ == 2){
            ctx.translate(0,nTotal);
        }
        else if(ANGLE_ == 3){
            ctx.translate(nTotal,0);
        }
        pos_y = 0;
        nArrowDown = 0;
    }
    objInterval = setInterval(test_func, 20); 
}

function block_collision()
{
    // 
    
}

var ARR_I_BLOCK_ = [
    [1,1,1,1]
];
var ARR_J_BLOCK_ = [
    [1,0,0],
    [1,1,1],
];
var ARR_L_BLOCK_ = [
    [0,0,1],
    [1,1,1]
];
var ARR_BLOCK_O_ = [
    [1,1],
    [1,1]
];
var ARR_S_BLOCK_ = [
    [0,1,1],
    [1,1,0]
]
var ARR_T_BLOCK = [
    [0,1,0],
    [1,1,1]
];
var ARR_Z_BLOCK = [
    [1,1,0],
    [0,1,1]
];

// 배열도 돌려보자
function turn_array(ARR_BLOCK, TURN_)
{    
    var ARR_TURN_BLOCK = null;
    var nRow=0;
    var nCol=0;
    
    switch(TURN_){
        case 0:
            ARR_TURN_BLOCK = ARR_BLOCK;
            break;
        case 1:
            // 90도 회전
            ARR_TURN_BLOCK = new Array(ARR_BLOCK[0].length);
            for(nCol=0; nCol<ARR_BLOCK[0].length; nCol++){
                ARR_TURN_BLOCK[nCol] = new Array(ARR_BLOCK.length);
                for(nRow=0; nRow<ARR_BLOCK.length; nRow++){
                    ARR_TURN_BLOCK[nCol][nRow] = ARR_BLOCK[nRow][nCol];
                }
            }
            break;
        case 2:
            // 180도 회전
            ARR_TURN_BLOCK = new Array(ARR_BLOCK.length);
            for(nRow=0; nRow<ARR_BLOCK.length; nRow++){
                ARR_TURN_BLOCK[nCol] = new Array(ARR_BLOCK[0].length);
                for(nCol=0; nCol<ARR_BLOCK[0].length; nCol++){
                    ARR_TURN_BLOCK[nRow][nCol] = ARR_BLOCK[ARR_BLOCK.length -1 -nRow][ARR_BLOCK[0].length -1 -nCol];
                }
            }
            break;
        case 3:
            // 270도 회전
            ARR_TURN_BLOCK = new Array(ARR_BLOCK[0].length);
            for(nCol=0; nCol<ARR_BLOCK[0].length; nCol++){
                ARR_TURN_BLOCK[nCol] = new Array(ARR_BLOCK.length);
                for(nRow=0; nRow<ARR_BLOCK.length; nRow++){
                    ARR_TURN_BLOCK[nCol][nRow] = ARR_BLOCK[nRow][ARR_BLOCK[0].length -1 -nCol];
                }
            }
            break;
        default:
            ARR_TURN_BLOCK = ARR_BLOCK;
            break;
    }
    return ARR_TURN_BLOCK;
}

function draw_block_j_2()
{
    // 그릴곳이 충돌나는지 판단
    // 충돌이면
    // 1. 현재 그림 배경그림으로 저장
    // 2. 배열에 위치 등록
    // 3. 새로운 블록 로드
    block_collision();
    
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.rect(0, 0, 10, 10);
    ctx.rect(0, 10, 30, 10);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = COLOR_;
    ctx.rect(1, 1, 8, 8);
    ctx.rect(1, 11, 8, 8);
    ctx.rect(11, 11, 8, 8);
    ctx.rect(21, 11, 8, 8);
    ctx.fill();
    ctx.closePath();
}

function load_block()
{
    BLOCK_I = null;
    BLOCK_J = null;
    BLOCK_L = null;
    BLOCK_O = null;
    BLOCK_S = null;
    BLOCK_T = null;
    BLOCK_Z = null;
}

function copyclass()
{
    this.dede = {
        canvas : document.getElementById("cnvTetrisMap"),
        start : function() {    
            this.context = this.canvas.getContext("2d");
            this.context.fillStyle = random_color();
            this.context.fillRect(0,0,10,10);         
            document.body.insertBefore(this.canvas, document.body.childNodes[0]);
            this.frameNo = 0;
            this.interval = setInterval(update_tetris_area, 20);
        },
        stop : function() {
            clerInterval(this.interval);
        },
        clear : function() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
    this.non = "non non";
}
function random_color() 
{
    var ranNum = Math.floor(Math.random()*(7)) + 1;
    var strColor = "";
    switch(ranNum){
        case 1:
        strColor = "red";
        break;
        case 2:
        strColor = "lightblue";
        break;
        case 3:
        strColor = "yellow";
        break;
        case 4:
        strColor = "pink";
        break;
        case 5:
        strColor = "purple";
        break;
        case 6:
        strColor = "green";
        break;
        case 7:
        strColor = "orange";
        break;
        default:
        strColor = "orange";
        break;
    }
    return strColor;
}

/*
 * 2019-02-23 kmh
 * 테트리스 블록이미지를 배열에 저장
 * 이미지 모양설명 : 4개를 이어붙인 여러 가지 도형을 이리 저리 빈틈ㅇ벗이 쌓는 게임이다.
 * 모양의 종류는 아래와 같이 모두 7가지가 있다.
 */
function start_game()
{
    BLOCK_USER = new component_block_i();
}

function component_block_i()
{
    this.type = type;
    this.width = 10;
    this.height = 10;
    this.speed = 2;
    this.angle = 0;
    this.x = 2;
    this.y = 2;
    this.update = function() {
        ctx = tetris_area.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * 90 * Math.PI / 180);
        ctx.fillStyle = "red";
        ctx.fillRect(this.width/-2, this.height/-2, this.width, this.height);
        ctx.restore();
    }
    this.newPos = function() {
        this.x = this.speed * this.x;
        this.y = this.speed * this.y;
    }
}

function get_block_i()
{   
    // 컨텍스트 반환
    canvas = document.getElementById("cnvTetrisMap");
    this.ctx = canvas.getContext("2d");
    ctx.fillStyle = random_color();
    
    ctx.fillRect(0,0,150,75);
    return
}


function update_tetris_area()
{
    tetris_area.clear();
    BLOCK_USER.newPos();
    BLOCK_USER.update();
}

var bPause = false;
function myFunction(event)
{
    switch(event.keyCode){
    case 32: // SPACE
        if(!bPause){
            bPause = true;
            clearInterval(objInterval); 
        }
        else{
            bPause = false;
            objInterval = setInterval(test_func, 20); 
        }
        break;
    case 37: // ARROW LEFT
        moveBlock(10);
        break;
    case 38: // ARROW UP
        ANGLE_ = (ANGLE_+1)%4;
        ctx.rotate(90 * Math.PI / 180);
        break;
    case 39: // ARROW RIGHT
        moveBlock(-10);
        break;
    case 40: // ARROW DOWN
        if(pos_y < 190){
            moveBlock2(10)    
        }
        else{
            moveBlock2(200-pos_y)
        }
        nArrowDown++;
        pos_y = pos_y + 10;
        break;
    
        default:
        break;
    }
}

var nArrowDown = 0;
function moveBlock(nLeftRight)
{
    switch(ANGLE_){
        case 0:
            ctx.translate(-nLeftRight,0);
            break;
        case 1:
            ctx.translate(0,nLeftRight);
            break;
        case 2:
            ctx.translate(nLeftRight,0);
            break;
        case 3:
            ctx.translate(0,-nLeftRight);
            break;
        default:
            ctx.translate(nLeftRight,0);
            break;
    }   
}

function moveBlock2(nDown)
{
    switch(ANGLE_){
        case 0:
            ctx.translate(0,nDown);
            break;
        case 1:
            ctx.translate(nDown,0);
            break;
        case 2:
            ctx.translate(0,-nDown);
            break;
        case 3:
            ctx.translate(-nDown,0);
            break;
        default:
            ctx.translate(nDown,0);
            break;
    }   
}