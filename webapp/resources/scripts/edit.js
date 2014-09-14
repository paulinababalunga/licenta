$(function(){

    var toolItem =
        "<a class='button' data-target-id='details-edit'>\
            <span id='edit'></span>\
        </a>";

    var content =
        "<div id='details-edit' class='menu-content'>\
            <h1>Editare</h1>\
            <input type='button' class='btnSignUp' id='btnEdit' value='Editeaza'>\
        </div>";

    $("#toolbar").append($(toolItem));
    $("#details").append($(content));

    console.log("editing initialized");
});