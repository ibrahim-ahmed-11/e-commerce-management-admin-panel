
$(document).ready(function ()
{
    var type = localStorage.getItem('type');
    var id = localStorage.getItem('id');

    if( type === "admin" && !isEmpty(id))
    {
        $('#loggedAsButtonViewer').html('مسجل كأدمن');
    }
    else
    {
        alert("قم بتسجيل الدخول أولاً");
        location.replace('index.html');
    }

});


$(window).on("load", function () {
    $(".se-pre-con").fadeOut("slow");
});


$('#addAdmin').click(function () {  openAddAdmin()  });
$('#addCustomer').click(function () { openAddCustomer()  });
$('#viewAdmins').click(function () { getAllAdminsData()  });
$('#searchCustomer').click(function () { openSearchCustomer()  });
$('#addNewSale').click(function () { openAddNewSale()  });
$('#viewLoans').click(function () { getAllCustomersNames()  });
$('#viewInquiry').click(function () { openViewInquiry()  });
$('#viewMonthRate').click(function () { openViewMonthRate()  });
$('#viewMoneyHead').click(function () { openViewMoneyHead()  });
$('#latencyNotes').click(function () { getAllLateCustomersNames()  });



function setActiveTab(tabID)
{
    var tabsArray = ["latencyNotes", "addAdmin", "addCustomer", "viewAdmins", "searchCustomer", "addNewSale", "viewLoans", "viewInquiry", "viewMonthRate", "viewMoneyHead"];

    for (var i = 0; i < tabsArray.length; i++) {

        if (tabsArray[i] === tabID)
            $("#" + tabsArray[i]).addClass('active');
        else
            $("#" + tabsArray[i]).removeClass('active');
    }
}



function openAddAdmin() //3aaaaaaaaaaaaaaa4
{
    var html = "";
    html += "<div class=\"card card-outline-secondary my-4\" style=\"text-align: center\">";
    html += "<div class=\"card-header\">";
    html += "<b>إضافة أدمن</b>";
    html += "</div>";
    html += "<div class=\"card-body\">";
    html += "<form id='addAdminForm'>";
    html += "<div class=\"form-group\" style=\"text-align: right\">";
    html += "<label for=\"InputName\">اسم الأدمن :</label>";
    html += "<input type=\"email\" class=\"form-control\" id=\"InputNewAdminName\" aria-describedby=\"emailHelp\" placeholder=\"ادخل اسم الأدمن\">";
    html += "</div>";
    html += "<div class=\"form-group\" style=\"text-align: right\">";
    html += "<label for=\"InputUserName\">اسم المستخدم :</label>";
    html += "<input type=\"email\" class=\"form-control\" id=\"InputNewAdminUserName\" aria-describedby=\"emailHelp\" placeholder=\"ادخل اسم المستخدم\">";
    html += "</div>";
    html += "<div class=\"form-group\" style=\"text-align: right\">";
    html += "<label for=\"InputPassword1\">كلمة المرور :</label>";
    html += "<input type=\"password\" class=\"form-control\" id=\"InputNewAdminPassword\" placeholder=\"ادخل كلمة المرور\">";
    html += "</div>";
    html += "<button type=\"button\" onclick='addNewAdmin();' class=\"btn btn-primary\"> إضافة أدمن جديد</button>";
    html += "</form>";
    html += "</div>";
    html += "</div>";

    html += "<script>";
    html += "$('input').on('keyup', function (e) {";
    html += "console.log(e);";
    html += "if(e.keyCode == 13)";
    html += "{";
    html += "addNewAdmin();";
    html += "}";
    html += "});";
    html += " </script>";

    $('#mainContent').html("");
    $('#mainContent').html(html);

    setActiveTab("addAdmin");

} //done

function openAddCustomer() //3aaaaaaaaaaaaaaa4
{
    $("footer").css("position", "fixed");

    var html = "";

    html += "<div class=\"card card-outline-secondary my-4\" style=\"text-align: center\">";
    html += "<div class=\"card-header\">";
    html += "<b> إضافة عميل</b>";
    html += "</div>";
    html += "<div class=\"card-body\">";
    html += "<form>";
    html += "<div class=\"form-group\" style=\"text-align: right\">";
    html += "<label for=\"InputName\">اسم العميل :</label>";
    html += "<input type=\"text\" class=\"form-control\" id=\"InputNewCustomerName\" placeholder=\"ادخل اسم العميل\">";
    html += "</div>";
    html += "<div class=\"form-group\" style=\"text-align: right\">";
    html += "<label for=\"InputID\">رقم بطاقة العميل :</label>";
    html += "<input type=\"number\" class=\"form-control\" id=\"InputNewCustomerID\" placeholder=\"ادخل رقم بطاقة العميل\">";
    html += "</div>";
    html += "<div class=\"form-group\" style=\"text-align: right\">";
    html += "<label for=\"InputAddress\">عنوان العميل :</label>";
    html += "<input type=\"text\" class=\"form-control\" id=\"InputNewCustomerAddress\" placeholder=\"ادخل عنوان العميل \">";
    html += "</div>";
    html += "<div class=\"form-group col-lg-6\" style=\"text-align: right; float: right\">";
    html += "<label for=\"InputPhone1\">رقم هاتف العميل 1 :</label>";
    html += "<input type=\"number\" class=\"form-control\" id=\"InputNewCustomerPhone1\" placeholder=\"ادخل رقم هاتف العميل الاول\">";
    html += "</div>";
    html += "<div class=\"form-group col-lg-6\" style=\"text-align: right; float: left\">";
    html += "<label for=\"InputPhone2\">رقم هاتف العميل 2 :</label>";
    html += "<input type=\"number\" class=\"form-control\" id=\"InputNewCustomerPhone2\" placeholder=\"ادخل رقم هاتف العميل الثانى\">";
    html += "</div>";
    html += "<div class=\"form-group\" style=\"text-align: right\">";
    html += "<label for=\"InputLandLine\">رقم هاتف البيت :</label>";
    html += "<input type=\"number\" class=\"form-control\" id=\"InputNewCustomerLandLine\" placeholder=\"ادخل رقم هاتف البيت\">";
    html += "</div>";


    html += "</form>";
    html += "</div>";
    html += "</div>";


    html += "<div class=\"custCard card card-outline-secondary col-lg-6 col-md-12 mb-4\" style=\"text-align: center; float: right\">";
    html += "<div class=\"card-header\">";
    html += " بيانات الضامن الأول";
    html += "</div>";
    html += "<div class=\"card-body\">";
    html += "<form>";


    html += "<div class=\"form-group\" style=\"text-align: right\">";
    html += "<label for=\"InputG1\">اسم ضامن العميل رقم 1 :</label>";
    html += "<input type=\"text\" class=\"form-control\" id=\"InputNewCustomerG1\" placeholder=\"ادخل اسم ضامن العميل رقم 1\">";
    html += "</div>";
    html += "<div class=\"form-group\" style=\"text-align: right\">";
    html += "<label for=\"InputGID1\">رقم بطاقة ضامن العميل رقم 1 :</label>";
    html += "<input type=\"text\" class=\"form-control\" id=\"InputNewCustomerGID1\" placeholder=\"ادخل رقم بطاقة ضامن العميل رقم 1\">";
    html += "</div>";
    html += "<div class=\"form-group\" style=\"text-align: right\">";
    html += "<label for=\"InputGAd1\">عنوان ضامن العميل رقم 1 :</label>";
    html += "<input type=\"text\" class=\"form-control\" id=\"InputNewCustomerGAd1\" placeholder=\"ادخل عنوان ضامن العميل رقم 1\">";
    html += "</div>";
    html += "<div class=\"form-group\" style=\"text-align: right\">";
    html += "<label for=\"InputGPh1\">رقم تليفون ضامن العميل رقم 1 :</label>";
    html += "<input type=\"number\" class=\"form-control\" id=\"InputNewCustomerGPh1\"] placeholder=\"ادخل رقم تليفون ضامن العميل رقم 1\">";
    html += "</div>";


    html += "</form>";
    html += "</div>";
    html += "</div>";


    html += "<div class=\"custCard card card-outline-secondary col-lg-6 col-md-12 mb-4\" style=\"text-align: center\">";
    html += "<div class=\"card-header\">";
    html += " بيانات الضامن الثانى";
    html += "</div>";
    html += "<div class=\"card-body\">";
    html += "<form>";



    html += "<div class=\"form-group\" style=\"text-align: right\">";
    html += "<label for=\"InputG2\">اسم ضامن العميل رقم 2 :</label>";
    html += "<input type=\"text\" class=\"form-control\" id=\"InputNewCustomerG2\" placeholder=\"ادخل اسم ضامن العميل رقم 2\">";
    html += "</div>";
    html += "<div class=\"form-group\" style=\"text-align: right\">";
    html += "<label for=\"InputGID2\">رقم بطاقة ضامن العميل رقم 2 :</label>";
    html += "<input type=\"text\" class=\"form-control\" id=\"InputNewCustomerGID2\" placeholder=\"ادخل رقم بطاقة ضامن العميل رقم 2\">";
    html += "</div>";
    html += "<div class=\"form-group\" style=\"text-align: right\">";
    html += "<label for=\"InputGAd2\">عنوان ضامن العميل رقم 2 :</label>";
    html += "<input type=\"text\" class=\"form-control\" id=\"InputNewCustomerGAd2\" placeholder=\"ادخل عنوان ضامن العميل رقم 2\">";
    html += "</div>";
    html += "<div class=\"form-group\" style=\"text-align: right\">";
    html += "<label for=\"InputGPh2\">رقم تليفون ضامن العميل رقم 2 :</label>";
    html += "<input type=\"text\" class=\"form-control\" id=\"InputNewCustomerGPh2\" placeholder=\"ادخل رقم تليفون ضامن العميل رقم 2\">";
    html += "</div>";

    html += "</form>";

    html += "</div>";
    html += "</div>";

    html += "<div class='container' style='text-align: center;'>";
    html += "<button type=\"button\" style='margin-bottom: 30px' onclick='addNewCustomer()' class=\"btn btn-primary\"> إضافة عميل جديد</button>";
    html += "</div>";

    html += "<script>";
    html += "$('input').on('keyup', function (e) {";
    html += "console.log(e);";
    html += "if(e.keyCode == 13)";
    html += "{";
    html += "addNewCustomer();";
    html += "}";
    html += "});";
    html += " </script>";


    html += "<div style=\"width:100%;text-align:center; margin-bottom: 20px; margin-top: 20px\">";
    html += "<h3 style=\"color:green; margin-bottom: 30px;\" id='insertedBox'></h3>";
    html += "</div>";


    $('#mainContent').html("");
    $('#mainContent').html(html);

    getAllCustomersData();

    setActiveTab("addCustomer");

} //done

function openCustomers(jsonCustomersData) //3aaaaaaaaaaaaaaa4
{

    if (jsonCustomersData === "customers unavailable")
    {
        alert("لا يوجد عملاء مسجلين فى الموقع");
    }
    else
    {
        var customersData = JSON.parse(jsonCustomersData);

        var html = "";

        html += "<div style=\"width:100%;text-align:center; margin-bottom: 20px; margin-top: 20px\">";
        html += "<h3>بيانات العملاء</h3>";
        html += "</div>";

        html += "<div class=\"container view-customers-container\">";
        html += "<table class=\"table table-hover view-customers-table\">";
        html += "<thead>";
        html += "<tr style='text-align: center'>";
        html += "<th scope=\"col\">الكود</th>";
        html += "<th scope=\"col\">الاسم</th>";
        html += "<th scope=\"col\">التليفون</th>";
        html += "<th scope=\"col\">العنوان</th>";
        html += "<th scope=\"col\">تفاصيل</th>";
        html += "<th scope=\"col\">تعديل</th>";
        html += "<th scope=\"col\">حذف</th>";
        html += "</tr>";
        html += "</thead>";
        html += "<tbody>";

        /*Search results here */

        for (var i = 0; i < customersData.length; i++)
        {
            html += "<tr style='text-align: center'>";
            html += "<th scope=\"row\">"+ customersData[i].key +"</th>";
            html += "<td>"+ customersData[i].name +"</td>";
            html += "<td>"+ customersData[i].phone1 +"</td>";
            html += "<td>"+ customersData[i].address +"</td>";
            html += "<td> <button type=\"button\" class=\"btn btn-info\" style=\'color: white;\' onclick=\"getOneCustomerData("+ customersData[i].key +",'1')\">عرض التفاصيل</button> </td>";
            html += "<td> <button type=\"button\" class=\"btn btn-secondary\" style=\'color: white;\' onclick=\"getOneCustomerData("+ customersData[i].key +", '2')\">تعديل</button> </td>";
            html += "<td> <button type=\"button\" class=\"btn btn-danger\" onclick='deleteCustomer("+ customersData[i].key +", '1')' style='color: white;'>حذف</button> </td>";
            html += "</tr>";
        }


        html += "</tbody>";
        html += "</table>";
        html += "</div>";

        $('#mainContent').append(html);
    }

} //done

function showCustomerModal(data) //3aaaaaaaaaaaaaaa4
{

    var jsonCustomer = JSON.parse(data);

    var html = "";

    html += "<table style=\"text-align: center; \" class=\"table\" id=\"customerViewTableModal\">";

    html += "<tbody style=\"text-align: center\">";

    html += "<tr>";
    html += "<th style=\"width:30%\">كود العميل</th>";
    html += "<td style=\"width:70%\">"+ jsonCustomer.key +"</td>";
    html += "</tr>";

    html += "<tr>";
    html += "<th style=\"width:30%\">اسم العميل</th>";
    html += "<td style=\"width:70%\">"+ jsonCustomer.name +"</td>";
    html += "</tr>";

    html += "<tr>";
    html += "<th style=\"width:30%\">الرقم القومى</th>";
    html += "<td style=\"width:70%\">"+ jsonCustomer.id_num +"</td>";
    html += "</tr>";

    html += "<tr>";
    html += "<th style=\"width:30%\">العنوان</th>";
    html += "<td style=\"width:70%\">"+ jsonCustomer.address +"</td>";
    html += "</tr>";

    html += "<tr>";
    html += "<th style=\"width:30%\">رقم التليفون الاول</th>";
    html += "<td style=\"width:70%\">"+ jsonCustomer.phone1 +"</td>";
    html += "</tr>";

    html += "<tr>";
    html += "<th style=\"width:30%\">رقم التليفون الثانى</th>";
    html += "<td style=\"width:70%\">"+ jsonCustomer.phone2 +"</td>";
    html += "</tr>";

    html += "<tr>";
    html += "<th style=\"width:30%\">رقم هاتف البيت</th>";
    html += "<td style=\"width:70%\">"+ jsonCustomer.landLine +"</td>";
    html += "</tr>";

    html += "<tr>";
    html += "<th style=\"width:30%\">كلمة المرور</th>";
    html += "<td style=\"width:70%\">"+ jsonCustomer.password +"</td>";
    html += "</tr>";

    html += "<tr>";
    html += "<th style=\"width:30%\">اسم الضامن الاول</th>";
    html += "<td style=\"width:70%\">"+ jsonCustomer.guarantee1 +"</td>";
    html += "</tr>";

    html += "<tr>";
    html += "<th style=\"width:30%\">رقم تليفون الضامن الاول</th>";
    html += "<td style=\"width:70%\">"+ jsonCustomer.g_phone_1 +"</td>";
    html += "</tr>";

    html += "<tr>";
    html += "<th style=\"width:30%\">الرقم القومى للضامن الاول</th>";
    html += "<td style=\"width:70%\">"+ jsonCustomer.g_id_1 +"</td>";
    html += "</tr>";

    html += "<tr>";
    html += "<th style=\"width:30%\">عنوان الضامن الاول</th>";
    html += "<td style=\"width:70%\">"+ jsonCustomer.g_address_1 +"</td>";
    html += "</tr>";

    html += "<tr>";
    html += "<th style=\"width:30%\">اسم الضامن الثانى</th>";
    html += "<td style=\"width:70%\">"+ jsonCustomer.guarantee2 +"</td>";
    html += "</tr>";

    html += "<tr>";
    html += "<th style=\"width:30%\">رقم تليفون الضامن الثانى</th>";
    html += "<td style=\"width:70%\">"+ jsonCustomer.g_phone_2 +"</td>";
    html += "</tr>";

    html += "<tr>";
    html += "<th style=\"width:30%\">الرقم القومى للضامن الثانى</th>";
    html += "<td style=\"width:70%\">"+ jsonCustomer.g_id_2 +"</td>";
    html += "</tr>";

    html += "<tr>";
    html += "<th style=\"width:30%\">عنوان الضامن الثانى</th>";
    html += "<td style=\"width:70%\">"+ jsonCustomer.g_address_2 +"</td>";
    html += "</tr>";

    html += "</tbody>";

    html += "</table>";

    $('#customer-modal-body').html('');
    $('#customer-modal-body').html(html);

    $('#customerEditModalFooter').html('');

    $('#customerModal').modal('show');

} //done

function showCustomerEditModal(data) //3aaaaaaaaaaaaaaa4
{
    var customerData = JSON.parse(data);

    var html = "";

    html += "<table style=\"text-align: center; \" class=\"table\" id=\"customerViewTable\">";
    html += "<tbody style=\"text-align: center\">";

    html += "<tr>";
    html += "<th style=\"width:30%\">كود العميل</th>";
    html += "<td style=\"width:70%\"><input type=\"text\" class=\"form-control\" id=\"txtModalCustomerEditKey\" value = \"" + customerData.key +"\" readonly></td>";
    html += "</tr>";

    html += "<tr>";
    html += "<th style=\"width:30%\">اسم العميل</th>";
    html += "<td style=\"width:70%\"><input type=\"text\" class=\"form-control\" id=\"txtModalCustomerEditName\" value = \"" + customerData.name +"\"></td>";
    html += "</tr>";

    html += "<tr>";
    html += "<th style=\"width:30%\">الرقم القومى</th>";
    html += "<td style=\"width:70%\"><input type=\"text\" class=\"form-control\" id=\"txtModalCustomerEditID\" value = \"" + customerData.id_num +"\"></td>";
    html += "</tr>";

    html += "<tr>";
    html += "<th style=\"width:30%\">العنوان</th>";
    html += "<td style=\"width:70%\"><input type=\"text\" class=\"form-control\" id=\"txtModalCustomerEditAddress\" value = \""+ customerData.address +"\"></td>";
    html += "</tr>";

    html += "<tr>";
    html += "<th style=\"width:30%\">رقم التليفون الاول</th>";
    html += "<td style=\"width:70%\"><input type=\"text\" class=\"form-control\" id=\"txtModalCustomerEditPhone1\" value = \""+ customerData.phone1 +"\"></td>";
    html += "</tr>";

    html += "<tr>";
    html += "<th style=\"width:30%\">رقم التليفون الثانى</th>";
    html += "<td style=\"width:70%\"><input type=\"text\" class=\"form-control\" id=\"txtModalCustomerEditPhone2\" value = \""+ customerData.phone2 +"\"></td>";
    html += "</tr>";

    html += "<tr>";
    html += "<th style=\"width:30%\">رقم هاتف البيت</th>";
    html += "<td style=\"width:70%\"><input type=\"text\" class=\"form-control\" id=\"txtModalCustomerEditLandLine\" value = \""+ customerData.landLine +"\"></td>";
    html += "</tr>";

    html += "<tr>";
    html += "<th style=\"width:30%\">كلمة المرور</th>";
    html += "<td style=\"width:70%\"><input type=\"text\" class=\"form-control\" id=\"txtModalCustomerEditPassword\" value = \""+ customerData.password +"\"></td>";
    html += "</tr>";

    html += "<tr>";
    html += "<th style=\"width:30%\">اسم الضامن الاول</th>";
    html += "<td style=\"width:70%\"><input type=\"text\" class=\"form-control\" id=\"txtModalCustomerEditGName1\" value = \""+ customerData.guarantee1 +"\"></td>";
    html += "</tr>";

    html += "<tr>";
    html += "<th style=\"width:30%\">رقم تليفون الضامن الاول</th>";
    html += "<td style=\"width:70%\"><input type=\"text\" class=\"form-control\" id=\"txtModalCustomerEditGPhone1\" value = \""+ customerData.g_phone_1 +"\"></td>";
    html += "</tr>";

    html += "<tr>";
    html += "<th style=\"width:30%\">الرقم القومى للضامن الاول</th>";
    html += "<td style=\"width:70%\"><input type=\"text\" class=\"form-control\" id=\"txtModalCustomerEditGID1\" value = \""+ customerData.g_id_1 +"\"></td>";
    html += "</tr>";

    html += "<tr>";
    html += "<th style=\"width:30%\">عنوان الضامن الاول</th>";
    html += "<td style=\"width:70%\"><input type=\"text\" class=\"form-control\" id=\"txtModalCustomerEditGAddress1\" value = \""+ customerData.g_address_1 +"\"></td>";
    html += "</tr>";

    html += "<tr>";
    html += "<th style=\"width:30%\">اسم الضامن الثانى</th>";
    html += "<td style=\"width:70%\"><input type=\"text\" class=\"form-control\" id=\"txtModalCustomerEditGName2\" value = \""+ customerData.guarantee2 +"\"></td>";
    html += "</tr>";

    html += "<tr>";
    html += "<th style=\"width:30%\">رقم تليفون الضامن الثانى</th>";
    html += "<td style=\"width:70%\"><input type=\"text\" class=\"form-control\" id=\"txtModalCustomerEditGPhone2\" value = \""+ customerData.g_phone_2 +"\"></td>";
    html += "</tr>";

    html += "<tr>";
    html += "<th style=\"width:30%\">الرقم القومى للضامن الثانى</th>";
    html += "<td style=\"width:70%\"><input type=\"text\" class=\"form-control\" id=\"txtModalCustomerEditGID2\" value = \""+ customerData.g_id_2 +"\"></td>";
    html += "</tr>";

    html += "<tr>";
    html += "<th style=\"width:30%\">عنوان الضامن الثانى</th>";
    html += "<td style=\"width:70%\"><input type=\"text\" class=\"form-control\" id=\"txtModalCustomerEditGAddress2\" value = \""+ customerData.g_address_2 +"\"></td>";
    html += "</tr>";

    html += "<tr>";
    html += "<th style=\"width:30%\">كلمة المرور</th>";
    html += "<td style=\"width:70%\"><input type=\"text\" class=\"form-control\" id=\"txtModalCustomerEditPassword\" value = \"" + customerData.password + "\"></td>";
    html += "</tr>";

    html += "</tbody>";
    html += "</table>";

    html += "<script>";
    html += "$('#txtModalCustomerEditName, #txtModalCustomerEditID, #txtModalCustomerEditAddress, #txtModalCustomerEditPhone1, #txtModalCustomerEditPhone2, #txtModalCustomerEditlandLine, #txtModalCustomerEditPassword, #txtModalCustomerEditGName1, #txtModalCustomerEditGPhone1, #txtModalCustomerEditGID1, #txtModalCustomerEditGAddress1, #txtModalCustomerEditGName2, #txtModalCustomerEditGPhone2, #txtModalCustomerEditGID2, #txtModalCustomerEditGAddress2, #txtModalCustomerEditPassword').on('keyup', function (e) {";
    html += "console.log(e);";
    html += "if(e.keyCode == 13)";
    html += "{";
    html += "editCustomerData();";
    html += "}";
    html += "});";
    html += " </script>";

    $('#customer-modal-body').html('');
    $('#customer-modal-body').html(html);

    $('#customerEditModalFooter').html('<button type="button" class="btn btn-success" onclick="editCustomerData()" style="color: white; margin: 0 auto">حفظ</button>');

    $('#customerModal').modal('show');

} //done

function openViewAdmins(jsnAdminsData) //3aaaaaaaaaaaaaaa4
{
    $("footer").css("position", "fixed");

    if(jsnAdminsData === "admins unavailable")
    {
        $('#mainContent').html('');
        alert("لا يوجد أدمن فى الموقع .. برجاء الرجوع إلى مطور الموقع !");
    }
    else
    {
        var adminsData =  JSON.parse(jsnAdminsData);

        var html = "";

        html += "<div class=\"container view-customers-container\">";
        html += "<table class=\"table table-hover view-customers-table\">";
        html += "<thead>";
        html += "<tr style='text-align: center'>";
        html += "<th scope=\"col\">الكود</th>";
        html += "<th scope=\"col\">الاسم</th>";
        html += "<th scope=\"col\">اسم المستخدم</th>";
        html += "<th scope=\"col\">كلمة المرور</th>";
        html += "<th scope=\"col\">تعديل</th>";
        html += "<th scope=\"col\">حذف</th>";
        html += "</tr>";
        html += "</thead>";
        html += "<tbody>";

        /*Search results here */
        for (var i = 0; i < adminsData.length; i++)
        {
            html += "<tr style='text-align: center'>";
            html += "<th scope=\"row\">"+ adminsData[i].key +"</th>";
            html += "<td>"+ adminsData[i].name +"</td>";
            html += "<td>"+ adminsData[i].username +"</td>";
            html += "<td>"+ adminsData[i].password +"</td>";
            html += "<td> <button type=\"button\" onclick='getOneAdminData("+ adminsData[i].key +")' class=\"btn btn-info\" style='color: white;'>تعديل</button> </td>";
            html += "<td> <button type=\"button\" onclick='deleteAdmin("+ adminsData[i].key +")' class=\"btn btn-danger\" style='color: white;'>حذف</button> </td>";
            html += "</tr>";
        }

        html += "</tbody>";
        html += "</table>";
        html += "</div>";

        $('#mainContent').html("");
        $('#mainContent').html(html);
    }

    setActiveTab("viewAdmins");
    
} //done

function showAdminEditModal(data) //3aaaaaaaaaaaaaaa4
{
    var adminData = JSON.parse(data);

    var html = "";

    html += "<table style=\"text-align: center; \" class=\"table\" id=\"adminViewTable\">";

    html += "<tbody style=\"text-align: center\">";

    html += "<tr>";
    html += "<th style=\"width:30%\">الكود</th>";
    html += "<td style=\"width:70%\"><input type=\"text\" class=\"form-control\" id=\"adminEditIDInput\" value=\"" + adminData.key +"\" readonly></td>";
    html += "</tr>";

    html += "<tr>";
    html += "<th style=\"width:30%\">الإسم</th>";
    html += "<td style=\"width:70%\"><input type=\"text\" class=\"form-control\" id=\"adminEditNameInput\"value=\"" + adminData.name +"\" ></td>";
    html += "</tr>";

    html += "<tr>";
    html += "<th style=\"width:30%\">اسم المستخدم</th>";
    html += "<td style=\"width:40%\"><input type=\"text\" class=\"form-control\" id=\"adminEditUserNameInput\"value=\"" + adminData.username +"\" ></td>";
    html += "</tr>";

    html += "<tr>";
    html += "<th style=\"width:30%\">كلمةالمرور</th>";
    html += "<td style=\"width:40%\"><input type=\"text\" class=\"form-control\" id=\"adminEditPasswordInput\"value=\"" + adminData.password +"\" ></td>";
    html += "</tr>";

    html += "</tbody>";
    html += "</table>";

    html += "<script>";
    html += "$('#adminEditNameInput, #adminEditUserNameInput, #adminEditPasswordInput').on('keyup', function (e) {";
    html += "console.log(e);";
    html += "if(e.keyCode == 13)";
    html += "{";
    html += "editAdmin();";
    html += "}";
    html += "});";
    html += " </script>";

    $('#admin-edit-modal-body').html('');
    $('#admin-edit-modal-body').html(html);

    $('#adminEditModalFooter').html('');
    $('#adminEditModalFooter').html('<button style=\"margin: 0.5em\" type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" id="dismissButton">إلغاء</button>');
    $('#adminEditModalFooter').append("<button style='margin: 0.5em' type=\"button\" onclick='editAdmin()' class=\"btn btn-success\">حفظ</button>")

    $('#adminEditModal').modal('show');
} //done

function openSearchCustomer() //3aaaaaaaaaaaaaaa4
{
    var html = "";


    html += "<div class=\"container search-table\">";
    html += "<div class=\"search-box\">";
    html += "<div class=\"row\">";
    html += "<div class=\"col-md-4\">";
    html += "<h5 style=\"text-align: center\">البحث بالاسم</h5>";
    html += "</div>";
    html += "<div class=\"col-md-6\">";
    html += "<input type=\"text\" id=\"customerNameSearchInput\" class=\"form-control\" placeholder=\"ادخل اسم العميل\">";
    html += "</div>";
    html += "<div class=\"col-md-2\">";
    html += "<button type=\"button\" onclick='searchCustomer(1)' id=\"btnCustomerNameSearch\" class=\"btn btn-success\">بحث</button>";
    html += "</div>";

    html += "<script>";
    html += "$('#customerNameSearchInput').on('keyup', function (e) {";
    html += "console.log(e);";
    html += "if(e.keyCode == 13)";
    html += "{";
    html += "searchCustomer(1);";
    html += "}";
    html += "});";
    html += " </script>";

    html += "<br>";
    html += "<br>";
    html += "<div class=\"col-md-4\">";
    html += "<h5 style=\"text-align: center\">البحث برقم البطاقة</h5>";
    html += "</div>";
    html += "<div class=\"col-md-6\">";
    html += "<input type=\"number\" id=\"customerIDSearchInput\" class=\"form-control\" placeholder=\"ادخل رقم بطاقة العميل\">";
    html += "</div>";
    html += "<div class=\"col-md-2\">";
    html += "<button type=\"button\" onclick='searchCustomer(2)' id=\"btnCustomerIDSearch\" class=\"btn btn-success\">بحث</button>";
    html += "</div>";

    html += "<script>";
    html += "$('#customerIDSearchInput').on('keyup', function (e) {";
    html += "console.log(e);";
    html += "if(e.keyCode == 13)";
    html += "{";
    html += "searchCustomer(2);";
    html += "}";
    html += "});";
    html += " </script>";

    html += "<br>";
    html += "<br>";
    html += "<div class=\"col-md-4\">";
    html += "<h5 style=\"text-align: center\">البحث بكود العميل </h5>";
    html += "</div>";
    html += "<div class=\"col-md-6\">";
    html += "<input type=\"number\" id=\"customerKeySearchInput\" class=\"form-control\" placeholder=\"ادخل كود العميل\">";
    html += "</div>";
    html += "<div class=\"col-md-2\">";
    html += "<button type=\"button\" onclick='searchCustomer(3)' id=\"btnCustomerKeySearch\" class=\"btn btn-success\">بحث</button>";
    html += "</div>";
    html += "</div>";
    html += "</div>";

    html += "</div>";
    html += "</div>";

    html += "<script>";
    html += "$('#customerKeySearchInput').on('keyup', function (e) {";
    html += "console.log(e);";
    html += "if(e.keyCode == 13)";
    html += "{";
    html += "searchCustomer(3);";
    html += "}";
    html += "});";
    html += " </script>";


    html += "<div id =\"customerSearchResultsArea\">";

    

    html += "</div>";
    html += "</div>";


    $('#mainContent').html("");
    $('#mainContent').html(html);

    setActiveTab("searchCustomer");

} //done

function openAddNewSale()
{

    $("footer").css("position", "fixed");

    var html = "";
    html += "<div class=\"card card-outline-secondary my-4\" style=\"text-align: center\">";
    html += "<div class=\"card-header\">";
    html += "إضافة عملية بيع جديدة";
    html += "</div>";
    html += "<div class=\"card-body\">";
    html += "<form>";
    html += "<div class=\"form-group col-lg-4\" style=\"text-align: right; float: right\">";
    html += "<label for=\"InputNumber\">رقم العميل :</label>";
    html += "<input type=\"number\" class=\"form-control\" id=\"InputNewSaleCustomerID\" placeholder=\"ادخل رقم العميل\">";
    html += "</div>";
    html += "<script>";


    html += "$('#InputNewSaleCustomerID').on(\"input\", function() {";

    html += "if($('#InputNewSaleCustomerID').val() === \"\")";
    html += "{";
    html += "$('#InputNewSaleCustomerName').val('');";
    html += "}";
    html += "else";
    html += "{";
    html += "getCustomerName();";
    html += "}";
    html += "});";

    html += "</script>";
    html += "<div class=\"form-group col-lg-8\" style=\"text-align: right; float: left\">";
    html += "<label for=\"InputNewSaleCustomerName\">اسم العميل :</label>";
    html += "<input type=\"text\" class=\"form-control\" id=\"InputNewSaleCustomerName\" placeholder=\"ادخل رقم العميل أولاً\" readonly>";
    html += "</div>";
    html += "<div class=\"form-group\" style=\"text-align: right\">";
    html += "<label for=\"InputProductName\">اسم المنتج :</label>";
    html += "<input type=\"text\" class=\"form-control\" id=\"InputNewSaleProductName\" placeholder=\"ادخل اسم المنتج\">";
    html += "</div>";
    html += "<div class=\"form-group col-lg-6\" style=\"text-align: right; float: right\">";
    html += "<label for=\"InputPrice\">السعر :</label>";
    html += "<input type=\"number\" class=\"form-control\" id=\"InputNewSalePrice\" placeholder=\"ادخل السعر\">";
    html += "</div>";
    html += "<div class=\"form-group col-lg-6\" style=\"text-align: right; float: left\">";
    html += "<label for=\"InputPaid\">المبلغ المدفوع مقدماً :</label>";
    html += "<input type=\"number\" class=\"form-control\" id=\"InputNewSalePaid\" placeholder=\"ادخل المبلغ المدفوع مقدماً\">";
    html += "</div>";
    html += "<div class=\"form-group col-lg-6\" style=\"text-align: right; float: right\">";
    html += "<label for=\"InputDate\">التاريخ :</label>";
    html += "<input type=\"date\" class=\"form-control\" id=\"InputNewSaleDate\">";
    html += "</div>";
    html += "<div class=\"form-group col-lg-6\" style=\"text-align: right; float: left\">";
    html += "<label for=\"InputDate\">يوم الدفع :</label>";
    html += "<input type=\"number\" class=\"form-control\" id=\"InputNewSalePaymentDate\" placeholder=\"يوم الدفع الشهرى\">";
    html += "</div>";
    html += "<div class=\"form-group\" style=\"text-align: right; padding-top: 180px;\">";
    html += "<label for=\"InputPaymentType\">نوع السداد :</label><br>";
    html += "<input type=\"radio\" name=\"InputPaymentType\" value=\"يومى\"> يومى";
    html += "&emsp; &emsp; &emsp; &emsp; &emsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;";
    html += "<input type=\"radio\" checked name=\"InputPaymentType\" value=\"شهرى\"> شهرى";
    html += "</div>";
    html += "<div class=\"form-group\" style=\"text-align: right\">";
    html += "<label for=\"InputMonthlyPaid\">المبلغ المدفوع شهرياً :</label>";
    html += "<input type=\"number\" class=\"form-control\" id=\"InputNewSaleMonthlyPaid\" placeholder=\"ادخل المبلغ المدفوع شهريا\">";
    html += "</div>";
    html += "<div class=\"form-group\" style=\"text-align: right\">";
    html += "<label for=\"InputPaid\">ملاحظات :</label>";
    html += "<input type=\"text\" class=\"form-control\" id=\"InputNewSaleNotes\" placeholder=\"ملاحظات\">";
    html += "</div>";


    html += "<button type=\"button\" onclick='addNewSale()' class=\"btn btn-primary\"> إضافةعملية بيع جديدة</button>";
    html += "</form>";
    html += "</div>";
    html += "</div>";

    html += "<script>";
    html += "$('input').on('keyup', function (e) {";
    html += "console.log(e);";
    html += "if(e.keyCode == 13)";
    html += "{";
    html += "addNewSale();";
    html += "}";
    html += "});";
    html += " </script>";

    $('#mainContent').html("");
    $('#mainContent').html(html);

    setActiveTab("addNewSale");
    
} //done

//For dropdownlist
var showOnlyOptionsSimilarToText = function (selectionEl, str, isCaseSensitive) {
    if (isCaseSensitive)
        str = str.toLowerCase();

    var $el = $(selectionEl);
    if (!$el.data("options")) {
        $el.data("options", $el.find("option").clone());
    }

    var newOptions = $el.data("options").filter(function () {
        var text = $(this).text();
        if (isCaseSensitive)
            text = text.toLowerCase();
        return text.match(str);
    });
    $el.empty().append(newOptions);
}; //done

function filterResults() {

    var userInput = $('#searchBox').val();

    showOnlyOptionsSimilarToText($('#customerSelect'), userInput);

} //done

function openViewLoans(jsnCustomersData) {

    var customersData = JSON.parse(jsnCustomersData);

    var html = "";

    html += "<div class=\"container view-customers-container\" style='padding-bottom: 10px;'>";

    html += "<div class=\"container\" style=\"width: 100%; text-align: center\">";
    html += "<table class=\"table\">";
    html += "<thead>";
    html += "<tr>";
    html += "<td colspan=\"5\"><h2>عرض أقساط العميل</h2></td>";
    html += "</tr>";
    html += "</thead>";
    html += "<tbody style=\"text-align: center\">";
    html += "<tr>";
    html += "<td style=\"width: 20%\"><label style=\"padding-top: 10px\">اسم العميل</label></td>";
    html += "<td style=\"width: 25%\"><input type=\"search\" class=\"form-control\" id=\"searchBox\" placeholder=\"البحث بإسم العميل\" onkeyup=\"filterResults()\"></td>";
    html += "<td style=\"width: 35%\"><div style=\"width: 100%\" id=\"customerSelectDiv\">";
    html += "<select style=\"width: 100%; margin-top: 4px; height: 30px; border-radius: 4px\" size=\"1\" class=\"scrollableinside\" id=\"customerSelect\">";

    
    for (var i = 0; i < customersData.length; i++) {
        html += "<option value=\""+ customersData[i].key +"\">" + customersData[i].name + "</option>";
    }


    html += "</select>";
    html += "</div></td>";
    html += "<td style=\"width: 20%\"><button type=\"button\" onclick=\"opengetCustomerLoan()\" class=\"btn btn-outline-success\" style=\"margin: 0 auto\">عرض الأقساط</button></td>";
    html += "</tr>";
    html += "</tbody>";
    html += "</table>";
    html += "</div>";
    html += "</div>";


    html += "<div id=\"getCustomerLoanArea\" class=\"container\"style=\"width: 100%; text-align: center\">";
    html += "</div>";

    html += "<div id=\"viewBillDetailsArea\" class=\"container\" style=\"width: 100%; text-align: center; margin: 0 auto\">";
    html += "</div>";

    $('#mainContent').html('');
    $('#mainContent').html(html);

    setActiveTab("viewLoans");

} //done

function opengetCustomerLoan()
{
    var selectedCustomerID = $('#customerSelect').find(":selected").val();
    getCustomerLoan(selectedCustomerID);
    $('#viewBillDetailsArea').html('');
}

function getCustomerLoan(selectedCustomerID) {

    if (isEmpty(selectedCustomerID))
        alert("قم باختيار العميل من القائمة أولاً");
    else {
        //view Bills in tables HTML

        var jsonCustomerBills = getCustomerBills(selectedCustomerID);

        var customerBills = JSON.parse(jsonCustomerBills);

        var html = "";

        html += "<h2 style=\"float: middle\">فواتير العميل</h2>";
        html += "<table id=\"showAllCustomerBillsTable\" class=\"table table-hover\" style=\"text-align: center;\">";
        html += "<thead>";
        html += "<tr valign=\"middle\">";
        html += "<th style=\" text-align: center; vertical-align: middle; padding: 15px 5px; \">كود الفاتورة</th>";
        html += "<th style=\" text-align: center; vertical-align: middle; padding: 15px 5px; \">تاريخ الفاتورة</th>";
        html += "<th style=\" text-align: center; vertical-align: middle; padding: 15px 5px; \">المنتج</th>";
        html += "<th style=\" text-align: center; vertical-align: middle; padding: 15px 5px; \">يوم الدفع</th>";
        html += "<th style=\" text-align: center; vertical-align: middle; padding: 15px 5px; \">السعر</th>";
        html += "<th style=\" text-align: center; vertical-align: middle; padding: 15px 5px; \">نوع الدفع</th>";
        html += "<th style=\" text-align: center; vertical-align: middle; padding: 15px 5px; \">القسط الشهرى</th>";
        html += "<th style=\" text-align: center; vertical-align: middle; padding: 15px 5px; \">المبلغ المدفوع</th>";
        html += "<th style=\" text-align: center; vertical-align: middle; padding: 15px 5px; \">المبلغ المتبقى</th>";
        html += "<th style=\" text-align: center; vertical-align: middle; padding: 15px 5px; \">ملاحظات</th>";
        html += "<th style=\" text-align: center; vertical-align: middle; padding: 15px 5px; \">عرض تفاصيل الفاتورة</th>";
        html += "<th style=\" text-align: center; vertical-align: middle; padding: 15px 5px; \">دفع</th>";
        html += "<th style=\" text-align: center; vertical-align: middle; padding: 15px 5px; \">حذف الفاتورة</th>";
        html += "</tr>";
        html += "</thead>";
        html += "<tbody>";

        var totalPriceMoney = 0;
        var totalPaidMoney = 0;
        var totalRemainingMoney = 0;

        for (var i = 0; i < customerBills.length; i++)
        {
            html += "<tr>";
            html += "<td>" + customerBills[i].key + "</td>";
            html += "<td>" + customerBills[i].saleDate + "</td>";
            html += "<td>" + customerBills[i].product_name + "</td>";
            html += "<td>" + customerBills[i].paymentDay + "</td>";
            html += "<td>" + customerBills[i].price + " جنيه</td>";
            totalPriceMoney += parseInt(customerBills[i].price);
            html += "<td>" + customerBills[i].paymentType + "</td>";
            html += "<td>" + customerBills[i].monthlyPaid + " جنيه</td>";
            html += "<td>" + customerBills[i].total_paid + " جنيه</td>";
            totalPaidMoney += parseInt(customerBills[i].total_paid); 
            var rem = customerBills[i].price - customerBills[i].total_paid;
            html += "<td>" + rem + " جنيه</td>";
            totalRemainingMoney += parseInt(rem);
            html += "<td>" + customerBills[i].notes + "</td>";
            html += "<td> <button type=\"button\" onclick=\" viewBillDetails(" + customerBills[i].key + ", " + customerBills[i].price + ") \" class=\"btn btn-outline-info\" style=\"margin: 0 auto\">عرض التفاصيل</button> </td>";
            html += "<td> <button type=\"button\" onclick=\" showAddCashModal(" + customerBills[i].key + " , " + selectedCustomerID +") \" class=\"btn btn-outline-success\" style=\"margin: 0 auto\">دفع</button> </td>";
            html += "<td> <button type=\"button\" onclick=\" deleteBill(" + customerBills[i].key + " , " + selectedCustomerID +") \" class=\"btn btn-outline-danger\" style=\"margin: 0 auto\">حذف</button> </td>";
            html += "</tr>";
        }

        totalPriceMoney = totalPriceMoney.toString().replace(/^0+/, '');
        totalPaidMoney = totalPaidMoney.toString().replace(/^0+/, '');
        totalRemainingMoney = totalRemainingMoney.toString().replace(/^0+/, '');

        html += "<tr>";
        html += "<td colspan=\"4\"><b>إجمالى الفواتير</b></td>";
        html += "<td><b>" + totalPriceMoney + " جنيه</b></td>";
        html += "<td></td>";
        html += "<td></td>";
        html += "<td><b>" + totalPaidMoney + " جنيه</b></td>";
        html += "<td><b>" + totalRemainingMoney + " جنيه</b></td>";
        html += "<td></td>";
        html += "<td></td>";
        html += "<td></td>";
        html += "<td></td>";
        html += "</tr>";
        html += "</tbody>";
        html += "</table>";
        


        $('#getCustomerLoanArea').html('');
        $('#getCustomerLoanArea').html(html);

    }

} //done

function viewBillDetails(billKey, price) {

    var jsnBillDetails = getBillDetails(billKey);

    var billDetails = JSON.parse(jsnBillDetails);

    var html = "";

    html += "<h2 style=\"float: middle\">تفاصيل الفاتورة رقم " + billKey + "</h2>";
    html += "<button style='margin-bottom: 5px; font-size: 2em' class=\"btn btn-outline-danger\" type=\"button\" id='billPriceButtonDetail'>" + price + " جنيه</button > ";
    html += "<table class=\"table table-hover\" style=\"text-align: center; margin-bottom: 50px;\">";
    html += "<thead>";
    html += "<tr>";
    html += "<th>#</th>";
    html += "<th>تاريخ عمليةالدفع</th>";
    html += "<th>المبلغ المدفوع</th>";
    html += "<th>المبلغ المتبقى</th>";
    html += "<th>حذف العملية</th>";
    html += "</tr>";
    html += "</thead>";
    html += "<tbody>";

    var remainingPrice = price;

    var totalAmountPaid = 0;

    for (var i = 0; i < billDetails.length; i++) {

        html += "<tr>";
        html += "<td>" + (i + 1) + "</td>";
        html += "<td>" + billDetails[i].paymentDate + "</td>";
        html += "<td>" + billDetails[i].amount_paid + " جنيه</td>";

        totalAmountPaid += parseInt(billDetails[i].amount_paid.toString());

        html += "<td>" + (parseInt(price.toString()) - totalAmountPaid) + " جنيه</td>";
        html += "<td> <button type=\"button\" onclick=\" deleteBillDetail(" + billDetails[i].key + " , " + billKey + " , " + price +") \" class=\"btn btn-outline-danger\" style=\"margin: 0 auto\">حذف</button> </td>";
        html += "</tr>";

    }

    html += "<tr>";
    html += "<td colspan=\"2\"><b>إجمالى الفاتورة</b></td>";
    html += "<td><b>" + totalAmountPaid + " جنيه</b></td>";

    var remainingMoney = (parseInt(price.toString()) - totalAmountPaid);

    html += "<td><b>" + remainingMoney + " جنيه</b></td>";
    html += "<td></td>";
    html += "</tr>";

    html += "</tbody>";
    html += "</table>";

    $('#viewBillDetailsArea').html('');
    $('#viewBillDetailsArea').html(html);

} //done

function showAddCashModal(billKey, customerID)
{
    $('#saleEditModalHeader').html('');
    $('#saleEditModalHeader').html('دفع قسط');

    var html = "";

    html += "<table style=\"text-align: center; padding: 0;\" class=\"table\" id=\"customerViewTable\">";

    html += "<tbody style=\"text-align: center;\">";

    html += "<tr>";
    html += "<th style=\"width:30%\">مبلغ مدفوع</th>";
    html += "<td style=\"width:40%\"><input type=\"text\" class=\"form-control\" id=\"receivedCashInput\"></td>";
    html += "<td style=\"width:30%\"><input type=\"date\" class=\"form-control\" id=\"receivedCashDate\"></td>";
    html += "</tr>";

    html += "<tr>";
    html += "<td colspan=\"3\" style=\"width:30%; text-align: center\"><button type=\"button\" onclick='addCashToPaid(" + billKey + " , " + customerID + ")' class=\"btn btn-outline-success\">إضافة</button></td>";
    html += "</tr>";

    html += "<script>";
    html += "$('#receivedCashInput').on('keyup', function (e) {";
    html += "console.log(e);";
    html += "if(e.keyCode == 13)";
    html += "{";
    html += "addCashToPaid(" + billKey + " , " + customerID + ");";
    html += "}";
    html += "});";
    html += " </script>";

    html += "</tbody>";
    html += "</table>";

    $('#sale-edit-modal-body').html('');
    $('#sale-edit-modal-body').html(html);

    $('#saleEditModalFooter').html('');
    $('#saleEditModalFooter').html('<button style=\"margin: 0.5em\" type=\"button\" class=\"btn btn-outline-danger\" id=\"dismissEditSaleButton\" data-dismiss=\"modal\">إلغاء</button>');

    $('#saleEditModal').modal('show');
} //done

function openViewMoneyHead() {

    var passKey = prompt("من فضلك أدخل الرقم السرى الخاص برأس المال", "");

    if (passKey == null || passKey == "") {
        $('#mainContent').html("");
        setActiveTab("aa");
    }
    else if (passKey === "mosa") {

        setActiveTab("viewMoneyHead");

        var jsnResponse = getMoneyHeadAndLoggedCounter();
        var myData = JSON.parse(jsnResponse);

        var html = "";

        html += "<div class=\"container\" style=\"text-align: center; height:100%; vertical-align: middle; margin: auto; display: inline-block;\">";

        html += "<div class=\"col-lg-6\" style=\"float: right\">";
        html += "<br />";
        html += "<br />";
        html += "<br />";
        html += "<img src=\"img/money.png\" class=\"rounded\" style=\"max-width:40%; height: auto; display: inline-block; margin: auto\" alt=\"Money photo\" />";
        html += "<h2>رأس المال</h2>";
        html += "<h3>" + myData.moneyHead + " جنيه</h3>";
        html += "</div>";

        html += "<div class=\"col-lg-6\" style=\"float: left\">";
        html += "<br />";
        html += "<br />";
        html += "<br />";
        html += "<img src=\"img/people.png\" class=\"rounded\" style=\"max-width:40%; height: auto; display: inline-block; margin: auto\" alt=\"People photo\" />";
        html += "<h2>عدد الزائرين للموقع</h2>";
        html += "<h3>" + myData.loggedCounter + " زائر</h3>";
        html += "</div>";

        html += "<div class=\"col-lg-12\" style=\"float: left;\">";
        html += "<br />";
        html += "<img onclick=\"getMonthlyMoneHead()\" src=\"img/moneyHead.png\" class=\"rounded\" style=\"cursor: pointer; max-width:25%; height: auto; display: inline-block; margin: 0 auto\" alt=\"People photo\" />";
        html += "<h2 onclick=\"getMonthlyMoneHead()\" style=\"cursor: pointer\">تقرير رأس المال الشهرى</h2>";
        html += "</div>";

        html += "</div>";

        $('#mainContent').html('');
        $('#mainContent').html(html);

    }
    else {
        $('#mainContent').html("");
        alert("الرقم السرى غير صحيح !");
        setActiveTab("aa");
        openViewMoneyHead();
    }

} //done

function openMonthlyMoneHeadModal(jsnResponse)
{
    var html = "";

    if (jsnResponse === "noDataYet"){

        html += "<h2 style=\"width: 100%; text-align: center;\">لا يوجد بيانات حتى الآن</h2>";//add text with no data yet

    }
    else {

        var myData = JSON.parse(jsnResponse);

        html += "<table style=\"text-align: center; margin: 0 auto; \" class=\"table\">";

        html += "<tbody style=\"text-align: center\">";

        html += "<tr>";
        html += "<th style=\"width:30%\">#</th>";
        html += "<th style=\"width:30%\">التاريخ</th>";
        html += "<th style=\"width:40%\">رأس المال</th>";
        html += "</tr>";

        for (var i = 0; i < myData.length; i++) {

            html += "<tr>";
            html += "<td style=\"width:30%\">" + (i + 1) + "</td>";
            html += "<td style=\"width:30%\">" + myData[i].date +"</td>";
            html += "<td style=\"width:40%\">" + myData[i].moneyHead +" جنيه</td>";
            html += "</tr>";

        }

        html += "</tbody>";
        html += "</table>";

    }

    $('#monthly-MoneyHead-modal-body').html('');
    $('#monthly-MoneyHead-modal-body').html(html);

    $('#monthlyMoneyHeadModal').modal('show');

}






function openViewMonthRate() {

    var jsnData = getMonthRate();

    var myData = JSON.parse(jsnData);

    var html = "";

    html += "<div class=\"col-lg-6\" style=\"float: right; text-align: center\">";
    html += "<br />";
    html += "<br />";
    html += "<br />";
    html += "<br />";
    html += "<br />";
    html += "<img src=\"img/MoneyGot.png\" class=\"rounded\" style=\"max-width:40%; height: auto; display: inline-block; margin: auto; margin-bottom: 30px;\" alt=\"Money Collected Photo\" />";
    html += "<h3>المبلغ المحصل</h3>";
    html += "<h2>" + myData.collectedMoney + "</h2>";
    html += "</div>";
    html += "<div class=\"col-lg-6\" style=\"float: left; text-align: center\">";
    html += "<br />";
    html += "<br />";
    html += "<br />";
    html += "<br />";
    html += "<br />";
    html += "<img src=\"img/moneyToGet.png\" class=\"rounded\" style=\"max-width:40%; height: auto; display: inline-block; margin: auto; margin-bottom: 30px;\" alt=\"Money To Collect Photo\" />";
    html += "<h3>المبلغ الواجب تحصيله</h3>";
    html += "<h2>" + myData.toBeCollectedMoney + "</h2>";
    html += "</div>";
    html += "<div class=\"col-lg-12\" style=\"width: 100%;float:right; text-align: center; margin-top: 50px;\">";
    html += "<h3>النسبة المئوية للتحصيل : </h3>";
    html += "<br />";
    html += "<div id=\"myProgress\" dir=\"ltr\">";
    if (myData.rate > 100)
        html += "<div id=\"myBar\" style=\"width: 100%\">" + myData.rate + "%</div>";
    else
        html += "<div id=\"myBar\" style=\"width: " + myData.rate + "%\">" + myData.rate + "%</div>";
    html += "</div>";
    html += "</div>";

    $('#mainContent').html("");
    $('#mainContent').html(html);

    setActiveTab("viewMonthRate");

} //done

var printedHTML = "";

function openViewInquiry()
{

    setActiveTab("viewInquiry");

    printedHTML = "<div class=\"container view-customers-container\"><table class=\"table table-bordered\" style=\"text-align: center;\"><h2 style=\"width:100px; font-weight:bold; margin: 0 auto\">التقرير</h2>";

    var jsnData = getInquiryData();

    var html = "";
    var beg = "";

    beg += "<div class=\"container view-customers-container\">";
    beg += "<table class=\"table table-hover\" style=\"text-align: center;\">";

    html = "<table class=\"table table-hover\" style=\"text-align: center;\">";
    html += "<thead>";
    html += "<tr id=\"inquiryTR\">";
    html += "<th width=\"5%\">الكود</th>";
    html += "<th width=\"10%\">الاسم</th>";
    html += "<th width=\"15%\">المنتج</th>";
    html += "<th width=\"10%\">القسط الشهرى</th>";
    html += "<th width=\"10%\">يوم الدفع</th>";
    html += "<th width=\"10%\">تاريخ آخر عملية دفع</th>";
    html += "<th width=\"10%\">الأقساط المتأخرة</th>";
    html += "<th width=\"15%\">رقم التليفون الأول</th>";
    html += "<th width=\"15%\">رقم التليفون الثانى</th>";
    html += "</tr>";
    html += "</thead>";
    html += "<tbody>";

    if (jsnData === "" || jsnData === "[]") {

        html += "<tr>";
        html += "<td colspan=\"8\"><h2 style=\"color: #00cc00\">لا يوجد فواتير متأخره</h2></td>";
        html += "</tr>";

    }
    else {

        var inquiryData = JSON.parse(jsnData);

        for (var i = 0; i < inquiryData.length; i++) {

            html += "<tr>";
            html += "<td>" + inquiryData[i].key + "</td>";
            html += "<td>" + inquiryData[i].customer_name + "</td>";
            html += "<td>" + inquiryData[i].product_name + "</td>";
            html += "<td>" + inquiryData[i].monthlyPaid + " جنيه</td>";
            html += "<td>" + inquiryData[i].paymentDay + "</td>";
            html += "<td>" + inquiryData[i].lastPayment + "</td>";
            html += "<td>" + inquiryData[i].latePayments + "</td>";
            html += "<td>" + inquiryData[i].phone1 + "</td>";
            html += "<td>" + inquiryData[i].phone2 + "</td>";
            html += "</tr>";

        }

        printedHTML += html;

        html += "<tr>";
        html += "<td colspan=\"9\"> <button type=\"button\" onclick=\"printInquiry(printedHTML);\" class=\"btn btn-outline-success\" style=\"margin: 0 auto\">طباعة</button> </td>";
        html += "</tr>";

    }

    html += "</tbody>";
    html += "</table>";
    html += "</div>";

    printedHTML += "</tbody></table></div>";

    $('#mainContent').html("");
    $('#mainContent').html(beg + html);



} //done

function printInquiry(printedHTML)
{
    printDIV = "<html><head direction=\"rtl\">";
    printDIV += "<title>Print it!</title>";
    printDIV += "<link rel= \"stylesheet\" href= \"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\" integrity= \"sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u\" crossorigin= \"anonymous\" >";
    printDIV += "<style>";
    printDIV += ".view-customers-container{";
    printDIV += "direction: rtl;";
    printDIV += "padding: 5%;";
    printDIV += "margin: 0 auto;";
    printDIV += "width: 100%;";
    printDIV += "}";
    printDIV += "th{text-align: center;}";
    printDIV += "</style>";
    printDIV += "</head> <body onload=\"window.print()\">";
    printDIV += printedHTML;
    printDIV += "</body></html>";

    var printWindow = window.open("", "_blank", "");

    printWindow.document.open();
    //write the html to the new window, link to css file
    printWindow.document.write(printDIV);
    printWindow.document.close();
    printWindow.focus();

}

function openlatencyNotes(jsnCustomersData)
{

    setActiveTab("latencyNotes");

    var customersData = JSON.parse(jsnCustomersData);

    var html = "";

    html += "<div class=\"container view-customers-container\" style='padding-bottom: 10px;'>";

    html += "<div class=\"container\" style=\"width: 100%; text-align: center\">";
    html += "<table class=\"table\">";
    html += "<thead>";
    html += "<tr>";
    html += "<td colspan=\"3\"><h2>الأقساط المتأخرة</h2></td>";
    html += "</tr>";
    html += "</thead>";
    html += "<tbody style=\"text-align: center\">";
    html += "<tr>";
    html += "<td style=\"width: 10%\"><label style=\"padding-top: 10px\">اسم العميل</label></td>";
    html += "<td style=\"width: 55%\"><input type=\"search\" class=\"form-control\" id=\"searchBox\" placeholder=\"البحث بإسم العميل\" onkeyup=\"filterResults()\"></td>";
    html += "<td style=\"width: 35%\"><div style=\"width: 100%\" id=\"customerSelectDiv\">";
    html += "<select style=\"width: 100%; margin-top: 4px; height: 30px; border-radius: 4px\" size=\"1\" class=\"scrollableinside\" id=\"customerSelect\">";


    for (var i = 0; i < customersData.length; i++) {
        html += "<option value=\"" + customersData[i].key + "\">" + customersData[i].name + "</option>";
    }


    html += "</select>";
    html += "</div></td>";
    html += "</tr>";

    html += "<tr>";
    html += "<td colspan=\"3\" style=\"width: 90%; margin: 0 auto;\">";

    html += "<div class=\"md-form\">";
    html += "<textarea type=\"text\" id=\"noteArea\" class=\"form-control\" rows=\"3\" placeholder=\"الملاحظات\"></textarea>";
    html += "</div>";

    html += "</td > ";
    html += "</tr>";

    html += "<tr>";
    html += "<td colspan=\"3\" style=\"margin: 0 auto;\"><button type=\"button\" onclick=\"addLatencyNote()\" class=\"btn btn-outline-success\" style=\"margin: 0 auto\">إضافة</button></td>";
    html += "</tr>";

    html += "</tbody>";
    html += "</table>";
    html += "</div>";
    html += "</div>";

    html += "<br />";
    html += "<br />";

    html += "<div id=\"viewLatencyNotesArea\" class=\"container\" style=\"width: 100%; text-align: center; margin: 0 auto\">";
    html += "</div>";

    $('#mainContent').html('');
    $('#mainContent').html(html);

    openAllLatencyNotes();

}

function openAllLatencyNotes() {

    var jsnLatencyNotesData = getLatencyNotes();

    if (jsnLatencyNotesData === "" || jsnLatencyNotesData === undefined) {
        
        var html = "";

        $('#viewLatencyNotesArea').html('');
        $('#viewLatencyNotesArea').html(html);

        alert("لا يوجد ملحوظات على العملاء");

    }
    else {

        var latencyNotes = JSON.parse(jsnLatencyNotesData);

        var html = "";

        html += "<table class=\"table\">";
        html += "<thead>";
        html += "<tr style='text-align: center'>";
        html += "<th>#</th>";
        html += "<th>اسم العميل</th>";
        html += "<th>الملاحظات</th>";
        html += "<th>حذف</th>";
        html += "</tr>";
        html += "</thead>";
        html += "<tbody id=\"customerSearchResultsArea\">";

        for (var i = 0; i < latencyNotes.length; i++) {
            html += "<tr style='text-align: center'>";
            html += "<td>" + (i + 1) + "</td>";
            html += "<td>" + latencyNotes[i].cutomerName + "</td>";
            html += "<td>" + latencyNotes[i].note + "</td>";
            html += "<td> <button type=\"button\" class=\"btn btn-danger\" onclick='deleteLatencyNote(" + latencyNotes[i].key + ")' style='color: white;'>حذف</button> </td>";
            html += "</tr>";
        }

        html += "</tbody>";
        html += "</table>";


        $('#viewLatencyNotesArea').html('');
        $('#viewLatencyNotesArea').html(html);
    }
    

}









