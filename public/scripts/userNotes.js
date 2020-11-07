    


// function for building an HTML string to append later
function buildCardNote(note) {
    var noteHtml = 
    '<div class="notesCard ">' +
            '<div class="notesCard-content notesCard-tall notesCard-wide" >' +
                '<a href="#">' +
                    '<h3>' + note.title + '</h3>' +
                '</a>'+
                '<p> ' + note.shortdescription.split(";").join("<br />") + '</p>' +
    
                '<button class="edit-button" >'+
                    'Edit Note'+
                '</button>'+
                '<button class="delete-button" >'+
                    'Delete Note'+
                '</button>'+
    
            '</div>'+
    '</div>';
    // +'<div id="' + note._id + '" class="notesModal" style="text-align: center;">'
    // +    '<div class="notesModal-content">'
    // +        '<span class="notesClose" id="close1">&times;</span>'
    // +        '<p>Enter short notes on top of notesCard</p>'
    // +        '<textarea class="short-note" rows="3"></textarea>'
    // +        '<p> Enter long notes:</p>'
    // +        '<textarea class="long-note" rows="30"></textarea>'
    // +        '<br>'
    // +        '<button class="note-button"> Save </button>'
    // +    '</div>'
    // +'</div>'     

    return noteHtml;
}

$(document).ready(function() {

    $('.notesModal').on('submit', function(e) {
        e.preventDefault();
        console.log(e.target); // the form
        var formData = $(e.target).serialize();
        // alert(formData.title);
        $.ajax({
            url: '/userNotes/editNote', 
            type: 'post', 
            data: formData
        }).done(function(data) {
            // console.log(data);
            // var ntmodel = $(this).closest('.notesModal');
            // var id = $(ntmodel).attr('id');
            // id = id.substr(7,id.length); 
            // alert(e.target.title.textContent);
            // alert(e.target.modid.textContent);
            var id = e.target.modid.textContent;
            $('#'+id+' h3').text(e.target.title.textContent + '[Updated]');
        }).fail(function(data) {
            console.log("post route failed :", data);
        })
    })


    $('.add-note').on('submit', function(e) {
        e.preventDefault();
        console.log(e.target); // the form
        var formData = $(e.target).serialize();
        $.ajax({
            url: '/userNotes/addNote', 
            type: 'post', 
            data: formData 
        }).done(function(data) {
            console.log(data);
            var note = buildCardNote(data)
            var todododo = '.notesGrid';
            $(todododo).append(note);
        }).fail(function(data) {
            console.log("post route failed :", data);
        })
    });

    $('.notesCard').on('click', '.delete-button', function(e) {
        e.preventDefault();
        var ntcard = $(this).closest('.notesCard');
        var id = $(ntcard).attr('id');

        console.log("delete clicked");

        $.ajax({
            url: '/userNotes/deleteNote/' + id, 
            type: 'delete'
        }).done(function(data) {
            console.log("now removing html");
            $(ntcard).remove();
            console.log(data);
        })
        .fail(function(data) {
            console.log("error: ", data);
        })
    })

    $('.notesCard').on('click', '.edit-button', function(e) {
        e.preventDefault();
        var ntcard = $(this).closest('.notesCard');
        var id = $(ntcard).attr('id');

         // Get the modal
        var modal = document.getElementById('modalid' + id);
        modal.style.display = "block";
        var span = document.getElementById('close' + id);
        span.onclick = function() {
            modal.style.display = "none";
        }
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

    })

    
});
