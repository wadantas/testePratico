
$(document).ready(function () {
    loadData();
});


function loadData() {
    $.ajax({
        url: "/Home/ListFornecedores",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.ID + '</td>';
                html += '<td>' + item.Nome + '</td>';
                html += '<td>' + item.TipoPessoa + '</td>';
                html += '<td>' + item.CNPJ_CPF + '</td>';
                html += '<td>' + item.RG + '</td>';
                html += '<td>' + item.DataNascimento + '</td>';
                html += '<td>' + item.DataCadastro + '</td>';
                html += '<td>' + item.Telefones + '</td>';
                html += '<td><a href="#" onclick="return getbyID(' + item.ID + ')"><i class="glyphicon glyphicon-pencil"></i> Editar</a> | <a href="#" onclick="Apagar(' + item.ID + ')"><i class="glyphicon glyphicon-trash"></i> Apagar</a></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        ID: $('#ID').val(),
        Nome: $('#Nome').val(),
        CNPJ_CPF: $('#CNPJ').val(),
        RG: $('#RG').val(),
        DataNascimento: $('#DataNascimento').val(),
        Telefones: $('#Telefone').val(),
        TipoPessoa: $('#TipoPessoa').val(),
    };
    $.ajax({
        url: "/Home/AddFornecedor",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function clearTextBox() {
    $('#ID').val("");
    $('#Nome').val("");
    $('#CNPJ').val("");
    $('#RG').val("");
    $('#DataNascimento').val("");
    $('#Telefone').val("");
    $('#TipoPessoa').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#Nome').css('border-color', 'lightgrey');
    $('#CNPJ').css('border-color', 'lightgrey');
    $('#RG').css('border-color', 'lightgrey');
    $('#DataNascimento').css('border-color', 'lightgrey');
    $('#Telefone').css('border-color', 'lightgrey');
    $('#Empresa').css('border-color', 'lightgrey');
}
function validate() {
    var isValid = true;
    if ($('#Nome').val().trim() == "") {
        $('#Nome').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Nome').css('border-color', 'lightgrey');
    }
    if ($('#CNPJ').val().trim() == "") {
        $('#CNPJ').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#CNPJ').css('border-color', 'lightgrey');
    }
    if ($('#TipoPessoa').val() == "") {
        $('#TipoPessoa').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#TipoPessoa').css('border-color', 'lightgrey');
    }
    if ($('#TipoPessoa').val() == "PF" && $('#RG').val() == "")  {
        $('#RG').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#RG').css('border-color', 'lightgrey');
    }
    if ($('#TipoPessoa').val() == "PF" && $('#DataNascimento').val() == "") {
        $('#DataNascimento').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#DataNascimento').css('border-color', 'lightgrey');
    }
    return isValid;
}

function getbyID(FornecID) {
    $('#Nome').css('border-color', 'lightgrey');
    $('#CNPJ').css('border-color', 'lightgrey');
    $('#DataNascimento').css('border-color', 'lightgrey');
    $('#Telefone').css('border-color', 'lightgrey');
    $('#TipoPessoa').css('border-color', 'lightgrey');
    $('#RG').css('border-color', 'lightgrey');
    
    $.ajax({
        url: "/Home/GetFornecedor/" + FornecID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#ID').val(result.ID);
            $('#Nome').val(result.Nome);
            $('#CNPJ').val(result.CNPJ_CPF);
            $('#Telefone').val(result.Telefones);
            $('#RG').val(result.RG);
            $('#TipoPessoa').val(result.TipoPessoa);
            $('#DataNascimento').val(result.DataNascimento);
            $('#modalFornecedor').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}
function Search() {
    var $rows = $('#tableFornecedor tbody tr');

    var val = $.trim($('#search').val()).replace(/ +/g, ' ').toLowerCase();

    $rows.show().filter(function () {
        var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
        return !~text.indexOf(val);
    }).hide();

}

function Apagar(ID) {
    var ans = confirm("Deseja mesmo excluir?");
    if (ans) {
        $.ajax({
            url: "/Home/DeleteFornecedor/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}

function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        ID: $('#ID').val(),
        Nome: $('#Nome').val(),
        CNPJ_CPF: $('#CNPJ').val(),
        RG: $('#RG').val(),
        DataNascimento: $('#DataNascimento').val(),
        Telefones: $('#Telefone').val(),
        TipoPessoa: $('#TipoPessoa').val(),
    };
    $.ajax({
        url: "/Home/AlteraFornecedor",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#modalFornecedor').modal('hide');
            $('#ID').val("");
            $('#Nome').val("");
            $('#CNPJ').val("");
            $('#RG').val("");
            $('#DataNascimento').val("");
            $('#Telefone').val("");
            $('#TipoPessoa').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}