    


// function for building an HTML string to append later
function buildCardNote(note) {
    var noteHtml = 
    '<div class="notesCard" ' + 'id="'+ note.forId +'">' + 
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
    '</div>'+
    '<div class="notesModal" id="modalid' + note.forId + '"  style="text-align: center;">' + 
            '<div class="notesModal-content">' + 
                '<form action="/donotexstroute" id="edit-note' + note.forId + '">' +  
                    '<span class="notesClose" id="close'+ note.forId + '">&times;</span>' + 
                    '<textarea name="title" rows="1">'+ note.title + '</textarea>'+
                    '<textarea name="modid" rows="1" style="display: none;">' + note.forId +'</textarea>'+
                    '<br>'+
                    '<p>Enter short notes on top of notesCard</p>'+
                    '<textarea name="shortdescription" class="short-note" rows="3">' + note.shortdescription+ '</textarea>'+
                    '<p> Enter long notes:</p>'+
                    '<textarea name="longdescription" class="long-note" rows="30">'+ note.longdescription + '</textarea>'+
                    '<br>'+
                    '<!-- <input type="submit" value="Save Note"> -->'+
                    '<button class="saveNote-button">Save</button>'+
                '</form>'+
            '</div>'+
        '</div>' ;
       

    return noteHtml;
}








$(document).ready(function() {

    $(document).on('submit', function(e) {
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
            console.log("returned data from submit edit")
            console.log(data);
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
            console.log("data returned" + typeof data);
            console.log(data);
            var note = buildCardNote(data)
            var todododo = '.notesGrid';
            $(todododo).append(note);
        }).fail(function(data) {
            console.log("post route failed :", data);
        })
    });

    $(document).on('click', '.delete-button', function(e) {
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

    $(document).on('click', '.edit-button', function(e) {
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
