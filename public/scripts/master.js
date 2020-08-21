// alert("connected");
$(function () {
    $(document).scroll(function () {
        var $nav = $("#mainnavbar");
        $nav.toggleClass("secondary",$(this).scrollTop() < $nav.height());
    });
});



