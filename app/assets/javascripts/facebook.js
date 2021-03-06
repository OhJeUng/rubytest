//facebook.js
//상태체크 함수 정의
function statusChangeCallback(response, callback) {
    // response 객체는 상태 값을 리턴합니다.
    if (response.status === 'connected') {
        // 권한을 얻었을 경우
        if(typeof callback == 'function') callback();
    } else if (response.status === 'not_authorized') {
        // 권한이 없는 경우
        alert("권한 승인을 해야 이용가능한 기능입니다.");
    } else {
        // 페이스북 로그인을 하지 않은 경우
        alert("로그인해야 이용가능한 기능입니다.");
    }
}

//초기화 코드
window.fbAsyncInit = function() {
    FB.init({
        appId      : 1583286941899718,
        xfbml      : true,
        version    : 'v2.2'
    });
    //여기에 기타 초기화 스크립트 작성
    FB.Event.subscribe("comment.create", function(response){
        //댓글 달면 캔버스 높이 다시 세팅
        var wrapperHeight = $('#wrapper').height()+ 80;
        FB.Canvas.setSize({ width: 810, height: wrapperHeight});
    });
    //로딩 후 Canvas 높이값 재설정
    setTimeout(function(){
        if(!isMOBILE) $('.fb_iframe_widget').css({'padding':'0 15px'}).find('iframe').css('width', '780px')
        var wrapperHeight = $('#wrapper').height()+ 30;
        FB.Canvas.setSize({ width: 810, height: wrapperHeight});
    },2000);
};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/ko_KR/sdk.js#xfbml=1&appId=1583286941899718&version=v2.2";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

$(document).ready(initPage);
function initPage(){
    $('.share_event').click(function(){
        var href = "https://javascript-test-ohjeung.c9users.io/";
        FB.login(function(response) {
            //set user info hear
            FB.getLoginStatus(function(response) {
                statusChangeCallback(response, sharePopup(href));
            });
        }, {scope: 'public_profile'});
        return false;
    });
}

function sharePopup(href){
    FB.ui({
        method: 'share',
        href: href
    },function(response){
        if(response.error_code){
            //공유 실패시
            console.log(response);
        }else{
            //공유 성공시
            update_user_status();//함수 상세 생략
        }
        //console.log(response);
    });
}