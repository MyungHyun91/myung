/****************************************************
 * 작성일 : 2019-06-29
 * 전화 : 010-3322-4495
 * 이메일 : kimchiman91@naver.com
 *****************************************************/

/*****************************************************
 * 상수 선언부
 *****************************************************/



/*****************************************************
 * 이벤트함수 선언부
 *****************************************************/




/*****************************************************
 * 일반함수 선언부
 *****************************************************/



/*
 * description : 제이쿼리 엔진을 로드하고 캘린더 태그를 초기화한다.
 * param : 
 * return : 초기화 성공(true/false)
 * 작성일 : 2019-06-29
 */
function init()
{
    var $div = $('<div>Hello</div>');
    $("#o1").append($div);
    
    // 셀 변수로 쪼개기
    var nCnt = 0;
    
    for(var i=0; i<6; i++){
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

/*
 css 파일은 있고
 자바스크립트로 수정할껀데 태그 생성되기전에 수정이 될까?
 컨트롤의 css 를 바꾸는거여서 안될거같고
 css 설정 쉽게 하려면 jquery 쓰자
 pollock 아이콘을 로딩시간동안 보이기
  * param : objParent
  
  * return : 달력 object 최상당이 div 이니까 클래스 파일을 넘겨줘
 
 */
function createFrame(objParent, clsInfo)
{
    
}