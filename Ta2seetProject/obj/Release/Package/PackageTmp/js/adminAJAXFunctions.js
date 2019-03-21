/*Global Functions*/
function isEmpty(str) //3aaaaaaaaaaaaaaa4
{
    return (!str || 0 === str.length);
}

function logout() //3aaaaaaaaaaaaaaa4
{

    localStorage.setItem('type','');
    localStorage.setItem('id','');

    location.replace('index.html');

}

const serviceLink = "Ta2seetService.asmx";

/*Add new admin functions*/
function validateAddNewAdmin() //3aaaaaaaaaaaaaaa4
{
    return (isEmpty($('#InputNewAdminName').val()) ||  isEmpty($('#InputNewAdminUserName').val()) ||  isEmpty($('#InputNewAdminPassword').val()));
} //done

function addNewAdmin() //3aaaaaaaaaaaaaaa4
{

    if(validateAddNewAdmin())
    {
        alert("قم بملء جميع البيانات");
    }
    else
    {
        var json = "{ \"name\" : \"" + $('#InputNewAdminName').val() + "\",\"username\" : \"" + $('#InputNewAdminUserName').val() + "\", \"password\" : \"" + $('#InputNewAdminPassword').val() + "\" }";
        $.ajax({
            type: "POST",
            url: serviceLink + "/addNewAdmin",
            async: false,
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({ json: json }),
            success: function (data) {

                if(data.d === "username available")
                {
                    alert("اسم المستخدم موجود .. ادخل اسم مستخدم آخر");
                }
                else if(data.d === "databaseError")
                {
                    alert("خطأ فى قاعدة البيانات");
                }
                else if(data.d === "write in database error")
                {
                    alert("خطأ فى عملية الإدخال فى قاعدة البيانات");
                }
                else if(data.d === "multiple insertions")
                {
                    alert("تم إدخال الأدمن أكثر من مرة");
                }
                else if(data.d === "inserted")
                {
                    alert("تم إضافة الأدمن بنجاح");
                    $('#InputNewAdminName').val('');
                    $('#InputNewAdminUserName').val('');
                    $('#InputNewAdminPassword').val('');
                }
            },
            error: function (er) {
                alert('error:' + JSON.stringify(er));
            }
        });
    }

} //done


/*Add new customer & view Customers functions*/
function validateAddNewCustomer() //3aaaaaaaaaaaaaaa4
{

    if(isEmpty($('#InputNewCustomerName').val()) ||  isEmpty($('#InputNewCustomerID').val()) ||  isEmpty($('#InputNewCustomerAddress').val()) ||  isEmpty($('#InputNewCustomerPhone1').val()))
        return 1;
    else if ($('#InputNewCustomerID').val().length != 14)
        return 2;

} //done

function addNewCustomer() //3aaaaaaaaaaaaaaa4
{

    if( validateAddNewCustomer() == 1 )
    {
        alert("قم بملء جميع البيانات");
    }
    else if ( validateAddNewCustomer() == 2 )
    {
        alert('برجاء التأكد من صحة الرقم القومى');
    }
    else
    {
        var json = "{ " +
            "\"name\" : \"" + $('#InputNewCustomerName').val() + "\" ," +
            "\"id_num\" : \"" + $('#InputNewCustomerID').val() + "\" ," +
            "\"address\" : \"" + $('#InputNewCustomerAddress').val() + "\" ," +
            "\"phone1\" : \"" + $('#InputNewCustomerPhone1').val() + "\" ," +
            "\"phone2\" : \"" + $('#InputNewCustomerPhone2').val() + "\" ," +
            "\"landLine\" : \"" + $('#InputNewCustomerLandLine').val() + "\" ," +
            "\"guarantee1\" : \"" + $('#InputNewCustomerG1').val() + "\" ," +
            "\"g_id_1\" : \"" + $('#InputNewCustomerGID1').val() + "\" ," +
            "\"g_address_1\" : \"" + $('#InputNewCustomerGAd1').val() + "\" ," +
            "\"g_phone_1\" : \"" + $('#InputNewCustomerGPh1').val() + "\" ," +
            "\"guarantee2\" : \"" + $('#InputNewCustomerG2').val() + "\" ," +
            "\"g_id_2\" : \"" + $('#InputNewCustomerGID2').val() + "\" ," +
            "\"g_address_2\" : \"" + $('#InputNewCustomerGAd2').val() + "\" ," +
            "\"g_phone_2\" : \"" + $('#InputNewCustomerGPh2').val() + "\" ," +
            "\"password\" : \"" + $('#InputNewCustomerID').val() + "" +
            "\" }";

        $.ajax({
            type: "POST",
            url: serviceLink + "/addNewCustomer",
            async: false,
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({ json: json }),

            success: function (data) {
                if(data.d === "id number available")
                {
                    alert("الرقم القومى مسجل مسبقاً");
                }
                else if(data.d === "databaseError")
                {
                    alert("خطأ فى قاعدة البيانات");
                }
                else if(data.d === "write in database error")
                {
                    alert("خطأ فى عملية الإدخال فى قاعدة البيانات");
                }
                else if(data.d === "multiple insertions")
                {
                    alert("تم إدخال العميل أكثر من مرة");
                }
                else if(data.d === "inserted")
                {
                    var numberID = $('#InputNewCustomerID').val();

                    alert("تم إضافة العميل بنجاح");
                    openAddCustomer();
                    getInsertedCustomerKey(numberID);
                }
            },
            error: function (er) {
                alert('error:' + JSON.stringify(er));
            }
        });
    }

} //done

function getInsertedCustomerKey(custID) //3aaaaaaaaaaaaaaa4
{
    var queryString = "select Customers.[key] from Customers where Customers.id_num = " + custID;

    $.ajax({
        type: "POST",
        url: serviceLink + "/getCustomerID",
        async: false,
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({ queryString: queryString }),

        success: function (data) {
            if(data.d === "id number available")
            {
                alert("الرقم القومى مسجل مسبقاً");
            }
            else if(data.d === "multiple users")
            {
                alert("خطأ فى ادخال البيانات");
            }
            else if(data.d === "databaseError")
            {
                alert("خطأ فى قاعدة البيانات");
            }
            else if(data.d.substring(0,4) === "done")
            {
                $('#insertedBox').html('');
                $('#insertedBox').html('كود العميل المضاف : ' + data.d.substring(4));
            }
        },
        error: function (er) {
            alert('error:' + JSON.stringify(er));
        }
    });
} //done

function getAllCustomersData() //3aaaaaaaaaaaaaaa4
{
    var queryString = "select * from Customers;";

    $.ajax({
        type: "POST",
        url: serviceLink + "/getAllCustomers",
        async: false,
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({ queryString: queryString }),

        success: function (data) {

            if(data.d === "databaseError")
            {
                alert("خطأ فى قاعدة البيانات");
            }
            else if(data.d === "customers unavailable")
            {
                alert("لا يوجد عملاء فى الموقع");;
            }
            else
            {
                openCustomers(data.d);
            }

        },
        error: function (er) {
            alert('error:' + JSON.stringify(er));
        }
    });
} //done

function validateEditCustomer() //3aaaaaaaaaaaaaaa4
{

    if(isEmpty($('#txtModalCustomerEditName').val()) ||  isEmpty($('#txtModalCustomerEditID').val()) ||  isEmpty($('#txtModalCustomerEditAddress').val()) ||  isEmpty($('#txtModalCustomerEditPhone1').val())
        || isEmpty($('#txtModalCustomerEditPassword').val()) || isEmpty($('#txtModalCustomerEditPassword').val()))
        return 1;
    else if ($('#txtModalCustomerEditID').val().length != 14)
        return 2;

} //done

function editCustomerData() //3aaaaaaaaaaaaaaa4
{
    if( validateEditCustomer() == 1 )
    {
        alert("قم بملء كل البيانات");
    }
    else if ( validateEditCustomer() == 2 )
    {
        alert("قم بالتأكد من صحة الرقم القومى");
    }
    else
    {
        //edit customer

        var queryString = "update Customers set name='"+ $('#txtModalCustomerEditName').val() +"'," +
            " id_num='"+ $('#txtModalCustomerEditID').val() +"'," +
            " [address]='"+ $('#txtModalCustomerEditAddress').val() +"'," +
            " phone1='"+ $('#txtModalCustomerEditPhone1').val() +"'," +
            " phone2='"+ $('#txtModalCustomerEditPhone2').val() +"'," +
            " landLine='"+ $('#txtModalCustomerEditLandLine').val() +"'," +
            " guarantee_1='"+ $('#txtModalCustomerEditGName1').val() +"'," +
            " g_id_1='"+ $('#txtModalCustomerEditGID1').val() +"'," +
            " g_address_1='"+ $('#txtModalCustomerEditGAddress1').val() +"'," +
            " g_phone_1='"+ $('#txtModalCustomerEditGPhone1').val() +"'," +
            " guarantee_2='"+ $('#txtModalCustomerEditGName2').val() +"'," +
            " g_id_2='"+ $('#txtModalCustomerEditGID2').val() +"'," +
            " g_address_2='"+ $('#txtModalCustomerEditGAddress2').val() +"'," +
            " g_phone_2='"+ $('#txtModalCustomerEditGPhone2').val() +"'," +
            " [password]='"+ $('#txtModalCustomerEditPassword').val() +"'" +
            " where Customers.[key] = "+ $('#txtModalCustomerEditKey').val() +";";

        $.ajax({
            type: "POST",
            url: serviceLink + "/updateCustomerData",
            async: false,
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({ queryString: queryString }),

            success: function (data) {

                if(data.d === "databaseError")
                {
                    alert("خطأ فى قاعدة البيانات");
                }
                else if(data.d === "customer unavailable")
                {
                    alert("لا يوجد عميل فى الموقع .. برجاء الرجوع إلى مطور الموقع !");
                }
                else if(data.d === "updated")
                {

                    alert("تم تحديث البيانات بنجاح");

                    $('#customerModalClose').click();

                    openAddCustomer();

                }
                else
                {
                    alert("حدث خطأ ما");
                }

            },
            error: function (er) {
                alert('error:' + JSON.stringify(er));
            }
        });

    }
} //done

function deleteCustomer(customerKey, flag) //3aaaaaaaaaaaaaaa4
{
    if(confirm("هل تريد حذف هذا العميل ؟"))
    {
        //delete admin
        var queryString = "delete from Customers where Customers.[key] = "+ customerKey +";";

        $.ajax({
            type: "POST",
            url: serviceLink + "/deleteCustomer",
            async: false,
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({ queryString: queryString }),

            success: function (data) {

                if(data.d === "databaseError")
                {
                    alert("خطأ فى قاعدة البيانات");
                }
                else if(data.d === "deleted")
                {
                    alert("تم حذف العميل بنجاح");
                    if (flag === '1')
                        openAddCustomer();
                    else if (flag === '2')
                        openSearchCustomer();
                }
                else
                {
                    alert("حدث خطأ ما");
                }

            },
            error: function (er) {
                alert('error:' + JSON.stringify(er));
            }
        });
    }
    else
    {
        //do nothing
    }
} //done


/*View All Admins, Edit and delete*/
function getAllAdminsData() //3aaaaaaaaaaaaaaa4
{
    var queryString = "select * from Admins;";

    $.ajax({
        type: "POST",
        url: serviceLink + "/getAllAdmins",
        async: false,
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({ queryString: queryString }),

        success: function (data) {

            if(data.d === "databaseError")
            {
                alert("خطأ فى قاعدة البيانات");
            }
            else
            {
                openViewAdmins(data.d);
            }

        },
        error: function (er) {
            alert('error:' + JSON.stringify(er));
        }
    });
} //done

function getOneAdminData(key) //3aaaaaaaaaaaaaaa4
{
    var queryString = "select * from Admins where Admins.[Key] = "+ key ;

    $.ajax({
        type: "POST",
        url: serviceLink + "/getOneAdminData",
        async: false,
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({ queryString: queryString }),

        success: function (data) {

            if(data.d === "databaseError")
            {
                alert("خطأ فى قاعدة البيانات");
            }
            else if (data.d === "admin unavailable")
            {
                alert("لا يوجد أدمن فى الموقع .. برجاء الرجوع إلى مطور الموقع !");
            }
            else if (data.d === "multiple admins")
            {
                alert("يوجد أكثر من أدمن بنفس الكود.. برجاء الرجوع إلى مطور الموقع !");
            }
            else
            {
                showAdminEditModal(data.d);
            }

        },
        error: function (er) {
            alert('error:' + JSON.stringify(er));
        }
    });
} //done

function editAdmin() //3aaaaaaaaaaaaaaa4
{
    var queryString = "update Admins set Admins.name='"+ $('#adminEditNameInput').val() +"', Admins.username='"+ $('#adminEditUserNameInput').val() +"',Admins.[password] = '"+ $('#adminEditPasswordInput').val() +"' where Admins.[key]= "+ $('#adminEditIDInput').val() +" ;";

    $.ajax({
        type: "POST",
        url: serviceLink + "/updateAdminData",
        async: false,
        contentType: "application/json",
        data: JSON.stringify({ queryString: queryString }),

        success: function (data) {

            if(data.d === "databaseError")
            {
                alert("خطأ فى قاعدة البيانات");
            }
            else if (data.d === "admin unavailable")
            {
                alert("لا يوجد أدمن فى الموقع .. برجاء الرجوع إلى مطور الموقع !");
            }
            else if (data.d === "updated")
            {

                alert("تم تحديث البيانات بنجاح");

                $('#dismissButton').click();

                getAllAdminsData();

            }
            else
            {
                alert("حدث خطأ ما");
            }

        },
        error: function (er) {
            alert('error:' + JSON.stringify(er));
        }
    });
} //done

function deleteAdmin(adminKey) //3aaaaaaaaaaaaaaa4
{
    if(confirm("هل تريد حذف هذا الأدمن ؟"))
    {
        var queryString = "delete from Admins where Admins.[key] = "+ adminKey +";";

        $.ajax({
            type: "POST",
            url: serviceLink + "/deleteAdmin",
            async: false,
            contentType: "application/json",
            data: JSON.stringify({ queryString: queryString }),

            success: function (data) {

                if(data.d === "databaseError")
                {
                    alert("خطأ فى قاعدة البيانات");
                }
                else if (data.d === "no admins")
                {
                    alert("لا يوجد أدمن فى الموقع .. برجاء الرجوع إلى مطور الموقع !");
                }
                else if (data.d === "one admin")
                {
                    alert("لا يمكن حذف الأدمن الأخير فى الموقع !");
                }
                else if (data.d === "deleted")
                {
                    alert("تم حذف الأدمن بنجاح");
                    getAllAdminsData();
                }
                else
                {
                    alert("حدث خطأ ما");
                }

            },
            error: function (er) {
                alert('error:' + JSON.stringify(er));
            }
        });
    }
    else
    {
        //do nothing
    }
} //done


/*Search a customer*/
function validateCustomerSearchArea(num) //3aaaaaaaaaaaaaaa4
{
    if(num == 1)
    {
        //Validate Name Search Input
        if( isEmpty($('#customerNameSearchInput').val()))
        {
            return 1;
        }
    }
    else if (num == 2)
    {
        //Validate ID Search Input
        if( isEmpty($('#customerIDSearchInput').val()) )
        {
            return 1;
        }
        else if ( $('#customerIDSearchInput').val().length != 14 )
        {
            return 2;
        }
    }
    else if(num == 3)
    {
        //Validate Key Search Input
        if( isEmpty($('#customerKeySearchInput').val()))
        {
            return 1;
        }
    }
} //done

function searchCustomer(num) //3aaaaaaaaaaaaaaa4
{

    var queryString;
    if (num == 1) {
        //Clear other inputs
        $('#customerIDSearchInput').val('');
        $('#customerKeySearchInput').val('');

        //Search by name
        if (validateCustomerSearchArea(1) == 1) {
            alert("قم بإدخال اسم العميل أولاً");
        }
        else {
            queryString = "select * from Customers where Customers.name like '%" + $('#customerNameSearchInput').val() + "%';";
            //Search Customer name
            $.ajax({
                type: "POST",
                url: serviceLink + "/searchCustomer",
                async: false,
                async: false,
                contentType: "application/json",
                data: JSON.stringify({ queryString: queryString }),

                success: function (data) {

                    if (data.d === "databaseError") {
                        $('#customerSearchResultsArea').html('');
                        alert("خطأ فى قاعدة البيانات");
                    }
                    else if (data.d === "customer unavailable") {
                        $('#customerSearchResultsArea').html('');
                        alert("لا يوجد عملاء يحتوى اسمهم على هذا الاسم");
                    }
                    else {
                        var jsonCustomersList = JSON.parse(data.d);

                        var html = '';

                        html += "<table class=\"table\">";
                        html += "<thead>";
                        html += "<tr style='text-align: center'>";
                        html += "<th>كود العميل</th>";
                        html += "<th>اسم العميل</th>";
                        html += "<th>رقم البطاقة</th>";
                        html += "<th>رقم التليفون</th>";
                        html += "<th>التفاصيل</th>";
                        html += "<th>تعديل</th>";
                        html += "<th>حذف</th>";
                        html += "</tr>";
                        html += "</thead>";
                        html += "<tbody id=\"customerSearchResultsArea\">";

                        for (var i = 0; i < jsonCustomersList.length; i++) {
                            html += "<tr style='text-align: center'>";
                            html += "<td>" + jsonCustomersList[i].key + "</td>";
                            html += "<td>" + jsonCustomersList[i].name + "</td>";
                            html += "<td>" + jsonCustomersList[i].id_num + "</td>";
                            html += "<td>" + jsonCustomersList[i].phone1 + "</td>";
                            html += "<td><button type=\"button\" class=\"btn btn-info\" onclick=\"getOneCustomerData(" + jsonCustomersList[i].key + ",'1')\">عرض التفاصيل</button></td>";
                            html += "<td> <button type=\"button\" class=\"btn btn-secondary\" onclick='getOneCustomerData(" + jsonCustomersList[i].key +", \"2\")' style='color: white;'>تعديل</button> </td>";
                            html += "<td> <button type=\"button\" class=\"btn btn-danger\" onclick='deleteCustomer(" + jsonCustomersList[i].key + ",'2')' style='color: white;'>حذف</button> </td>";
                            html += "</tr>";
                        }

                        html += "</tbody>";
                        html += "</table>";

                        $('#customerSearchResultsArea').html('');
                        $('#customerSearchResultsArea').html(html);

                    }

                },
                error: function (er) {
                    alert('error:' + JSON.stringify(er));
                }
            });
        }
    }
    else if (num == 2) {
        //Clear other inputs
        $('#customerNameSearchInput').val('');
        $('#customerKeySearchInput').val('');

        //Search by id
        if (validateCustomerSearchArea(2) == 1) {
            alert("قم بإدخال رقم البطاقة أولاً");
        }
        else if (validateCustomerSearchArea(2) == 2) {
            alert("برجاء التأكد من صحة الرقم القومى");
        }
        else {
            queryString = "select * from Customers where Customers.id_num = '" + $('#customerIDSearchInput').val() + "';";

            $.ajax({
                type: "POST",
                url: serviceLink + "/searchCustomer",
                async: false,
                async: false,
                contentType: "application/json",
                data: JSON.stringify({ queryString: queryString }),

                success: function (data) {

                    if (data.d === "databaseError") {
                        $('#customerSearchResultsArea').html('');
                        alert("خطأ فى قاعدة البيانات");
                    }
                    else if (data.d === "customer unavailable") {
                        $('#customerSearchResultsArea').html('');
                        alert("لا يوجد عملاء يحتوى اسمهم على هذا الاسم");
                    }
                    else {

                        var jsonCustomersList = JSON.parse(data.d);

                        var html = '';

                        html += "<table class=\"table\">";
                        html += "<thead>";
                        html += "<tr style='text-align: center'>";
                        html += "<th>كود العميل</th>";
                        html += "<th>اسم العميل</th>";
                        html += "<th>رقم البطاقة</th>";
                        html += "<th>رقم التليفون</th>";
                        html += "<th>التفاصيل</th>";
                        html += "<th>تعديل</th>";
                        html += "<th>حذف</th>";
                        html += "</tr>";
                        html += "</thead>";
                        html += "<tbody id=\"customerSearchResultsArea\">";

                        for (var i = 0; i < jsonCustomersList.length; i++) {
                            html += "<tr style='text-align: center'>";
                            html += "<td>" + jsonCustomersList[i].key + "</td>";
                            html += "<td>" + jsonCustomersList[i].name + "</td>";
                            html += "<td>" + jsonCustomersList[i].id_num + "</td>";
                            html += "<td>" + jsonCustomersList[i].phone1 + "</td>";
                            html += "<td><button type=\"button\" class=\"btn btn-info\" onclick=\"getOneCustomerData(" + jsonCustomersList[i].key + ",'1')\">عرض التفاصيل</button></td>";
                            html += "<td> <button type=\"button\" class=\"btn btn-secondary\" onclick='getOneCustomerData(" + jsonCustomersList[i].key + ", \"2\")' style='color: white;'>تعديل</button> </td>";
                            html += "<td> <button type=\"button\" class=\"btn btn-danger\" onclick='deleteCustomer(" + jsonCustomersList[i].key + ",'2')' style='color: white;'>حذف</button> </td>";
                            html += "</tr>";
                        }

                        html += "</tbody>";
                        html += "</table>";

                        $('#customerSearchResultsArea').html('');
                        $('#customerSearchResultsArea').html(html);
                    }

                },
                error: function (er) {
                    alert('error:' + JSON.stringify(er));
                }
            });
        }
    }
    else if (num == 3) {
        //Clear other inputs
        $('#customerNameSearchInput').val('');
        $('#customerIDSearchInput').val('');

        //Search by Code
        if (validateCustomerSearchArea(3) == 1) {
            alert("قم بإدخال كود العميل أولاً");
        }
        else {
            queryString = "select * from Customers where Customers.[Key] = " + $('#customerKeySearchInput').val() + ";";
            //Search Customer Code
            $.ajax({
                type: "POST",
                url: serviceLink + "/searchCustomer",
                async: false,
                async: false,
                contentType: "application/json",
                data: JSON.stringify({ queryString: queryString }),

                success: function (data) {

                    if (data.d === "databaseError") {
                        $('#customerSearchResultsArea').html('');
                        alert("خطأ فى قاعدة البيانات");
                    }
                    else if (data.d === "customer unavailable") {
                        $('#customerSearchResultsArea').html('');
                        alert("لا يوجد عملاء بهذا الكود");
                    }
                    else {
                        var jsonCustomersList = JSON.parse(data.d);

                        var html = '';

                        html += "<table class=\"table\">";
                        html += "<thead>";
                        html += "<tr style='text-align: center'>";
                        html += "<th>كود العميل</th>";
                        html += "<th>اسم العميل</th>";
                        html += "<th>رقم البطاقة</th>";
                        html += "<th>رقم التليفون</th>";
                        html += "<th>التفاصيل</th>";
                        html += "<th>تعديل</th>";
                        html += "<th>حذف</th>";
                        html += "</tr>";
                        html += "</thead>";
                        html += "<tbody id=\"customerSearchResultsArea\">";

                        for (var i = 0; i < jsonCustomersList.length; i++) {
                            html += "<tr style='text-align: center'>";
                            html += "<td>" + jsonCustomersList[i].key + "</td>";
                            html += "<td>" + jsonCustomersList[i].name + "</td>";
                            html += "<td>" + jsonCustomersList[i].id_num + "</td>";
                            html += "<td>" + jsonCustomersList[i].phone1 + "</td>";
                            html += "<td><button type=\"button\" class=\"btn btn-info\" onclick=\"getOneCustomerData(" + jsonCustomersList[i].key + ", '1')\">عرض التفاصيل</button></td>";
                            html += "<td> <button type=\"button\" class=\"btn btn-secondary\" onclick='getOneCustomerData(" + jsonCustomersList[i].key + ",\"2\")' style='color: white;'>تعديل</button> </td>";
                            html += "<td> <button type=\"button\" class=\"btn btn-danger\" onclick='deleteCustomer(" + jsonCustomersList[i].key + ",'2')' style='color: white;'>حذف</button> </td>";
                            html += "</tr>";
                        }

                        html += "</tbody>";
                        html += "</table>";

                        $('#customerSearchResultsArea').html('');
                        $('#customerSearchResultsArea').html(html);

                    }

                },
                error: function (er) {
                    alert('error:' + JSON.stringify(er));
                }
            });

        }

    }

} //done

function getOneCustomerData(customerID, key) //3aaaaaaaaaaaaaaa4
{
    var queryString = "select * from Customers where Customers.[key] = " + customerID;

    var jsnResponse;

    $.ajax({
        type: "POST",
        url: serviceLink + "/getOneCustomerData",
        async: false,
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({ queryString: queryString }),

        success: function (data) {

            if(data.d === "databaseError")
            {
                alert("خطأ فى قاعدة البيانات");
            }
            else if(data.d === "multiple customers key error")
            {
                alert("يوجد أكثر من عميل بنفس الكود");
            }
            else if(data.d === "customer unavailable")
            {
                alert("لا يوجد عميل بهذا الكود");
            }
            else
            {
                if (key === "1")
                    showCustomerModal(data.d);
                else if (key === "2")
                    showCustomerEditModal(data.d);
                else if (key === "3")
                    jsnResponse = data.d;
            }

        },
        error: function (er) {
            alert('error:' + JSON.stringify(er));
        }
    });

    if (jsnResponse !== null || jsnResponse !== "")
        return  jsnResponse;
} //done


/*Add new Sale functions*/

function getCustomerName() //3aaaaaaaaaaaaaaa4
{

    var queryString = "select Customers.name from Customers where Customers.[key] = " + $('#InputNewSaleCustomerID').val();

    $.ajax({
        type: "POST",
        url: serviceLink + "/getCustomerName",
        async: false,
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({ queryString: queryString }),

        success: function (data) {
            if(data.d === "key unavailable")
            {
                $('#InputNewSaleCustomerName').val('لا يوجد عميل بهذا الكود').css('color', 'red');
            }
            else if(data.d === "databaseError")
            {
                $('#InputNewSaleCustomerName').val('خطأ فى قاعدة البيانات').css('color', 'red');
            }
            else
            {
                $('#InputNewSaleCustomerName').val(data.d).css('color','green');
            }
        },
        error: function (er) {
            alert('error:' + JSON.stringify(er));
        }
    });

} //done

$('#InputNewSaleCustomerID').on("focusout", function () //3aaaaaaaaaaaaaaa4
{
    getCustomerName();
}); //done

function validateNewSale() //3aaaaaaaaaaaaaaa4
{
    if (isEmpty($('#InputNewSaleCustomerID').val()) || isEmpty($('#InputNewSaleProductName').val())
        || isEmpty($('#InputNewSalePrice').val()) || isEmpty($('#InputNewSalePaid').val())
        || isEmpty($('#InputNewSaleDate').val()) || $('#InputNewSaleDate').val() == undefined
        || isEmpty($('#InputNewSalePaymentDate').val()) || isEmpty($('#InputNewSaleMonthlyPaid').val()))
        return 1;
    else if (parseInt($('#InputNewSalePrice').val()) < parseInt($('#InputNewSalePaid').val()))
        return 2;
    else if (parseInt($('#InputNewSalePaymentDate').val()) > 31 || parseInt($('#InputNewSalePaymentDate').val()) < 1)
        return 3;
} //done

function addNewSale() //3aaaaaaaaaaaaaaa4
{
    if (validateNewSale() == 1)
    {
        alert("قم بملء جميع البيانات");
    }
    else if ( validateNewSale() == 2 )
    {
        alert('برجاء التأكد من صحة السعر والمبلغ المدفوع');
    }
    else if ( validateNewSale() == 3 )
    {
        alert('برجاء التأكد من صحة يوم الدفع الشهرى');
    }
    else
    {
         try {
            $('#InputNewSaleCustomerIDModal').val($('#InputNewSaleCustomerID').val());
            $('#InputNewSaleProductNameModal').val($('#InputNewSaleProductName').val());
            $('#InputNewSalePriceModal').val($('#InputNewSalePrice').val());
            $('#InputNewSalePaidModal').val($('#InputNewSalePaid').val());
            var date = new Date($('#InputNewSaleDate').val());
            day = date.getDate();
            month = date.getMonth() + 1;
            year = date.getFullYear();
            $('#InputNewSaleDateModal').val([day, month, year].join('/'));
            $('#InputNewSalePaymentDateModal').val($('#InputNewSalePaymentDate').val());
            $('#InputPaymentTypeModal').val($("input[name='InputPaymentType']:checked").val());
            $('#InputNewSaleMonthlyPaidModal').val($('#InputNewSaleMonthlyPaid').val());
            $('#InputNewSaleNotesModal').val($('#InputNewSaleNotes').val());

            $('#newSaleModal').modal('show');
         } catch (err) {
             alert('error' + err.message);
        }
        
    }

} //done

function confirmNewSale() {

    var json = "{\"customer_key\" : \"" + $('#InputNewSaleCustomerIDModal').val() +"\" ," +
        "\"product_name\" : \"" + $('#InputNewSaleProductNameModal').val() +"\" ," +
        "\"price\" : \"" + $('#InputNewSalePriceModal').val() +"\" ," +
        "\"total_paid\" : \"" + $('#InputNewSalePaidModal').val() + "\" ," +
        "\"saleDate\" : \"" + $('#InputNewSaleDateModal').val() + "\" ," +
        "\"paymentDay\" : \"" + $('#InputNewSalePaymentDateModal').val() + "\" ," +
        "\"paymentType\" : \"" + $('#InputPaymentTypeModal').val() + "\" ," +
        "\"monthlyPaid\" : " + $('#InputNewSaleMonthlyPaidModal').val() +" ," +
        "\"notes\" : \"" + $('#InputNewSaleNotesModal').val() +"\"}";

    $.ajax({
        type: "POST",
        url: serviceLink + "/addNewSale",
        async: false,
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({ json: json }),

        success: function (data) {

            if(data.d === "customer unavailable")
            {
                alert("كود العميل الذى تم إدخاله غير صحيح !");
            }
            else if (data.d === "databaseError")
            {
                alert("خطأ فى قاعدة البيانات");
            }
            else if (data.d === "write in database error")
            {
                alert("خطأ فى عملية الإدخال فى قاعدة البيانات");
            }
            else if (data.d === "multiple insertions")
            {
                alert("تم إدخال عملية البيع أكثر من مرة");
            }
            else if (data.d === "inserted")
            {
                alert("تم إضافة عملية البيع بنجاح");
                $('#newSaleModal').modal('toggle');

                $('#InputNewSaleCustomerID').val('');
                $('#InputNewSaleCustomerName').val('');
                $('#InputNewSaleProductName').val('');
                $('#InputNewSalePrice').val('');
                $('#InputNewSalePaid').val('');
                $('#InputNewSaleDate').val('');
                $('#InputNewSalePaymentDate').val('');
                $('#InputNewSaleMonthlyPaid').val('');
                $('#InputNewSaleNotes').val('');
                
            }

        },
        error: function (er) {
            alert('error:' + JSON.stringify(er));
        }
    });
} //done


/*View Loans functions*/
function getAllCustomersNames() //3aaaaaaaaaaaaaaa4
{
    var queryString = "select * from Customers;";

    $.ajax({
        type: "POST",
        url: serviceLink + "/getAllCustomers",
        async: false,
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({ queryString: queryString }),

        success: function (data) {

            if (data.d === "databaseError") {
                alert("خطأ فى قاعدة البيانات");
            }
            else if (data.d === "customers unavailable") {
                alert("لا يوجد عملاء فى الموقع");;
            }
            else {
                openViewLoans(data.d);
            }

        },
        error: function (er) {
            alert('error:' + JSON.stringify(er));
        }
    });
} //done

function getCustomerBills(customerID) {
    var queryString = "select * from Sales where Sales.customer_key = " + customerID + " order by saleDate ";

    var ajaxResponse;

    $.ajax({
        type: "POST",
        url: serviceLink + "/getCustomerBills",
        async: false,
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({ queryString: queryString }),

        success: function (data) {

            if (data.d === "databaseError") {
                alert("خطأ فى قاعدة البيانات");
            }
            else if (data.d === "no bills") {
                alert("لا يوجد أى عمليات بيع لهذا العميل");
                $('#getCustomerLoanArea').html('');
                $('#viewBillDetailsArea').html('');
            }
            else {
                ajaxResponse = data.d;
            }

        },
        error: function (er) {
            alert('error:' + JSON.stringify(er));
        }
    });
    return ajaxResponse;
} //done

function getBillDetails(billID) {
    var queryString = "select * from sales_detailed where sale_key = " + billID;

    var ajaxResponse;

    $.ajax({
        type: "POST",
        url: serviceLink + "/getCustomerBillDetails",
        async: false,
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({ queryString: queryString }),

        success: function (data) {

            if (data.d === "databaseError") {
                alert("خطأ فى قاعدة البيانات");
            }
            else {
                ajaxResponse = data.d;
            }

        },
        error: function (er) {
            alert('error:' + JSON.stringify(er));
        }
    });
    return ajaxResponse;
} //done

function deleteBill(billID, selectedCustomerID)
{
    if (confirm("هل تريد حذف هذه الفاتورة ؟")) {

        $.ajax({
            type: "POST",
            url: serviceLink + "/deleteBill",
            async: false,
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({ billID: billID }),

            success: function (data) {

                if (data.d === "databaseError") {
                    alert("خطأ فى قاعدة البيانات");
                }
                else if (data.d === "deleted") {
                    alert('تم حذف الفاتورة بنجاح');
                    getCustomerLoan(selectedCustomerID);
                    $('#viewBillDetailsArea').html('');
                }
                else {
                    alert("خطأ فى قاعدة البيانات");
                }

            },
            error: function (er) {
                alert('error:' + JSON.stringify(er));
            }
        });
    }
    else {
        //do nothing
    }
} //done

function deleteBillDetail(billDetailID, billKey, price) {
    if (confirm("هل تريد حذف هذه العملية ؟")) {

        $.ajax({
            type: "POST",
            url: serviceLink + "/deleteBillDetail",
            async: false,
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({ billDetailID: billDetailID }),

            success: function (data) {

                if (data.d === "databaseError") {
                    alert("خطأ فى قاعدة البيانات");
                }
                else if (data.d === "deleted") {
                    alert('تم حذف العملية بنجاح');
                    viewBillDetails(billKey, price);
                }
                else {
                    alert("خطأ فى قاعدة البيانات");
                }

            },
            error: function (er) {
                alert('error:' + JSON.stringify(er));
            }
        });
    }
    else {
        //do nothing
    }
} //done    

function addCashToPaid(billKey, customerID) {

    if (isEmpty($('#receivedCashInput').val())) {
        alert("قم بإدخال قيمة المبلغ أولاً");
    }
    else if (isEmpty($('#receivedCashDate').val()) || $('#receivedCashDate').val() == undefined) {
        alert("قم بإدخال تاريخ اعملية أولاً");
    }
    else {

        var money = $('#receivedCashInput').val();
        
        var date = new Date($('#receivedCashDate').val());
        day = date.getDate();
        month = date.getMonth() + 1;
        year = date.getFullYear();
        var receivedCashDate = [day, month, year].join('/');

        $.ajax({
            type: "POST",
            url: serviceLink + "/addCash",
            async: false,
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({ billKey: billKey, money: money, receivedCashDate: receivedCashDate }),

            success: function (data) {

                if (data.d === "databaseError") {
                    alert("خطأ فى قاعدة البيانات");
                }
                else if (data.d === "added") {
                    alert('تم إضافة المبلغ بنجاح');

                    $('#saleEditModal').modal('toggle');

                    getCustomerLoan(customerID);

                    $('#viewBillDetailsArea').html('');
                }
                else {
                    alert("خطأ فى قاعدة البيانات");
                }

            },
            error: function (er) {
                alert('error:' + JSON.stringify(er));
            }
        });

    }

} //done


/*Money Head and loggedCounter functions*/
function getMoneyHeadAndLoggedCounter()
{

    var jsnResponse;

    $.ajax({
        type: "POST",
        url: serviceLink + "/getMoneyHeadAndLoggedCounter",
        async: false,
        dataType: "json",
        contentType: "application/json",

        success: function (data) {

            if (data.d === "databaseError") {
                alert("خطأ فى قاعدة البيانات");
            }
            else {

                jsnResponse = data.d;

            }

        },
        error: function (er) {
            alert('error:' + JSON.stringify(er));
        }
    });

    return jsnResponse;

} //done

function getMonthlyMoneHead()
{
    var jsnResponse;

    $.ajax({
        type: "POST",
        url: serviceLink + "/getMonthlyMoneHead",
        async: false,
        dataType: "json",
        contentType: "application/json",

        success: function (data) {

            if (data.d === "databaseError") {
                alert("خطأ فى قاعدة البيانات");
            }
            else {

                jsnResponse = data.d;

            }

        },
        error: function (er) {
            alert('error:' + JSON.stringify(er));
        }
    });

    openMonthlyMoneHeadModal(jsnResponse);
}



/*MonthRate functions*/
function getMonthRate()
{

    var jsnResponse;

    $.ajax({
        type: "POST",
        url: serviceLink + "/getMonthRate",
        async: false,
        dataType: "json",
        contentType: "application/json",

        success: function (data) {

            if (data.d === "databaseError") {
                alert("خطأ فى قاعدة البيانات");
            }
            else {

                jsnResponse = data.d;

            }

        },
        error: function (er) {
            alert('error:' + JSON.stringify(er));
        }
    });

    return jsnResponse;

} //done


/*Inquiry functions*/
function getInquiryData()
{
    var jsnResponse;

    $.ajax({
        type: "POST",
        url: serviceLink + "/getInquiryData",
        async: false,
        dataType: "json",
        contentType: "application/json",

        success: function (data) {

            if (data.d === "databaseError") {
                alert("خطأ فى قاعدة البيانات");
            }
            else {

                jsnResponse = data.d;

            }

        },
        error: function (er) {
            alert('error:' + JSON.stringify(er));
        }
    });

    return jsnResponse;
} //done



/*Latency notes Tab*/
function getAllLateCustomersNames() //3aaaaaaaaaaaaaaa4
{
    var queryString = "select * from Customers;";

    $.ajax({
        type: "POST",
        url: serviceLink + "/getAllCustomers",
        async: false,
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({ queryString: queryString }),

        success: function (data) {

            if (data.d === "databaseError") {
                alert("خطأ فى قاعدة البيانات");
            }
            else if (data.d === "customers unavailable") {
                alert("لا يوجد عملاء فى الموقع");;
            }
            else {
                openlatencyNotes(data.d);
            }

        },
        error: function (er) {
            alert('error:' + JSON.stringify(er));
        }
    });
} //done

function getLatencyNotes() {

    var jsnResponse;

    $.ajax({
        type: "POST",
        url: serviceLink + "/getLatencyNotes",
        async: false,
        dataType: "json",
        contentType: "application/json",

        success: function (data) {

            if (data.d === "databaseError") {
                alert("خطأ فى قاعدة البيانات");
            }
            else if (data.d === "notes unavailable")
            {
                jsnResponse = "";
            }
            else {

                jsnResponse = data.d;

            }

        },
        error: function (er) {
            alert('error:' + JSON.stringify(er));
        }
    });

    return jsnResponse;
}

function deleteLatencyNote(latencyNoteKey) {

    if (confirm("هل تريد حذف هذه الملاحظة ؟")) {

        $.ajax({
            type: "POST",
            url: serviceLink + "/deleteLatencyNote",
            async: false,
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({ latencyNoteKey: latencyNoteKey }),

            success: function (data) {

                if (data.d === "databaseError") {
                    alert("خطأ فى قاعدة البيانات");
                }
                else if (data.d === "deleted") {
                    alert('تم حذف الملاحظة بنجاح');
                    getAllLateCustomersNames();
                }
                else {
                    alert("خطأ فى قاعدة البيانات");
                }

            },
            error: function (er) {
                alert('error:' + JSON.stringify(er));
            }
        });
    }
    else {
        //do nothing
    }
}

function addLatencyNote() {

    var selectedCustomerID = $('#customerSelect').find(":selected").val();

    var latencyNoteText = $('#noteArea').val();

    if (isEmpty(latencyNoteText)) {
        alert('قم بإدخال ملاحظاتك أولاً');
    }
    else {

        var json = "{\"key\" : \"" + selectedCustomerID + "\" , \"note\" : \"" + latencyNoteText + "\"}";

        $.ajax({
            type: "POST",
            url: serviceLink + "/addNewlatencyNote",
            async: false,
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({ json: json }),

            success: function (data) {
                if (data.d === "inserted") {

                    alert("تم إضافة الملاحظة بنجاح");
                    getAllLateCustomersNames();

                }
                else {
                    alert('error:' + data.d);
                }
            },
            error: function (er) {
                alert('error:' + JSON.stringify(er));
            }
        });
    }

}


/*USER PAGE*/
//Get bought items by customer

function getLoginCounter()
{
    //get the counter of loggedPeople
    $.ajax({
        type: "POST",
        url: serviceLink + "/getLoginCounter",
        async: false,

        success: function (data) {

            return data.d;

        },
        error: function (er) {
            alert('error:' + JSON.stringify(er));
        }
    });
}

function getBoughtByCustomer(custID) {
    var queryString = "select product_name, price, paymentDay, lastPaymentDate, monthlyPaid, total_paid from Sales where Sales.customer_key = " + custID;

    var jsnResponse;

    $.ajax({
        type: "POST",
        url: serviceLink + "/getOrederedItems",
        async: false,
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({ queryString: queryString }),

        success: function (data) {

            if (data.d === "databaseError") {
                alert("خطأ فى قاعدة البيانات");
            }
            else {
                jsnResponse = data.d;
            }

        },
        error: function (er) {
            alert('error:' + JSON.stringify(er));
        }
    });

    return jsnResponse;

}









