
$(document).ready(function () {
    localStorage.setItem('type','');
    localStorage.setItem('id','');
    
});


$(window).on("load", function () {
    $(".se-pre-con").fadeOut("slow");
});

function isEmpty(str) {
    return (!str || 0 === str.length);
}

const serviceLink = "Ta2seetService.asmx";


$('#adminButton').click(function () { openLoginContent(0) });
$('#userButton').click(function () { openLoginContent(1) });

function openLoginContent(userIndex)
{
    var html = "";

    if(userIndex == 0) {
        html += "<div class=\"card card-outline-secondary my-4\" style=\"text-align: center\">";
        html += "<div class=\"card-header\">";
        html += "تسجيل الدخول";
        html += "</div>";
        html += "<div class=\"card-body\">";
        html += "<form class='loginForm'>";
        html += "<div class=\"form-group\" style=\"text-align: right\">";
        html += "<label for=\"InputEmail1\">اسم الأدمن :</label>";
        html += "<input name='username' class=\"form-control\" id=\"InputAdminEmail\" aria-describedby=\"emailHelp\" placeholder=\"ادخل اسم الأدمن\" required>";
        html += "</div>";
        html += "<div class=\"form-group\" style=\"text-align: right\">";
        html += "<label for=\"InputPassword1\">كلمة المرور :</label>";
        html += "<input name='password' type=\"password\" class=\"form-control\" id=\"InputAdminPassword\" placeholder=\"ادخل كلمة المرور\" required >";
        html += "</div>";
        html += "<button id='submitAdminLogin' type=\"button\" onclick='loginAdmin()' class=\"btn btn-primary\">الدخول للوحة الأدمن</button>";
        html += "</form>";
        html += "</div>";
        html += "</div>";

        html += "<script>";
        html += "$('input').on('keyup', function (e) {";
        html += "console.log(e);";
        html += "if(e.keyCode == 13)";
        html += "{";
        html += "loginAdmin();";
        html += "}";
        html += "});";
        html += " </script>";

        html += "<!-- /.card -->";

        $("#adminButton").addClass('active');
        $("#userButton").removeClass('active');
    }
    else if (userIndex == 1) {
        html += "<div class=\"card card-outline-secondary my-4\" style=\"text-align: center\">";
        html += "<div class=\"card-header\">";
        html += "تسجيل الدخول";
        html += "</div>";
        html += "<div class=\"card-body\">";
        html += "<form class='loginForm'>";
        html += "<div class=\"form-group\" style=\"text-align: right\">";
        html += "<label for=\"InputEmail1\">اسم المستخدم :</label>";
        html += "<input name='username' class=\"form-control\" id=\"InputUserEmail\" aria-describedby=\"emailHelp\" placeholder=\"ادخل اسم المستخدم\" required>";
        html += "</div>";
        html += "<div class=\"form-group\" style=\"text-align: right\">";
        html += "<label for=\"InputPassword1\">كلمة المرور :</label>";
        html += "<input name='password' type=\"password\" class=\"form-control\" id=\"InputUserPassword\" placeholder=\"ادخل كلمة المرور\" required>";
        html += "</div>";
        html += "<button id='submitUserLogin' type=\"button\" onclick='loginUser()' class=\"btn btn-primary\">عرض البيانات</button>";
        html += "</form>";
        html += "</div>";
        html += "</div>";

        html += "<script>";
        html += "$('input').on('keyup', function (e) {";
        html += "console.log(e);";
        html += "if(e.keyCode == 13)";
        html += "{";
        html += "loginUser();";
        html += "}";
        html += "});";
        html += " </script>";

        html += "<!-- /.card -->";

        $("#userButton").addClass('active');
        $("#adminButton").removeClass('active');
    }

    $('#mainContent').html("");
    $('#mainContent').html(html);

}

function loginUser()
{
    if( isEmpty($('#InputUserEmail').val()) || isEmpty($('#InputUserPassword').val()))
    {
        alert("قم بملء جميع البيانات");
    }
    else {

        var userNameText = document.getElementById('InputUserEmail').value;
        var passwordText = document.getElementById('InputUserPassword').value;

        var jsonData = "{ \'username\' : \'" + userNameText + "\', \'password\' : \'" + passwordText + "\' }";

        $.ajax({
            type: "POST",
            url: serviceLink + "/verifyUserLogin",
            async: false,
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({ jsonData: jsonData }),

            success: function (data) {
                //Got to users page and store data in local storage
                if(data.d === "wrong customer ID")
                {
                    alert("خطأ فى اسم المستخدم");
                }
                else if (data.d === "wrong password")
                {
                    alert("خطأ فى كلمة المرور");
                }
                else if (data.d === "databaseError")
                {
                    alert("خطأ فى قاعدة بيانات الموقع");
                }
                else
                {

                    //add the counter of logged people
                    $.ajax({
                        type: "POST",
                        url: serviceLink + "/addLoginCounter",
                        async: false,
                        dataType: "json",
                        contentType: "application/json",

                        success: function (data2) {

                        },
                        error: function (er) {
                            alert('error:' + JSON.stringify(er));
                        }
                    });

                    localStorage.setItem("type", "user");
                    localStorage.setItem('id', data.d);

                    location.replace("user.html");
                    
                }
            },
            error: function (er) {
                alert('error:' + JSON.stringify(er));
            }
        });
    }
}

function loginAdmin()
{

    if($('#InputAdminEmail').val() == "" || $('#InputAdminPassword').val() == "")
    {
        alert("قم بملء جميع البيانات");
    }
    else
    {
        var userNameText = document.getElementById('InputAdminEmail').value;
        var passwordText = document.getElementById('InputAdminPassword').value;

        var jsonData = "{ \'username\' : \'" + userNameText + "\', \'password\' : \'" + passwordText + "\' }";
        $.ajax({
            type: "POST",
            url: serviceLink + "/verifyAdminLogin",
            async: true,
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({jsonData: jsonData}),

            success: function (data) {
                //Got to users page and store data in local storage
                if(data.d === "wrong username")
                {
                    alert("خطأ فى اسم المستخدم");
                }
                else if(data.d === "wrong password")
                {
                    alert("خطأ فى كلمة المرور");
                }
                else if(data.d === "databaseError")
                {
                    alert("خطأ فى قاعدة بيانات الموقع");
                }
                else
                {
                    localStorage.setItem("id", data.d);
                    localStorage.setItem("type", "admin");

                    location.replace("adminPanel.html");
                }
            },
            error: function (er) {
                console.log(er);
                alert('error: \n' + er);
            }
        });
    }

}
