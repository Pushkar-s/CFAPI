/*always put scrpt tag at the bottom of body*/
var x = document.getElementsByTagName("nav");
x[0].onmouseover = function() {var y = document.getElementsByTagName("main"); y[0].className = "main-class";}
x[0].onmouseout = function() {var y = document.getElementsByTagName("main"); y[0].className = "main";}


$(document).ready(function() {
    $('.show-userlists').on('click', function(e) {
        // alert('clicked');
        var cardContent   = $(this).closest('.card-content');
        var cardContentID = $(cardContent).attr('id');
        // alert(cardContentID);
        $('#' + cardContentID).css("display","none");
        $('#' + 'back' + cardContentID.substr(5,cardContentID.length)).css("display","block");
    })
    $('.modal-footer').on('click', function(e) {
        // alert('clicked');
        var cardContent   = $(this).closest('.card-content');
        var cardContentID = $(cardContent).attr('id');
        // alert(cardContentID);
        $('#' + cardContentID).css("display","none");
        $('#' + 'front' + cardContentID.substr(4,cardContentID.length)).css("display","block");
    })
});