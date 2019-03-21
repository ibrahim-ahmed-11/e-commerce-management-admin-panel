$(document).ready(function()
{
    var type = localStorage.getItem('type');
    var id = localStorage.getItem('id');

    if( type === "user" && !isEmpty(id))
    {
        $('#loggedAsButtonViewer').html('مسجل كمستخدم');

        openViewBought();
    }
    else
    {
        alert("قم بتسجيل الدخول أولاً");
        location.replace('index.html');
    }

    window.onbeforeunload = function () {
        localStorage.setItem('type','');
        localStorage.setItem('id','');
    }

});

$(window).on("load", function () {
    $(".se-pre-con").fadeOut("slow");
});

function openViewBought()
{
    $("footer").css("position", "fixed");

    var custID = localStorage.getItem('id');

    var custData = getOneCustomerData(custID, '3');
    var customerData = JSON.parse(custData);


    $('#viewBought').html('');
    $('#viewBought').html(customerData.name);

    var html = "" ;

    //View info about user here


    html += "<div class=\"container view-customers-container\" style='margin-top: 30px; text-align: center'>";

    html += "<h2 style='margin-bottom: 20px; margin-top: 20px; color: #721c24'>البيانات الشخصيـة</h2>";

    html += "<div>";

    html += "<table class=\"table table-hover \">";
    html += "<tbody>";

    html += "<tr>";
    html += "<td style='width: 25%; text-align: center' scope=\"col\"><strong>الاسم :</strong></td>";
    html += "<td colspan='3' style='width: 75%; text-align: right' scope=\"col\">"+ customerData.name +"</td>";
    html += "</tr>";

    html += "<tr>";
    html += "<td style='width: 25%; text-align: center' scope=\"col\"><strong>رقم التليفون الأول :</strong></td>";
    html += "<td style='width: 25%; text-align: right' scope=\"col\">"+ customerData.phone1 +"</td>";
    html += "<td style='width: 25%; text-align: center' scope=\"col\"><strong>رقم التليفون الثانى :</strong></td>";
    html += "<td style='width: 25%; text-align: right' scope=\"col\">"+ customerData.phone2 +"</td>";
    html += "</tr>";

    html += "<tr>";
    html += "<td style='width: 25%; text-align: center' scope=\"col\"><strong>العنوان :</strong></td>";
    html += "<td colspan='3' style='width: 75%; text-align: right' scope=\"col\">"+ customerData.address +"</td>";
    html += "</tr>";

    html += "</tbody>";
    html += "</table>";



    html += "</div>";


    // View his sales here

    var boughtItemsData = getBoughtByCustomer(custID);

    if (boughtItemsData === "no items" || boughtItemsData === "" || boughtItemsData === "[]") {
        html += "<h2 style='margin-bottom: 20px; margin-top: 20px; color: red'>لا يوجد مشتروات</h2>";
    }
    else
    {

        var orderedData = JSON.parse(boughtItemsData);

        html += "<h2 style='margin-bottom: 20px; margin-top: 20px; color: #721c24'>المشتـروات</h2>";

        html += "<table class=\"table table-hover view-customers-table\">";
        html += "<thead>";
        html += "<tr style='text-align: center'>";
        html += "<th scope=\"col\">\#</th>";
        html += "<th scope=\"col\">المنتج</th>";
        html += "<th scope=\"col\">السعر الكلى</th>";
        html += "<th scope=\"col\">يوم الدفع</th>";
        html += "<th scope=\"col\">تاريخ آخر عملية دفع</th>";
        html += "<th scope=\"col\">المبلغ المدفوع شهريا</th>";
        html += "<th scope=\"col\">المبلغ الذى تم دفعه</th>";
        html += "<th scope=\"col\">المبلغ المتبقى</th>";
        html += "</tr>";
        html += "</thead>";
        html += "<tbody>";

        for (var i=0; i< orderedData.length; i++)
        {
            html += "<tr style='text-align: center'>";
            html += "<th scope=\"row\">"+ (i+1) +"</th>";
            html += "<td>"+ orderedData[i].product_name +"</td>";
            html += "<td>" + orderedData[i].price + " جنيه</td>";
            html += "<td>" + orderedData[i].paymentDay + "</td>";
            html += "<td>" + orderedData[i].lastPayment + "</td>";
            html += "<td>" + orderedData[i].monthlyPaid + " جنيه</td>";
            html += "<td>" + orderedData[i].total_paid + " جنيه</td>";
            html += "<td>" + (parseInt(orderedData[i].price) - parseInt(orderedData[i].total_paid)) + " جنيه</td>";
            html += "</tr>";
        }

        html += "</tbody>";
        html += "</table>";

    }

    html += "</div>";

    $('#mainContent').html("");
    $('#mainContent').html(html);


    $("#viewBought").addClass('active');

}
