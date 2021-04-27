// $(function(){
// 		var notedPad = $('.notepads')
//
// 		$(window).scroll(function () {
// 			if ($(this).scrollTop() > 300) {
// 				notedPad.addClass('animate');
//
// 			}else{
// 				notedPad.removeClass('animate');
// 			}
// 		});
//
//
//
// });

$(function () {
	var notedPad = $('.notepads');

	$(window).scroll(function (){
		if($(this).scrollTop() > 300){
			notedPad.addClass('animate');
					// 노트패드와 .st4둘다라는 뜻
			// notedPad.add($('.st4')).addClass('animate');
		}else {
		  notedPad.removeClass('animate');
		}
	});
});

// 노트 라인 등차로 나타내기 컨트롤은 불가 (지금 상태는 브라우저 시작하자마자 효과가 시작된다) = js에서 svc컨틀로 불가
// 그래서 svc에서 컨트롤 하고 싶은것들은 다 html로 옮긴다. css로도 옮기고. svc에 id값도 맞춰주고,css에 .notepads svg추가해서 잡아준다
