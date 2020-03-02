$(document).ready(function () {
    loadData();
});


function loadData() {
    $.ajax({
        url: "/Home/ListEmpresas",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.ID + '</td>';
                html += '<td>' + item.NomeFantasia + '</td>';
                html += '<td>' + item.CNPJ + '</td>';
                html += '<td>' + item.UF + '</td>';
                html += '<td><a href="#" onclick="return getbyID(' + item.ID + ')"><i class="glyphicon glyphicon-pencil"></i> Editar</a> | <a href="#" onclick="Delete(' + item.ID + ')"> <i class="glyphicon glyphicon-trash"></i> Apagar</a> | <a href="#" onclick="getbyIDFornec(' + item.ID + ')"> <i class="glyphicon glyphicon-user"></i> Insere Fornecedor</a>| <a href="#" onclick="Detalhes(' + item.ID + ')"> <i class="glyphicon glyphicon-th-list"></i> Detalhes</a></td></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
            
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function Search() {
    var $rows = $('#tableEmpresas tbody tr');
 
        var val = $.trim($('#search').val()).replace(/ +/g, ' ').toLowerCase();

        $rows.show().filter(function () {
            var text = $(this).text().replace(/\s+/g, ' ').toLowerCase();
            return !~text.indexOf(val);
        }).hide();
 
}
function CadFornecedor(ID) {
    $('#modalFornec').modal('show');

}

function loadFornecedorEmpresa(EmpID) {
    $.ajax({
        url: "/Home/FornecedorEmpresa/" + EmpID,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.IDFornecedor + '</td>';
                html += '<td>' + item.Nome + '</td>';
                html += '<td>' + item.CNPJ + '</td>';
                html += '<td>' + item.TipoPessoa + '</td>';
                html += '<td>' + item.Telefone + '</td>';
                html += '</tr>';
            });
            $('.Detalhes').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


function AddFornecedor() {
    var res = validateEmpFor($('#Fornecedores').val());
    if (res == false) {
        return false;
    }
    var empFor = {
        IDEmpresa: $('#IdEmpresa').val(),
        IDFornecedor: $('#Fornecedores').val(),
    };
    $.ajax({
        url: "/Home/AddEmpXFor",
        data: JSON.stringify(empFor),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#modalFornec').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Detalhes(EmpID) {
    $('#NomeFantasia').css('border-color', 'lightgrey');
    $('#CNPJ').css('border-color', 'lightgrey');
    $('#UFList').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Home/GetEmpresa/" + EmpID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#IdEmpresa').val(result.ID);
            $('#NomeFantasia').val(result.NomeFantasia);
            $('#CNPJ').val(result.CNPJ);
            $('#UFList').val(result.UF);
            $('#modalEmpresa').modal('hide');
            $('#btnUpdate').hide();
            $('#btnAdd').hide();
            $('#modalFornec').modal('hide');
            loadFornecedorEmpresa(EmpID);
            $('#modalDetalhes').modal('show');
            
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        IdEmpresa: $('#IdEmpresa').val(),
        NomeFantasia: $('#NomeFantasia').val(),
        CNPJ: $('#CNPJ').val(),
        UF: $('#UFList').val(),
    };
    $.ajax({
        url: "/Home/AddEmpresa",
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

function getbyID(EmpID) {
    $('#NomeFantasia').css('border-color', 'lightgrey');
    $('#CNPJ').css('border-color', 'lightgrey');
    $('#UFList').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Home/GetEmpresa/" + EmpID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#IdEmpresa').val(result.ID);
            $('#NomeFantasia').val(result.NomeFantasia);
            $('#CNPJ').val(result.CNPJ);
            $('#UFList').val(result.UF);
            $('#modalEmpresa').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

function getbyIDFornec(EmpID) {
    $('#NomeFantasia').css('border-color', 'lightgrey');
    $('#CNPJ').css('border-color', 'lightgrey');
    $('#UFList').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Home/GetEmpresa/" + EmpID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#IdEmpresa').val(result.ID);
            $('#NomeFantasia').val(result.NomeFantasia);
            $('#CNPJ').val(result.CNPJ);
            $('#UFList').val(result.UF);
            $('#modalEmpresa').modal('hide');
            $('#btnUpdate').hide();
            $('#btnAdd').hide();
            $('#modalFornec').modal('show');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        ID: $('#IdEmpresa').val(),
        NomeFantasia: $('#NomeFantasia').val(),
        CNPJ: $('#CNPJ').val(),
        UF: $('#UFList').val(),
    };
    $.ajax({
        url: "/Home/AlteraEmpresa",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#modalEmpresa').modal('hide');
            $('#IdEmpresa').val("");
            $('#NomeFantasia').val("");
            $('#CNPJ').val("");
            $('#UF').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Delete(ID) {
    var ans = confirm("Deseja mesmo excluir?");
    if (ans) {
        $.ajax({
            url: "/Home/DeleteEmpresa/" + ID,
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

function clearTextBox() {
    $('#IdEmpresa').val("");
    $('#NomeFantasia').val("");
    $('#CNPJ').val("");
    $('#UF').val("");
    $('#Idade').val("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    $('#NomeFantasia').css('border-color', 'lightgrey');
    $('#CNPJ').css('border-color', 'lightgrey');
    $('#UF').css('border-color', 'lightgrey');
    $('#Country').css('border-color', 'lightgrey');
}

function validate() {
    var isValid = true;
    if ($('#NomeFantasia').val().trim() == "") {
        $('#NomeFantasia').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#NomeFantasia').css('border-color', 'lightgrey');
    }
    if ($('#CNPJ').val().trim() == "") {
        $('#CNPJ').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#CNPJ').css('border-color', 'lightgrey');
    }
    if ($('#UFList').val() == "") {
        $('#UFList').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#UFList').css('border-color', 'lightgrey');
    }
    return isValid;
}
function _calculateAge(birthday) { 
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs); 
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}
function getbyIDFornecedor(FornecID) {
    $.ajax({
        url: "/Home/GetFornecedor/" + FornecID,
        typr: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#Idade').val(result.DataNascimento);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        },
        async: false
    });
    return false;
}
function validateEmpFor(IDFor) {
    getbyIDFornecedor(IDFor);
    var isValid = true;
    var idade;
    let data = $('#Idade').val();
    if (data != "") {

        const dataSplit = data.split('/');

        const day = dataSplit[0]; 
        const month = dataSplit[1]; 
        const year = dataSplit[2]; 

        data = new Date(year.substring(0, 4), month - 1, day);


        idade = _calculateAge(data);

        if (idade != "") {
            if ($('#UFList').val() == "SP" && idade < 18) {
                alert("Idade menor que 18");
                isValid = false;
            }
        }
    }
    return isValid;
}