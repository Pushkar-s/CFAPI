console.log("sanity check, JS script is loaded in client browser");

// function for building an HTML string to append later
function buildTodo(todo) {
    var todoHtml = '<div class="todo" id="'+ todo.title +'" ><p>' + todo.description
    + '</p>'
    + '<button class="delete-todo">Delete</button></div>';

    return todoHtml;
}

$(document).ready(function() {
    $('.todo-container').on('submit', function(e) {
        e.preventDefault();
        console.log(e.target); // the form
        var formData = $(e.target).serialize();
        $('#create-todo').trigger("reset");
        $.ajax({
            url: '/profile/todos', 
            type: 'post', 
            data: formData 
        }).done(function(data) {
            console.log(data);
            var todo = buildTodo(data)
            var todododo = '#todo-container'+data.title.replace(/ /g, "");
            var todoremove = '#todo-container'+data.title.replace(/ /g, "") + ' div';
            $(todoremove).remove();
            $(todododo).append(todo);
        }).fail(function(data) {
            console.log("post route failed :", data);
        })
    });

    $('.todo-container').on('click', '.delete-todo', function(e) {
        e.preventDefault();
        var todo = $(this).closest('.todo');
        // grab the id of the todo div
        var id = $(todo).attr('id');

        console.log("delete clicked");

        $.ajax({
            url: '/profile/todos/' + id, 
            type: 'delete'
        }).done(function(data) {
            console.log("now removing html");
            $(todo).remove();
            console.log(data);
        })
        .fail(function(data) {
            console.log("error: ", data);
        })
    })

    
});
