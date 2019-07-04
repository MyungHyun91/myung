/****************************************************
 * 작성일 : 2019-06-29
 * 전화 : 010-3322-4495
 * 이메일 : kimchiman91@naver.com
 *****************************************************/

/*****************************************************
 * 상수 선언부
 *****************************************************/

// 캡슐화 어떻게 할꺼야???

// 구조체 예제
var ST_CALENDAR = {
    DATE_: null,
    PARENT_TAG_: null,
}

var WEEK_TEXT = ["일", "월", "화", "수", "목", "금", "토"];

// 각 객체 가져오는 getter setter 함수를 만들어줘야하고~ 
// css 로고 구조화는 어떻게 

/*****************************************************
 * 이벤트함수 선언부
 *****************************************************/


/*****************************************************
 * 일반함수 선언부
 *****************************************************/


// 제이쿼리 로드유무 확인후 로드
function loadJQuery()
{
    if (typeof jQuery == 'undefined') {
        var script = document.createElement('script');
        script.type = "text/javascript";
        script.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js";
        document.getElementsByTagName('head')[0].appendChild(script);
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
    setDate();
    
}

function setDate()
{
    $("#txtCalendar").text(getYYYYMMDD()); // 현재날짜 셋팅
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
    
    // 요일 넣어주자~~~~
    
    // 날짜 넣어주자~~~~
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
      
            var $divD1 = $("<div class='d1' cnt='" + nCnt + "'></div>"); // cnt는 0~42
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