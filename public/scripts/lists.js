
console.log("sanity check, JS script is loaded in client browser");


$(document).ready(function() {

    $('td').on('click', '.no', function(e) {
        e.preventDefault();
        // alert('hi'); 
        var no = $(this).closest('.no'); // returns object use jQuery.type( no )
        var id = $(no).attr('id'); // returns string
        // alert(id);
        // var inhtm = $('#'+id).html();
        // alert(inhtm);
        var $hmlclose = $('<i class="fa fa-window-close" aria-hidden="true"></i>');    
        var strclose = $hmlclose.prop('outerHTML');
        var $hmlcheck = $('<i class="fa fa-check-square" aria-hidden="true"></i>');
        var strcheck = $hmlcheck.prop('outerHTML');
        // alert(str);
        if ($('#'+id).html() == strclose) {
            var utg = $(this).closest('.utg'); // object
            var utgid = $(utg).attr('id'); // string
            // alert(utgid);
            var formData = {tag : utgid, problemid: id.substr(utgid.length,id.length) }
            // alert(formData.tag);
            // alert(formData.problemid);
            $.ajax({
                url: '/profile/problemtags', 
                type: 'post', 
                data: formData 
            }).done(function(data) {
                console.log(data);
                $('#'+id).html(strcheck);
            }).fail(function(data) {
                console.log("post route failed :", data);
            })
        }else {
            var utg = $(this).closest('.utg'); // object
            var utgid = $(utg).attr('id'); // string
            // alert(utgid);
            var formData = {tag : utgid, problemid: id.substr(utgid.length,id.length) }
            // alert(formData.tag);
            // alert(formData.problemid);
            $.ajax({
                url: '/profile/problemtags', 
                type: 'delete', 
                data: formData 
            }).done(function(data) {
                console.log(data);
                $('#'+id).html(strclose);
            }).fail(function(data) {
                console.log("post route failed :", data);
            })
        }          
    })

    
});