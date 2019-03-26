
var canvas = null;
var ctx = null;
var MAP_POS_X_ = 60;
var NEXT_POS_X_ = 170;
var SAVE_POS_X_ = 10;

var CANVAS_SAVE_ = null;
var CTX_SAVE_ = null;

var CANVAS_NEXT_ = null;
var CTX_NEXT_ = null;

var pos_x_ = 4;
var pos_y_ = 0;

var objInterval = null;
var MAP_ = null;
var PAUSE_ = false;
var imgData = null;

var COUNT_ = 0;
var ARR_USER_BLOCK_ = null;
var ARR_NEXT_BLOCK_ = null;
var ARR_SAVE_BLOCK_ = null;
var OUT_SAVE_FLAG   = false;

var ARR_I_BLOCK_ = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0]
];
var ARR_J_BLOCK_ = [
    [0, 0, 0, 0],
    [0, 0, 1, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0]
];
var ARR_L_BLOCK_ = [
    [0, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 1, 1],
    [0, 0, 0, 0]
];
var ARR_O_BLOCK_ = [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
];
var ARR_S_BLOCK_ = [
    [0, 0, 0, 0],
    [0, 0, 1, 1],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
]
var ARR_T_BLOCK_ = [
    [0, 0, 0, 0],
    [0, 1, 0, 0],
    [1, 1, 1, 0],
    [0, 0, 0, 0]
];
var ARR_Z_BLOCK_ = [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 1],
    [0, 0, 0, 0]
];
var ARR_INIT_BLOCK = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];
 
function init_map() {
    MAP_ = [
        [1, 9, 9, 9, 0, 0, 0, 0, 9, 9, 9, 1],
        [1, 9, 9, 9, 0, 0, 0, 0, 9, 9, 9, 1],
        [1, 9, 9, 9, 0, 0, 0, 0, 9, 9, 9, 1],
        [1, 9, 9, 9, 0, 0, 0, 0, 9, 9, 9, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];
}

window.onload = function () {
    
    init_map();

    canvas = document.getElementById("cnvTetrisMap");
    ctx = canvas.getContext("2d");

    ARR_NEXT_BLOCK_ = turn_array(random_arr_block());
    ARR_USER_BLOCK_ = turn_array(random_arr_block()); 
    draw_next_block(ARR_NEXT_BLOCK_);
    
    ctx.beginPath();
    ctx.fillStyle = "gray";
    ctx.rect(58, 0, 2, this.canvas.height);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = "gray";
    ctx.rect(160, 0, 2, this.canvas.height);
    ctx.fill();
    ctx.closePath();
    
    objInterval = setInterval(run, 20);
}

function draw_background() {
    ctx.beginPath();
    ctx.clearRect(60, 0, 100, this.canvas.height);
    ctx.closePath();

    // 블록 중심점?
    for (var nRow = 1; nRow < MAP_[0].length - 1; nRow++) {
        for (var nCol = 0; nCol < MAP_.length - 1; nCol++) {
            if (MAP_[nCol][nRow] == 0) {
                continue;
            }
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.rect((nRow - 1) * 10 + MAP_POS_X_, (nCol) * 10, 10, 10);
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = get_color(MAP_[nCol][nRow]);
            ctx.rect((nRow - 1) * 10 + 1 + MAP_POS_X_, (nCol) * 10 + 1, 8, 8);
            ctx.fill();
            ctx.closePath();
        }
    }
}

function run() {
    
    clearInterval(objInterval);
    COUNT_++;
    if (COUNT_ >= 30) {
        COUNT_ = 0;
        
        if (block_collision(MAP_, ARR_USER_BLOCK_, pos_x_, pos_y_)) {
            
            // 게임종료
            if(pos_y_ < 4){
                alert("game over");
                init_map();
                pos_x_ = 3;
                pos_y_ = 0;
                ARR_USER_BLOCK_ = ARR_NEXT_BLOCK_;
                ARR_NEXT_BLOCK_ = turn_array(random_arr_block());
                draw_next_block(ARR_NEXT_BLOCK_);

                objInterval = setInterval(run, 20);
                return;
            }
            
            save_block();
            
            if(ARR_SAVE_BLOCK_ == null){
                ARR_USER_BLOCK_ = ARR_NEXT_BLOCK_;
                ARR_NEXT_BLOCK_ = turn_array(random_arr_block());
                draw_next_block(ARR_NEXT_BLOCK_);
            }
            else{
                if( OUT_SAVE_FLAG){
                    ARR_USER_BLOCK_ = ARR_SAVE_BLOCK_;
                    ARR_SAVE_BLOCK_ = null;
                    draw_save_block(ARR_SAVE_BLOCK_);
                }
                else {
                    ARR_USER_BLOCK_ = ARR_NEXT_BLOCK_;
                ARR_NEXT_BLOCK_ = turn_array(random_arr_block());
                draw_next_block(ARR_NEXT_BLOCK_);
                }
                
            }
            
            ARR_FILL_ = new Array();
            check_arr_map_fill_row(MAP_.length - 2);
            if (ARR_FILL_.length > 0) {
                update_arr_map();
            }
            pos_x_ = 3;
            pos_y_ = 0;
        }
        else{
            pos_y_++;
        }
    }
    draw_background();
    draw_block(ARR_USER_BLOCK_);
    
    objInterval = setInterval(run, 20);
}

function update_arr_map() 
{    
    init_map();

    for (var i = 0; i < ARR_FILL_.length; i++) {
        MAP_[MAP_.length - i - 2] = ARR_FILL_[i];
    }
}

var ARR_FILL_ = null;
function check_arr_map_fill_row(nRow) {
    if (nRow <= 0) {
        return;
    }
    var bFill = true;
    for (var i = 1; i < MAP_[0].length - 1; i++) {
        if(MAP_[nRow][i] == 9) { // 출입구
            break;
        }
        if (MAP_[nRow][i] == 0) {
            bFill = false;
            break;
        }
    }
    if (!bFill) {
        ARR_FILL_.push(MAP_[nRow]);
    }
    // 재귀함수 
    check_arr_map_fill_row(nRow - 1);
}

function random_arr_block() {
    var ranNum = Math.floor(Math.random() * (7)) + 1;
    var arrBlock = null;
    switch (ranNum) {
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
    
    // 색상 랜덤생성해서 갖고있자
    var nColor = Math.floor(Math.random() * (7)) + 1;
    for (var nRow = 0; nRow < arrBlock.length; nRow++) {
        for (var nCol = 0; nCol < arrBlock[0].length; nCol++) {
            if (arrBlock[nRow][nCol] == 0) {
                continue;
            }
            arrBlock[nRow][nCol] = nColor;
        }
    }
    return arrBlock;
}

function save_block() {
    for (var nRow = 0; nRow < ARR_USER_BLOCK_.length; nRow++) {
        for (var nCol = 0; nCol < ARR_USER_BLOCK_[0].length; nCol++) {
            if (ARR_USER_BLOCK_[nRow][nCol] == 0) {
                continue;
            }
            MAP_[pos_y_ + nCol][pos_x_ + nRow + 1] = ARR_USER_BLOCK_[nRow][nCol];
            // 색상번호 입력
        }
    }
}

function block_collision(MAP, ARR_BLOCK, nX, nY) {
    for (var nRow = 0; nRow < ARR_BLOCK.length; nRow++) {
        for (var nCol = 0; nCol < ARR_BLOCK[0].length; nCol++) {
            if (ARR_BLOCK[nRow][nCol] == 0) {
                continue;
            }
            if (MAP[nY + nCol + 1][nX + nRow + 1] != 0) {
                return true; // 충돌감지
            }
        }
    }
    return false; // 충돌없음
}

// 배열을 돌려보자
function turn_array(ARR_BLOCK) {
    var ARR_TURN_BLOCK = null;

    // 90도 회전
    ARR_TURN_BLOCK = new Array(ARR_BLOCK[0].length);
    for (var nCol = 0; nCol < ARR_BLOCK[0].length; nCol++) {
        ARR_TURN_BLOCK[nCol] = new Array(ARR_BLOCK.length);
        for (var nRow = 0; nRow < ARR_BLOCK.length; nRow++) {
            ARR_TURN_BLOCK[nCol][nRow] = ARR_BLOCK[nRow][ARR_BLOCK[0].length - 1 - nCol];
        }
    }
    return ARR_TURN_BLOCK;
}

// 배열내 데이터 값이 1일 경우 캔버스에 정사각형 그리기
function draw_block(ARR_BLOCK) {
    // 블록 중심점?
    for (var nRow = 0; nRow < ARR_BLOCK.length; nRow++) {
        for (var nCol = 0; nCol < ARR_BLOCK[0].length; nCol++) {
            if (ARR_BLOCK[nRow][nCol] == 0) {
                continue;
            }
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.rect((pos_x_ + nRow) * 10 + MAP_POS_X_, (pos_y_ + nCol) * 10, 10, 10);
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = get_color(ARR_BLOCK[nRow][nCol]);
            ctx.rect((pos_x_ + nRow) * 10 + 1 + MAP_POS_X_, (pos_y_ + nCol) * 10 + 1, 8, 8);
            ctx.fill();
            ctx.closePath();
        }
    }
}


// 다음블록 보여주기
function draw_next_block(ARR_BLOCK) {
    
    ctx.beginPath();
    ctx.clearRect(NEXT_POS_X_, 0, 50, this.canvas.height);
    ctx.closePath();
    
    // 블록 중심점?
    for (var nRow = 0; nRow < ARR_BLOCK.length; nRow++) {
        for (var nCol = 0; nCol < ARR_BLOCK[0].length; nCol++) {
            if (ARR_BLOCK[nRow][nCol] == 0) {
                continue;
            }
            ctx.beginPath();
            ctx.fillStyle = "black";
            ctx.rect((nRow) * 10 + NEXT_POS_X_, (nCol) * 10, 10, 10);
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = get_color(ARR_BLOCK[nRow][nCol]);
            ctx.rect((nRow) * 10 + 1 + NEXT_POS_X_, (nCol) * 10 + 1, 8, 8);
            ctx.fill();
            ctx.closePath();
        }
    }
}

function draw_save_block(ARR_BLOCK, bOutput) {
    
    ctx.beginPath();
    ctx.clearRect(SAVE_POS_X_, 0, 45, this.canvas.height);
    ctx.closePath();
    
    if(ARR_BLOCK == null){
        return;
    }
    var strColor = "black";
    
    if(bOutput){
        strColor = "gold";
    }
    
    // 블록 중심점?
    for (var nRow = 0; nRow < ARR_BLOCK.length; nRow++) {
        for (var nCol = 0; nCol < ARR_BLOCK[0].length; nCol++) {
            if (ARR_BLOCK[nRow][nCol] == 0) {
                continue;
            }
            ctx.beginPath();
            ctx.fillStyle = strColor;
            ctx.rect((nRow) * 10 + SAVE_POS_X_, (nCol) * 10, 10, 10);
            ctx.fill();
            ctx.closePath();
            ctx.beginPath();
            ctx.fillStyle = get_color(ARR_BLOCK[nRow][nCol]);
            ctx.rect((nRow) * 10 + 1 + SAVE_POS_X_, (nCol) * 10 + 1, 8, 8);
            ctx.fill();
            ctx.closePath();
        }
    }
}


function get_color(nNum) {
    var strColor = "";

    switch (nNum) {
        case 1:
            strColor = "#DF494A"; //"red";
            break;
        case 2:
            strColor = "#314C57"; //"lightblue";
            break;
        case 3:
            strColor = "#45B29D"; //"yellow";
            break;
        case 4:
            strColor = "#E08045"; //"pink";
            break;
        case 5:
            strColor = "#EFC94F"; //"purple";
            break;
        case 6:
            strColor = "#E9EEF2"; //"green";
            break;
        case 7:
            strColor = "orange";
            break;
        default:
            strColor = "gray";
            break;
    }
    return strColor;
}

function on_keydown(event) 
{   
    if (event.keyCode == 80) { // P KEY
        if (!PAUSE_) {
            PAUSE_ = true;
            clearInterval(objInterval);
        } else {
            PAUSE_ = false;
            objInterval = setInterval(run, 20);
        }
    }
    if (PAUSE_) {
        return;
    }

    switch (event.keyCode) {
        case 32: // SPACE BAR
            while (!block_collision(MAP_, ARR_USER_BLOCK_, pos_x_, pos_y_)) {
                pos_y_++;
            }
            break;
        case 37: // ARROW LEFT
            if (!block_collision(MAP_, ARR_USER_BLOCK_, pos_x_-1, pos_y_-1)) {
                pos_x_--;
            }
            break;
        case 38: // ARROW UP
            var ARR_COPY_BLOCK = ARR_USER_BLOCK_;
            ARR_USER_BLOCK_ = turn_array(ARR_USER_BLOCK_);
            if (block_collision(MAP_, ARR_USER_BLOCK_, pos_x_, pos_y_-1)) {
                ARR_USER_BLOCK_ = ARR_COPY_BLOCK;
            }
            break;
        case 39: // ARROW RIGHT
            if (!block_collision(MAP_, ARR_USER_BLOCK_, pos_x_+1, pos_y_-1)) {
                pos_x_++;
            }
            break;
        case 40: // ARROW DOWN
            if (!block_collision(MAP_, ARR_USER_BLOCK_, pos_x_, pos_y_)) {
                pos_y_++;
            }
            break;
        case 83: // S KEY
            if(ARR_SAVE_BLOCK_ == null){
                OUT_SAVE_FLAG = false;
                
                ARR_SAVE_BLOCK_ = ARR_NEXT_BLOCK_;
                ARR_NEXT_BLOCK_ = turn_array(random_arr_block());
                draw_save_block(ARR_SAVE_BLOCK_);
                draw_next_block(ARR_NEXT_BLOCK_);
            }
            else{
                OUT_SAVE_FLAG = true;
                draw_save_block(ARR_SAVE_BLOCK_, true);
            }
            break;    
        default:
            break;
    }
}

function btn_click(str_id)
{
    var event = {
        keyCode:0
    };
    
    switch(str_id){
        case "btn_top":
            event.keyCode = 38;
        break;
        case "btn_bottom":
            event.keyCode = 40;
        break;
        case "btn_left":
            event.keyCode = 37;
        break;
        case "btn_right":
            event.keyCode = 39;
        break;
        case "btn_space":
            event.keyCode = 32;
        break;
        case "btn_save":
            event.keyCode = 83;
        break;
        case "btn_pause":
            event.keyCode = 80;
        break;
        default:
        return;
    }
    on_keydown(event);
}