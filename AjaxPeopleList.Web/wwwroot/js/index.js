$(() => {
    const modal = new bootstrap.Modal($('.modal')[0]);

    //const saveNew = true;

    function refreshTable() {
        $("tbody").empty();
        $.get('/home/getpeople', function (people) {
            people.forEach(function (person) {
                $("tbody").append(`<tr>
            <td>${person.firstName}</td>
            <td>${person.lastName}</td>
            <td>${person.age}</td>
            <td><button class="btn btn-warning edit-person" id="${person.id}">Edit</button></td>
            <td><button class="btn btn-danger delete-person" id="${person.id}">Delete</button></td>
</tr>`)
            });
        });
    }

    refreshTable();

    $("#add-person").on('click', function () {
        $("#firstName").val('');
        $("#lastName").val('');
        $("#age").val('');
        modal.show();
        saveNew = true;
    });

    $("#save-person").on('click', function () {
        const firstName = $("#firstName").val();
        const lastName = $("#lastName").val();
        const age = $("#age").val();
        const id = $("#id").val();
        if (saveNew) {
            $.post('/home/addperson', { firstName, lastName, age }, function () {
                modal.hide();
                refreshTable();
            });
        }
        else {
            $.post('/home/updateperson', { firstName, lastName, age, id }, function () {
                modal.hide();
                refreshTable();
            });
        }

    });
    $("tbody").on('click', '.edit-person', function () {
        const id = $(this).attr('id');
        saveNew = false;
        $.get('/home/getpersontoedit', { id }, function (person) {
            $("#firstName").val(person.firstName);
            $("#lastName").val(person.lastName);
            $("#age").val(person.age);
            $("#id").val(person.id);
            modal.show();
        });
        
        
    });
    $("tbody").on('click', '.delete-person', function () {
        const id = $(this).attr('id');
        $.post('/home/deleteperson', { id }, function () {
            refreshTable();
        });
    });
});