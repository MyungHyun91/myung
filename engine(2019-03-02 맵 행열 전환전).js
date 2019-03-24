/*jslint plusplus: false */ // 요게 뭔지..
var canvas = null;
var ctx = null;

var pos_x = 4;
var pos_y = 0;

var objInterval = null;
var MAP_ = null;
var PAUSE_ = false;
var imgData = null;
var COLOR_ = null;
var COUNT_ = 0;
var ARR_USER_BLOCK = null;

var ARR_I_BLOCK_ = [
    [1],
    [1],
    [1],
    [1]
];
var ARR_J_BLOCK_ = [
    [0,1],
    [0,1],
    [1,1]
];
var ARR_L_BLOCK_ = [
    [1,1],
    [0,1],
    [0,1]
];
var ARR_O_BLOCK_ = [
    [1,1],
    [1,1]
];
var ARR_S_BLOCK_ = [
    [0,1],
    [1,1],
    [1,0]
]
var ARR_T_BLOCK_ = [
    [0,1],
    [1,1],
    [0,1]
];
var ARR_Z_BLOCK_ = [
    [1,0],
    [1,1],
    [0,1]
];

function init_map()
{
    MAP_ = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    ];    
}

window.onload = function() 
{
    init_map();
    
    canvas = document.getElementById("cnvTetrisMap");
    ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.rect(0,0,150,75);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.save();    
    ctx.closePath();
    
    imgData = ctx.getImageData(0, 0, 100, 200);
    COLOR_ = random_color();
    
    ARR_USER_BLOCK_ = ARR_T_BLOCK_;
    
    objInterval = setInterval(run, 20);
}

function draw_background() {
  ctx.beginPath();
  ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  ctx.putImageData(imgData, 0, 0);
  ctx.closePath();
}

function run()
{   
    clearInterval(objInterval); 
    
    draw_background();
    draw_block(ARR_USER_BLOCK_);
    
   
    COUNT_++;
    if(COUNT_ >= 10){
         if(block_collision(MAP_, ARR_USER_BLOCK_)){
            COLOR_ = random_color();
            save_block();
            ARR_USER_BLOCK_ = random_arr_block();
            block_fill_row_delete();

            imgData = ctx.getImageData(0, 0, 100, 200);
            pos_x = 4;
            pos_y = 0;
        }
        COUNT_ = 0;
        pos_y++;
    } 
   
    objInterval = setInterval(run, 20); 
}

var ARR_FILL = null;
function block_fill_row_delete(nRow)
{
    if(nRow <= 0){
        return;
    }
    // 맵의 아래부터 1인 부분을 땅기고
    var bFill = true;
    
    for(var i=1; i<MAP_.length-1; i++){
        if(MAP_[i][nRow] == 0){
            bFill == false;
            break;
        }
    }
    
    if(!bFill){
        ARR_FILL.push
    }
    
    // 그림을 잘라서 
    
    // 재귀함수 
    block_fill_row_delete(nRow--);
}

function random_arr_block()
{
    var ranNum = Math.floor(Math.random()*(7)) + 1;
    var arrBlock = null;
    switch(ranNum){
        case 1:
        arrBlock = ARR_I_BLOCK_;
        break;
        case 2:
        arrBlock = ARR_J_BLOCK_;
        break;
        case 3:
        arrBlock = ARR_L_BLOCK_;
        break;
        case 4:
        arrBlock = ARR_O_BLOCK_;
        break;
        case 5:
        arrBlock = ARR_S_BLOCK_;
        break;
        case 6:
        arrBlock = ARR_T_BLOCK_;
        break;
        case 7:
        arrBlock = ARR_Z_BLOCK_;
        break;
        default:
        arrBlock = ARR_I_BLOCK_;
        break;
    }
    return arrBlock;
}

function save_block()
{
    // 그려질 블록 위치와 MAP_ 의 좌표가 1일 때
    for(var nCol=0; nCol<ARR_USER_BLOCK_[0].length; nCol++){
        for(var nRow=0; nRow<ARR_USER_BLOCK_.length; nRow++){
            if(ARR_USER_BLOCK_[nRow][nCol] != 1){
                continue;
            }
            MAP_[pos_x+nRow+1][pos_y+nCol] = 1;   
        }
    }
}

function block_collision(MAP, ARR_BLOCK)
{   
    // 그려질 블록 위치와 MAP_ 의 좌표가 1일 때
    for(var nCol=0; nCol<ARR_BLOCK[0].length; nCol++){
        for(var nRow=0; nRow<ARR_BLOCK.length; nRow++){
            if(ARR_BLOCK[nRow][nCol] != 1){
                continue;
            }
            if( MAP[pos_x+nRow+1][pos_y+nCol+1] == 1 ){
                return true; // 충돌감지
            }
        }
    }
    return false; // 충돌없음
}

// 배열도 돌려보자
function turn_array(ARR_BLOCK)
{    
    var ARR_TURN_BLOCK = null;
    
    // 90도 회전
    ARR_TURN_BLOCK = new Array(ARR_BLOCK[0].length);
    for(var nCol=0; nCol<ARR_BLOCK[0].length; nCol++){
        ARR_TURN_BLOCK[nCol] = new Array(ARR_BLOCK.length);
        for(var nRow=0; nRow<ARR_BLOCK.length; nRow++){
            ARR_TURN_BLOCK[nCol][nRow] = ARR_BLOCK[nRow][ARR_BLOCK[0].length -1 -nCol];
        }
    }
    return ARR_TURN_BLOCK;
}

// 배열내 데이터 값이 1일 경우 캔버스에 정사각형 그리기
function draw_block(ARR_BLOCK)
{    
    // 블록 중심점?
    for(var nRow=0; nRow<ARR_BLOCK.length; nRow++){
        for(var nCol=0; nCol<ARR_BLOCK[0].length; nCol++){    
            if(ARR_BLOCK[nRow][nCol] != 1){
                continue;
            }
            // 2행 3열 
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.rect( (pos_x+nRow)*10, (pos_y+nCol)*10, 10, 10);
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = COLOR_;
            ctx.rect((pos_x+nRow)*10+1, (pos_y+nCol)*10+1, 8, 8);
            ctx.fill();
            ctx.closePath();
        }
    }
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

function on_keydown(event)
{
    clearInterval(objInterval); 
    switch(event.keyCode){
    case 32: // SPACE
        if(!PAUSE_){
            PAUSE_ = true;
            clearInterval(objInterval); 
        }
        else{
            PAUSE_ = false;
            objInterval = setInterval(run, 20); 
        }
        return;
    case 37: // ARROW LEFT
        pos_x--;
        if(block_collision(MAP_, ARR_USER_BLOCK_)){
            pos_x++;
        }
        break;
    case 38: // ARROW UP
        var ARR_COPY_BLOCK = ARR_USER_BLOCK_;   
        ARR_USER_BLOCK_ = turn_array(ARR_USER_BLOCK_);
        if(block_collision(MAP_, ARR_USER_BLOCK_)){
            ARR_USER_BLOCK_ = ARR_COPY_BLOCK;
        }
        break;
    case 39: // ARROW RIGHT
        pos_x++;
        if(block_collision(MAP_, ARR_USER_BLOCK_)){
            pos_x--;
        }
        break;
    case 40: // ARROW DOWN
        pos_y++;
        if(block_collision(MAP_, ARR_USER_BLOCK_)){
            pos_y--;
        }
        
        break;
    default:
        break;
    }
    objInterval = setInterval(run, 20); 
}

