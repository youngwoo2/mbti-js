/* [Step 01] 시작 버튼 누르면 test.html 페이지로 이동 */
function start() {
    location.href = 'test.html';
}

/************************************/
/************************************/
/************************************/

/* 
    [Step 01] 초기화
    문제 번호는 0번으로 초기화, 문제와 답변 JSON으로 구성하기 
*/
let no = 0;


/* 
    [Step 02] 다음 문제로 이동
        ㄴ no 값을 증가시키고
        ㄴ no 값이 마지막 질문을 넘어갔다면 결과 페이지로 이동,
        ㄴ 아니면 다음 문제를 출력
*/
function next() {
    no++;
            
    /* 
        [Step 03] no 값이 마지막 질문을 넘어갔을 때
            ㄴ MBTI를 계산하고 결과 페이지(result.html)로 이동
            ㄴ 이동할 때 MBTI 결과를 파라미터로 전달
    */
    if(no > questionList.length - 1) {
        var mbti = "";
        ($("#EI").val() < 2) ? mbti+="I" : mbti+="E";
        ($("#SN").val() < 2) ? mbti+="N" : mbti+="S";
        ($("#TF").val() < 2) ? mbti+="F" : mbti+="T";
        ($("#JP").val() < 2) ? mbti+="P" : mbti+="J";
        console.log("mbti: " + mbti);

        location.href = 'result.html?mbti=' + mbti;
    } else {
        render();
    }
}


/* 
    [Step 04] 문제 출력
    ㄴ 문제와 답변은 문제 데이터(questionList)에 있는 데이터 이용
*/
    function render() {
    $("#no").html(no+1);
    $("#title").html(questionList[no]["title"]);
    $("#type").val(questionList[no]["type"]);
    $("#A").html(questionList[no]["A"]);
    $("#B").html(questionList[no]["B"]);
}

/* 
    [Step 05] 점수를 추가하는 함수
        ㄴ 현재 type이 무엇인지 가져오고,
        ㄴ type에 해당하는 값을 가져옴 (EI라면 #EI의 값을 가져옴)
        ㄴ type에 해당하는 값에 1을 더하고, 다시 type에 값으로 지정
*/
const addScore = () => {
    var type = $("#type").val();
    var typeValue = $("#"+type).val();
    $("#"+type).val(parseInt(typeValue)+1);
}

/* 
    [Step 06] test.html 페이지에 처음 들어왔을 때
        ㄴ 문제 출력
        ㄴ A 버튼을 클릭하면 점수 증가 후 다음 문제로 이동
        ㄴ B 버튼을 클릭하면 다음 문제로 이동
*/
$(document).ready(function(){
    render();
    $("#A").on("click", () => {
        addScore()
        next();
    });
    $("#B").on("click", () => {
        next();
    });
});


/************************************/
/************************************/
/************************************/


/* 
    [Step 01] 초기화
    문제 번호는 0번으로 초기화, 문제와 답변 JSON으로 구성하기 
*/

let no = 0;
let mbtiScore = [
    { id: "EI", score: 0 },
    { id: "SN", score: 0 },
    { id: "TF", score: 0 },
    { id: "JP", score: 0 },
]; 

/* 
    [Step 02] 다음 문제로 이동
        ㄴ no 값을 증가시키고
        ㄴ no 값이 마지막 질문을 넘어갔다면 결과 페이지로 이동,
        ㄴ 아니면 다음 문제를 출력
*/
function next() {
    no++;
    
    /* 
        [Step 03] no 값이 마지막 질문을 넘어갔을 때
            ㄴ MBTI를 계산하고 결과 페이지(result.html)로 이동
            ㄴ 이동할 때 MBTI 결과를 파라미터로 전달
    */
    if(no > questionList.length - 1) {
        var mbti = mbtiScore.reduce((acc, curr) =>
            acc + (curr.score >= 2 ? curr.id.substring(0, 1): curr.id.substring(1, 2)), ""
        )
        console.log('mbti', mbti);
        location.href = 'result.html?mbti=' + mbti;
    } else {
        render();
    }
}

/* 
    [Step 04] 문제 출력
        ㄴ 문제와 답변은 문제 데이터(questionList)에 있는 데이터 이용
*/
function render() {
    $("#no").html(parseInt(no + 1));
    $("#title").html(questionList[no].title);
    $("#A").html(questionList[no].A);
    $("#B").html(questionList[no].B);
}

/* 
    [Step 05] 점수를 추가하는 함수
        ㄴ (A 버튼을 클릭한 경우) EI, SN, TF, JP에 해당하는 값을 1증가,
*/
const addScore = () => {
    const _type = questionList[no]["type"];
    mbtiScore = mbtiScore.map((s) => 
        s.id === _type? {id: s.id, score: s.score + 1} : s
    );
}

/* 
    [Step 06] test.html 페이지에 처음 들어왔을 때
        ㄴ 문제 출력
        ㄴ A 버튼을 클릭하면 점수 증가 후 다음 문제로 이동
        ㄴ B 버튼을 클릭하면 다음 문제로 이동
*/
$(document).ready(function() {
    render();
    $("#A").on("click", () => {
        addScore()
        next();
    });
    $("#B").on("click", () => {
        next();
    });
});


/************************************/
/************************************/
/************************************/

/* 
    [Step 02] 결과 출력
    URL에서 mbti 결과를 가지고 와서, 해당하는 mbti 출력
*/
const params = new URL(location.href).searchParams;
const mbti = params.get('mbti');

$("#img").attr("src", './img/' + mbti + '.png');
$("#mbtiType").html(result[mbti]["mbtiType"]);
$("#explain").html(result[mbti]["explain"]);
