/****************************************************
 * 작성일 : 2019-06-29
 * 전화 : 010-3322-4495
 * 이메일 : kimchiman91@naver.com
 *****************************************************/

/*****************************************************
 * 상수 선언부
 *****************************************************/


var ST_CALENDAR = { // 일정정보 저장용 클래스
    DATE_: null,
    PARENT_TAG_: null,
}

var WEEK_TEXT = ["일", "월", "화", "수", "목", "금", "토"]; // 요일 텍스트 설정



/*****************************************************
 * 이벤트함수 선언부
 *****************************************************/


/*****************************************************
 * 일반함수 선언부
 *****************************************************/


// JQuery 로드유무 확인후 로드
function loadJQuery()
{
    if (typeof jQuery == 'undefined') {
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.src = "/hompi/jquery_3.3.1/jquery.min.js";
        document.getElementsByTagName('head')[0].appendChild(script);
    } 
}

var modal = document.getElementById("mydiv"); // 일정변경팝업창 객체저장(제거작업 필요)
var FLAG_P = false;               // 일정변경팝업창 보이기/숨기기 플래그(제거작업 필요)
        
window.onclick = function(event) {
    if (FLAG_P) {
        FLAG_P = false;
        return;
    }
    FLAG_P = true;

    // x 축 검사
    if(event.clientX < modal.offsetLeft || event.clientX > modal.offsetLeft + modal.offsetWidth){ 
        modal.style.display = "none"; 
    }
    if(event.clientY - 90 < modal.clientY || event.clientY - 90 > modal.offsetTop + modal.offsetHeight){ // 2019-05-06상단 90px를 어떻게 동적으로 인식할까??
        modal.style.display = "none"; 
    }
}
/*
 * description : 제이쿼리 엔진을 로드하고 캘린더 태그를 초기화한다.
 * param : 
 * return : 초기화 성공(true/false)
 * 작성일 : 2019-06-29
 */
function init()
{    
    // 1. 태그 생성
    createFrame();
    setDay();
    initDate();
    dragElement(document.getElementById("mydiv")); // 일정변경팝업창 드래그이벤트 설정
}

function setDay()
{
    $("#txtCalendar").text(getYYYYMMDD()); // 현재날짜 셋팅
}

document.getElementById("btnPrev").onclick = function() { 
    var YEAR_MONTH_DATE = $("#txtCalendar").text(); 
    YEAR_MONTH_DATE = getPrevYYYYMM(YEAR_MONTH_DATE);
    $("#txtCalendar").text(YEAR_MONTH_DATE);
    initDate();
};
        
document.getElementById("btnNext").onclick = function() {
    var YEAR_MONTH_DATE = $("#txtCalendar").text(); 
    YEAR_MONTH_DATE = getNextYYYYMM(YEAR_MONTH_DATE);
    $("#txtCalendar").text(YEAR_MONTH_DATE);
    initDate();
};

      
function initDate()
{    
    var YEAR_MONTH_DATE = $("#txtCalendar").text(); 
    var nStartCol = parseInt(getWeekNum(getFirstDate(YEAR_MONTH_DATE)), 10);
    var nLastDate = parseInt(getLastDate(YEAR_MONTH_DATE).substr(8,2), 10);
    var nPrevLastDate = getLastDate(getPrevYYYYMMDD(YEAR_MONTH_DATE)).substr(8,2);

    for(var i=0; i<42; i++){

        var objCell = document.getElementById("d0_" + i); 
        var strDay = null;
        var strYYYYMMDD = null;
        var strBackColor = null;
        var strForeColor = null;

        // 휴일 글자색 변경
        if(i%7 == 0){
            strForeColor =  "hotpink";
        }
        else if(i%7 == 6){
            strForeColor =  "skyblue";
        }
        else{
            strForeColor =  "#000000";
        }

        // 셀 배경색 변경
        if(i < nStartCol){
            strDay = nPrevLastDate - nStartCol + i + 1;
            strYYYYMMDD = getPrevYYYYMM(YEAR_MONTH_DATE).replace(/-/gi,'') + ((strDay/10 >= 1)? '' + strDay : '0' + strDay);
            strBackColor = "#eeeeee";
        }
        else if(i > nLastDate + nStartCol - 1){
            strDay = i - (nLastDate + nStartCol - 1);
            strYYYYMMDD = getNextYYYYMM(YEAR_MONTH_DATE).replace(/-/gi,'') + ((strDay/10 >= 1)? '' + strDay : '0' + strDay);
            strBackColor = "#eeeeee";
        }
        else{
            strDay = i - nStartCol + 1;
            strYYYYMMDD = YEAR_MONTH_DATE.replace(/-/gi,'') + ((strDay/10 >= 1)? '' + strDay : '0' + strDay);
            strBackColor = "#ffffff";
        }
//
//        CALENDAR_INFO[i] = {
//            day: strDay,
//            yyyymmdd: strYYYYMMDD,
//            backcolor: strBackColor,
//            forecolor: strForeColor,
//            daily: new Array(),
//            holiday: null
//        }

        objCell.style.color = strForeColor;
        objCell.style.backgroundColor = strBackColor;
        objCell.onclick = function(e){
            if(e.target == e.currentTarget){
                //daily_insert(e);
            }
        }
        objCell.innerHTML = strDay;
    }
}

/*
 css 파일은 있고
 자바스크립트로 수정할껀데 태그 생성되기전에 수정이 될까?
 컨트롤의 css 를 바꾸는거여서 안될거같고
 css 설정 쉽게 하려면 jquery 쓰자
 pollock 아이콘을 로딩시간동안 보이기
  * param : objParent
  
  * return : 달력 object 최상당이 div 이니까 클래스 파일을 넘겨줘
 
 */
function createFrame()
{
    // 셀 변수로 쪼개기
    var nCnt = 0;
    
    for(var i=0; i<7; i++){
        
        if(i==0){
            var $divRow = $("<div class='calendar_week_row'></div>");
             for(var j=0; j<7; j++){
                var $divD0 = $("<div class='d1'>" + WEEK_TEXT[j] + "</div>"); // cnt는 0~42
                $divRow.append($divD0);
             }
            
            $("#o1").append($divRow);
        }
        else{
            var $divRow = $("<div class='calendar_row'></div>");
        
            var $divButton = $("<div id='btn" + nCnt/7 + "' class='btn'></div>"); // btn0 은 0~5
        $divRow.append($divButton);
        
        for(var j=0; j<7; j++){
      
            var $divD1 = $("<div id='d0_"+ nCnt +"' class='d1' cnt='" + nCnt + "'></div>"); // cnt는 0~42
            var $divD2 = $("<div class='d2'>" + nCnt + "</div>");
            var $divD3 = $("<div class='d3'>몸통</div>");
            
            $divD1.append($divD2);
            $divD1.append($divD3);
            $divRow.append($divD1);
            
            nCnt++;
        }
        $("#o1").append($divRow);    
        }
        
        
    }   
}

/**
 * @author 김명현
 * @tel 01033224495
 * @param YYYYMMDD 날짜 문자열
 * @return YYYY-MM-DD 날짜 문자열
  (파라미터가 없으면 오늘날 기준)날짜를 YYYY-MM-DD 형식으로 포맷하여 반환
 */
function getYYYYMMDD(strDate)
{
    var d = null;
    if(strDate == undefined || strDate == null || isNaN(strDate)){
        d = new Date();
    }else{
        d = new Date(strDate);
    }
    var year = d.getFullYear(); 
    var month = '' + (d.getMonth() + 1);
    var day = '' + d.getDate();
    if (month.length < 2) month = '0' + month; 
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
}



    var g_down = 0;
    
    window.onmousedown = function(e)
    {
        e = e || window.event;
        e.preventDefault();
        
        // cell 에서 이벤트발생하거나
        
        // 지렁이 마디에서 이벤트 발생하거나 
        
        switch(e.target.getAttribute("class")){
            case "d1": // 달력 마우스 클릭시                
            case "d2":
            case "d3":
                g_down = e.target.getAttribute("cnt");
                
                earthwormDown(e);
                break;            
            default:
                break;
        }
    }
    
    var g_tag = null;
    var g_width = 0;
    
    // 달력 마우스 클릭시
    function earthwormDown(e)
    {   
        e = e || window.event;
        e.preventDefault();

        var a_over = e.target.getAttribute("cnt");
        var nWidth = 100/7;
        g_width = nWidth;
        
        for(var i=0; i<6; i++){
            var obj = document.getElementById("btn" + i); 
            
            if( i == parseInt(a_over/7, 10) ){
                obj.style.left = (parseInt(a_over, 10)%7*nWidth) + "%";
                obj.style.width = nWidth + "%";
               }
            else{
                obj.style.left = "0px";
                obj.style.width = "0px";
            }
        }
        document.onmouseup = earthwormUp;
        document.onmouseover = earthwormOver;
    }
    
    function earthwormOver(e)
    {   
        var a_over = e.target.getAttribute("cnt");  
        if(e.target.getAttribute("class") == "d1" || e.target.getAttribute("class") == "d2"){
             drawEarthworm(g_down, a_over);   
        }
    } 
    
    function earthwormUp(e)
    {
        document.onmouseup = null;
        document.onmouseover = null;
    }
    
    // 층별로 계산하자
    function drawEarthworm(dayDown, dayOver)
    {
        var nDown = parseInt(dayDown/7, 10);
        var nOver = parseInt(dayOver/7, 10);
        var nDownMin =  parseInt(dayDown%7, 10);
        var nOverMin =  parseInt(dayOver%7, 10);
        
        var nPercent = 100/7;
        
        if(nDown > nOver){ // 다운이 오버보다 날짜가 클 때
            
            for(var i=0; i<6; i++){
                var obj = document.getElementById("btn" + (i) );
                
                 if(i == nDown){ // 시작점 계산
                    obj.style.left =  "0%";
                    obj.style.width = (nDownMin + 1) * nPercent  + "%";
                 }
                else if(i == nOver){ // 현재 마우스 위치까지 계산
                    obj.style.left = (nOverMin) * nPercent + "%";
                    obj.style.width = (7- nOverMin) * nPercent + "%";
                }
                else if(i < nDown && i > nOver) { // 범위 안에 해당된다
                    obj.style.left = "0%";
                    obj.style.width = "100%";
                }
                else { // 범위에 해당되지 않는다
                    obj.style.left = "0%";
                    obj.style.width = "0%";
                }
            }            
        }        
        else if(nDown < nOver){
            
            for(var i=0; i<6; i++){
                var obj = document.getElementById("btn" + (i) );
                
                if(i == nDown){ // 시작점 계산
                    obj.style.left = (nDownMin) * nPercent + "%";
                    obj.style.width = (7-nDownMin) * nPercent + "%";
                }
                else if(i == nOver){ // 현재 마우스 위치까지 계산
                    obj.style.left = "0%";
                    obj.style.width = (nOverMin +1) * nPercent + "%";
                }
                else if(i > nDown && i < nOver) { // 범위 안에 해당된다
                    obj.style.left = "0%";
                    obj.style.width = (7) * nPercent + "%";
                }
                else { // 범위에 해당되지 않는다
                    obj.style.left = "0%";
                    obj.style.width = "0%";
                }
            }
            
        }
        
        else if(nDown == nOver){
            
            for(var i=0; i<6; i++){
                var obj = document.getElementById("btn" + (i) );
                
                 if(i == nDown){ // 시작점 계산
                    
                     if(nDownMin > nOverMin){ // 시작점이 더 큰경우
                         obj.style.left = (nOverMin) * nPercent + "%";
                    obj.style.width = (nDownMin - nOverMin + 1)*nPercent + "%";
                     }
                     else if(nDownMin < nOverMin){ // 시작점이 작은경우
                         obj.style.left = (nDownMin) * nPercent + "%";
                    obj.style.width = (nOverMin -nDownMin +1)* nPercent + "%";
                     }
                     else if(nDownMin == nOverMin){ // 같은경운 기본값
                     
                         obj.style.left = (nDownMin) * nPercent + "%";
                    obj.style.width = nPercent + "%";
                     }
                     else{ // 이상한 값이다
                        return;    
                     }
                     
                 }
                else { // 범위에 해당되지 않는다
                    obj.style.left = "0%";
                    obj.style.width = "0%";
                }
            }
        }
        else {
            // 이상한 값 들어온거
            return;
        }
 
    }
    
    
    function getYYYYMM(strDate)
{
    var d = null;
    if(strDate == undefined || strDate == null || !isNaN(strDate)){
        d = new Date();
    }else{
        d = new Date(strDate);
    }
    var year = d.getFullYear(); 
    var month = '' + (d.getMonth() + 1);
    if (month.length < 2) month = '0' + month; 
    return [year, month].join('-');
}

function getPrevYYYYMMDD(strYYYYMMDD)
{
    var date = new Date(strYYYYMMDD);
    var firstDayOfMonth = new Date( date.getFullYear(), date.getMonth() , 1 );
    var lastMonth = new Date ( firstDayOfMonth.setDate( firstDayOfMonth.getDate() - 1 ) );
    var month = '' + (lastMonth.getMonth() + 1);
    var day = '01';
    var year = '' + lastMonth.getFullYear(); 
    if (month.length < 2) month = '0' + month; 
    return [year, month, day].join('-');
}

function getNextYYYYMMDD(strYYYYMMDD)
{
    var date = new Date(strYYYYMMDD);
    var firstDayOfMonth = new Date( date.getFullYear(), date.getMonth()+1 , 0 );
    var lastMonth = new Date ( firstDayOfMonth.setDate( firstDayOfMonth.getDate() + 1 ) );
    var month = '' + (lastMonth.getMonth() + 1);
    var day = '01';
    var year = '' + lastMonth.getFullYear(); 
    if (month.length < 2) month = '0' + month; 
    return [year, month, day].join('-');
}

function getPrevYYYYMM(strYYYYMM)
{
    var date = new Date(strYYYYMM);
    var firstDayOfMonth = new Date( date.getFullYear(), date.getMonth() , 1 );
    var lastMonth = new Date ( firstDayOfMonth.setDate( firstDayOfMonth.getDate() - 1 ) );
    var month = '' + (lastMonth.getMonth() + 1);
    var year = '' + lastMonth.getFullYear(); 
    if (month.length < 2) month = '0' + month; 
    return [year, month].join('-');
}

function getNextYYYYMM(strYYYYMMDD)
{
    var date = new Date(strYYYYMMDD);
    var firstDayOfMonth = new Date( date.getFullYear(), date.getMonth()+1 , 0 );
    var lastMonth = new Date ( firstDayOfMonth.setDate( firstDayOfMonth.getDate() + 1 ) );
    var month = '' + (lastMonth.getMonth() + 1);
    var year = '' + lastMonth.getFullYear(); 
    if (month.length < 2) month = '0' + month; 
    return [year, month].join('-');
}

function getWeekNum(strDate){
    return new Date(strDate).getDay();
}

function getFirstDate(strDate){
    
    var d = null;
    if(strDate == undefined || strDate == null || !isNaN(strDate)){
        d = new Date();
    }else{
        if(strDate.indexOf("-",0) < 0){
            strDate = strDate.substr(0,4) + '-' + strDate.substr(4,2);
        }
        d = new Date(strDate);
    }
    var dLast = new Date(d.getFullYear(), d.getMonth(), 1);
    var month = '' + (dLast.getMonth() + 1);
    var day = '' + dLast.getDate();
    var year = dLast.getFullYear();
    if (month.length < 2) month = '0' + month; 
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
}

function getLastDate(strDate){
    var d = new Date(strDate);
    var dLast = new Date(d.getFullYear(), d.getMonth()+1, 0);
    var month = '' + (dLast.getMonth() + 1);
    var day = '' + dLast.getDate();
    var year = dLast.getFullYear();
    if (month.length < 2) month = '0' + month; 
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
}


/**
 * @author 김명현
 * @tel 01033224495
 * @param 태그 객체( 예: document.getElementById("div id") )
  태그에 드래그 기능을 추가함
 */
function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event; // 크로스 브라우징 문제로 선언됨. ie 에서 e가 없고 window.event 가 존재함.
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

/**
 * @author 김명현
 * @tel 01033224495
 * @param 태그 객체( 예: document.getElementById("div id") )
  태그에 드래그 기능을 제거함
 */
function dragElementClear(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = null;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = null;
  }
}
