// alert("connected");
$(function () {
    $(document).scroll(function () {
        var $nav = $("#mainnavbar");
        $nav.toggleClass("secondary",$(this).scrollTop() < $nav.height());
    });
});

// $(function(){
//     $(document.navbar).hover(function(){
//         var $main = $("#main");
//         $main.
//     });
// });



