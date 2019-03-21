using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Web.Configuration;
using System.Web.Script.Serialization;
using System.Web.Services;

namespace Ta2seetProject
{

    /// <summary>
    /// Summary description for Ta2seetService
    /// </summary>
    [WebService(Namespace = "http://www.moussa-store.somee.com/moussastore/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    [System.Web.Script.Services.ScriptService]
    public class Ta2seetService : System.Web.Services.WebService
    {

        //Struct to get the number of months between 2 dates
        private struct DateTimeSpan
        {
            private readonly int years;
            private readonly int months;
            private readonly int days;
            private readonly int hours;
            private readonly int minutes;
            private readonly int seconds;
            private readonly int milliseconds;

            public DateTimeSpan(int years, int months, int days, int hours, int minutes, int seconds, int milliseconds)
            {
                this.years = years;
                this.months = months;
                this.days = days;
                this.hours = hours;
                this.minutes = minutes;
                this.seconds = seconds;
                this.milliseconds = milliseconds;
            }

            public int Years { get { return years; } }
            public int Months { get { return months; } }
            public int Days { get { return days; } }
            public int Hours { get { return hours; } }
            public int Minutes { get { return minutes; } }
            public int Seconds { get { return seconds; } }
            public int Milliseconds { get { return milliseconds; } }

            enum Phase { Years, Months, Days, Done }

            public static DateTimeSpan CompareDates(DateTime date1, DateTime date2)
            {
                if (date2 < date1)
                {
                    var sub = date1;
                    date1 = date2;
                    date2 = sub;
                }

                DateTime current = date1;
                int years = 0;
                int months = 0;
                int days = 0;

                Phase phase = Phase.Years;
                DateTimeSpan span = new DateTimeSpan();
                int officialDay = current.Day;

                while (phase != Phase.Done)
                {
                    switch (phase)
                    {
                        case Phase.Years:
                            if (current.AddYears(years + 1) > date2)
                            {
                                phase = Phase.Months;
                                current = current.AddYears(years);
                            }
                            else
                            {
                                years++;
                            }
                            break;
                        case Phase.Months:
                            if (current.AddMonths(months + 1) > date2)
                            {
                                phase = Phase.Days;
                                current = current.AddMonths(months);
                                if (current.Day < officialDay && officialDay <= DateTime.DaysInMonth(current.Year, current.Month))
                                    current = current.AddDays(officialDay - current.Day);
                            }
                            else
                            {
                                months++;
                            }
                            break;
                        case Phase.Days:
                            if (current.AddDays(days + 1) > date2)
                            {
                                current = current.AddDays(days);
                                var timespan = date2 - current;
                                span = new DateTimeSpan(years, months, days, timespan.Hours, timespan.Minutes, timespan.Seconds, timespan.Milliseconds);
                                phase = Phase.Done;
                            }
                            else
                            {
                                days++;
                            }
                            break;
                    }
                }

                return span;
            }
        }

        private static string ConnectionString = WebConfigurationManager.ConnectionStrings["Ta2seetDB"].ConnectionString;

        #region Methods for inserting and selecting from database

        internal static DataSet executeQuery(string sqlQuery)
        {
            using (SqlConnection conn = new SqlConnection())
            {
                conn.ConnectionString = ConnectionString;
                SqlCommand command = new SqlCommand(sqlQuery, conn);
                conn.Open();

                DataSet ds = new DataSet();
                SqlDataAdapter adp = new SqlDataAdapter(command);
                adp.Fill(ds);
                conn.Dispose();

                return ds;
            }
        }

        internal static int executeNonQuery(string sqlQuery)
        {
            using (SqlConnection conn = new SqlConnection())
            {
                conn.ConnectionString = ConnectionString;
                SqlCommand command = new SqlCommand(sqlQuery, conn);
                conn.Open();
                int flag = command.ExecuteNonQuery();
                conn.Dispose();
                return flag;
            }
        }

        #endregion


        #region Methods for login
        [WebMethod]
        public String verifyUserLogin(string jsonData)
        {
            try
            {
                var parsed = JsonConvert.DeserializeObject<jsnUserVerifyLoginMail>(jsonData);

                DataSet ds = new DataSet();

                ds = executeQuery("select * from Customers where Customers.[key]='"+ parsed.username +"' and Customers.password='"+ parsed.password +"'");

                if (ds.Tables[0].Rows.Count == 0)
                {
                    DataSet ds2 = executeQuery("select * from Customers where Customers.[key]='" + parsed.username +"'");

                    if (ds2.Tables[0].Rows.Count == 0)
                    {
                        return "wrong customer ID";
                    }
                    else if (ds2.Tables[0].Rows.Count == 1)
                    {
                        return "wrong password";
                    }
                    else
                    {
                        return "databaseError";
                    }
                }
                else if (ds.Tables[0].Rows.Count == 1)
                {
                    return ds.Tables[0].Rows[0][0].ToString();
                }
                else
                {
                    return "databaseError";
                }

            }
            catch (Exception e)
            {
                return e.Message.ToString();
            }
        }

        [WebMethod]
        public String verifyAdminLogin(string jsonData)
        {

            checkMonthlyMoneyHead();

            try
            {
                var parsed = JsonConvert.DeserializeObject<jsnUserVerifyLoginMail>(jsonData);

                DataSet ds = new DataSet();

                ds = executeQuery("select * from Admins where Admins.username='" + parsed.username + "' and Admins.password='" + parsed.password + "'");

                if (ds.Tables[0].Rows.Count == 0)
                {
                    DataSet ds2 = executeQuery("select * from Admins where Admins.username='" + parsed.username + "'");

                    if (ds2.Tables[0].Rows.Count == 0)
                    {
                        return "wrong username";
                    }
                    else if (ds2.Tables[0].Rows.Count == 1)
                    {
                        return "wrong password";
                    }
                    else
                    {
                        return "databaseError";
                    }
                }
                else if (ds.Tables[0].Rows.Count == 1)
                {
                    
                    return ds.Tables[0].Rows[0][0].ToString();
                }
                else
                {
                    return "databaseError";
                }

            }
            catch (Exception e)
            {
                Context.Response.Write(e.Message.ToString());
                return e.Message.ToString();
            }
        }
        
        [WebMethod]
        public void addLoginCounter()
        {
            try
            {
                DataSet ds = new DataSet();

                ds = executeQuery("select * from loggedCounter");

                if (ds.Tables[0].Rows.Count == 1)
                {

                    int counter = Int32.Parse(ds.Tables[0].Rows[0][1].ToString());
                    counter++;

                    executeNonQuery("update loggedCounter set count = "+ counter +" where [key] = 1");
                    
                }

            }
            catch (Exception e)
            {
                Context.Response.Write(e.Message.ToString());
            }
        }

        [WebMethod]
        public String getLoginCounter()
        {
            try
            {
                DataSet ds = new DataSet();

                ds = executeQuery("select * from loggedCounter");

                if (ds.Tables[0].Rows.Count == 1)
                {

                    int counter = Int32.Parse(ds.Tables[0].Rows[0][1].ToString());

                    return counter.ToString();

                }
                else
                {
                    return "error";
                }
            }
            catch (Exception e)
            {
                return e.Message.ToString();
            }
        }
        #endregion

        //Admin Page

        # region Add admin tab
        [WebMethod]
        public String addNewAdmin(string json)
        {
            try
            {
                var parsed = JsonConvert.DeserializeObject<jsnAdminData>(json);

                DataSet ds = new DataSet();

                ds = executeQuery("select *  from Admins where Admins.username = '"+ parsed.username +"';");

                if (ds.Tables[0].Rows.Count == 0)
                {
                    int flag = executeNonQuery("insert into Admins (name, username, [password]) values ('" + parsed.name + "','"+ parsed.username + "','" + parsed.password + "');");
                    
                    if(flag == 1)
                    {
                        return "inserted";
                    }
                    else if (flag == 0)
                    {
                        return "write in database error";
                    }
                    else if(flag > 1)
                    {
                        return "multiple insertions";
                    }   
                    else
                    {
                        return "databaseError";
                    }
                    
                }
                else if (ds.Tables[0].Rows.Count == 1)
                {
                    return"username available";
                }
                else
                {
                    return "databaseError";
                }

            }
            catch (Exception e)
            {
                return e.Message.ToString();
            }
        } //done
        #endregion


        # region Add customer tab
        [WebMethod]
        public String addNewCustomer(string json)
        {
            try
            {
                var parsed = JsonConvert.DeserializeObject<jsnCustomerData>(json);

                DataSet ds = new DataSet();

                ds = executeQuery("select *  from Customers where id_num = " + parsed.id_num );

                if (ds.Tables[0].Rows.Count == 0)
                {
                    int flag = executeNonQuery("insert into Customers (name, id_num, [address], phone1, phone2, landLine, guarantee_1, g_id_1, g_address_1, g_phone_1, guarantee_2, g_id_2, g_address_2, g_phone_2, [password]) values ('" + parsed.name + "'," + parsed.id_num + ", '" + parsed.address + "', '" + parsed.phone1 + "', '" + parsed.phone2 + "', '" + parsed.landLine + "', '" + parsed.guarantee1 + "', '" + parsed.g_id_1 + "', '" + parsed.g_address_1 + "', '" + parsed.g_phone_1 + "', '" + parsed.guarantee2 + "', '" + parsed.g_id_2 + "', '" + parsed.g_address_2 + "', '" + parsed.g_phone_2 + "', '" + parsed.id_num + "');");

                    if (flag == 1)
                    {
                        return "inserted";
                    }
                    else if (flag == 0)
                    {
                        return "write in database error";
                    }
                    else if (flag > 1)
                    {
                        return "multiple insertions";
                    }
                    else
                    {
                        return "databaseError";
                    }

                }
                else if (ds.Tables[0].Rows.Count == 1)
                {
                    return "id number available";
                }
                else
                {
                    return "databaseError";
                }

            }
            catch (Exception e)
            {
                return e.Message.ToString();
            }
        } //done


        [WebMethod]
        public String getCustomerID(string queryString)
        {
            try
            {

                DataSet ds = new DataSet();

                ds = executeQuery(queryString);

                if (ds.Tables[0].Rows.Count == 1)
                {

                    return "done" + ds.Tables[0].Rows[0][0].ToString();

                }
                else if (ds.Tables[0].Rows.Count > 1)
                {
                    return "multiple users";

                }
                else if (ds.Tables[0].Rows.Count == 0)
                {
                    return "id number available";

                }
                else
                {
                    return "databaseError";
                }

            }
            catch (Exception e)
            {
                return e.Message.ToString();
            }

        } //done


        [WebMethod]
        public String getAllCustomers(string queryString)
        {
            try
            {

                DataSet ds = new DataSet();

                ds = executeQuery(queryString);

                if (ds.Tables[0].Rows.Count != 0)
                {

                    jsnCustomerData cust;
                    List<jsnCustomerData> lstCustomers = new List<jsnCustomerData>();

                    int count = ds.Tables[0].Rows.Count;

                    for (int i = 0; i < count; i++)
                    {
                        cust = new jsnCustomerData();

                        cust.key = ds.Tables[0].Rows[i][0].ToString();
                        cust.name = ds.Tables[0].Rows[i][1].ToString();
                        cust.id_num = ds.Tables[0].Rows[i][2].ToString();
                        cust.address = ds.Tables[0].Rows[i][3].ToString();
                        cust.phone1 = ds.Tables[0].Rows[i][4].ToString();
                        cust.phone2 = ds.Tables[0].Rows[i][5].ToString();
                        cust.landLine = ds.Tables[0].Rows[i][6].ToString();
                        cust.guarantee1 = ds.Tables[0].Rows[i][7].ToString();
                        cust.g_id_1 = ds.Tables[0].Rows[i][8].ToString();
                        cust.g_address_1 = ds.Tables[0].Rows[i][9].ToString();
                        cust.g_phone_1 = ds.Tables[0].Rows[i][10].ToString();
                        cust.guarantee2 = ds.Tables[0].Rows[i][11].ToString();
                        cust.g_id_2 = ds.Tables[0].Rows[i][12].ToString();
                        cust.g_address_2 = ds.Tables[0].Rows[i][13].ToString();
                        cust.g_phone_2 = ds.Tables[0].Rows[i][14].ToString();
                        cust.password = ds.Tables[0].Rows[i][15].ToString();

                        lstCustomers.Add(cust);
                    }


                    JavaScriptSerializer js = new JavaScriptSerializer();

                    string json = js.Serialize(lstCustomers);

                    return json;

                }
                else if (ds.Tables[0].Rows.Count == 0)
                {
                    return "customers unavailable";

                }
                else
                {
                    return "databaseError";
                }

            }
            catch (Exception e)
            {
                return e.Message.ToString();
            }
        }  //done


        [WebMethod]
        public String updateCustomerData(string queryString)
        {
            try
            {

                int flag = executeNonQuery(queryString);

                if (flag == 1)
                {

                    return "updated";

                }
                else if (flag != 1)
                {
                    return "customer unavailable";

                }
                else
                {
                    return "databaseError";
                }

            }
            catch (Exception e)
            {
                return e.Message.ToString();
            }
        } //done


        [WebMethod]
        public String getOneCustomerData(string queryString)
        {
            try
            {

                DataSet ds = new DataSet();

                ds = executeQuery(queryString);

                if (ds.Tables[0].Rows.Count == 1)
                {

                    jsnCustomerData cust = new jsnCustomerData();

                    cust.key = ds.Tables[0].Rows[0][0].ToString();
                    cust.name = ds.Tables[0].Rows[0][1].ToString();
                    cust.id_num = ds.Tables[0].Rows[0][2].ToString();
                    cust.address = ds.Tables[0].Rows[0][3].ToString();
                    cust.phone1 = ds.Tables[0].Rows[0][4].ToString();
                    cust.phone2 = ds.Tables[0].Rows[0][5].ToString();
                    cust.landLine = ds.Tables[0].Rows[0][6].ToString();
                    cust.guarantee1 = ds.Tables[0].Rows[0][7].ToString();
                    cust.g_id_1 = ds.Tables[0].Rows[0][8].ToString();
                    cust.g_address_1 = ds.Tables[0].Rows[0][9].ToString();
                    cust.g_phone_1 = ds.Tables[0].Rows[0][10].ToString();
                    cust.guarantee2 = ds.Tables[0].Rows[0][11].ToString();
                    cust.g_id_2 = ds.Tables[0].Rows[0][12].ToString();
                    cust.g_address_2 = ds.Tables[0].Rows[0][13].ToString();
                    cust.g_phone_2 = ds.Tables[0].Rows[0][14].ToString();
                    cust.password = ds.Tables[0].Rows[0][15].ToString();

                    JavaScriptSerializer js = new JavaScriptSerializer();

                    string json = js.Serialize(cust);

                    return json;

                }
                else if (ds.Tables[0].Rows.Count == 0)
                {
                    return "customer unavailable";

                }
                else if (ds.Tables[0].Rows.Count > 1)
                {
                    return "multiple customers key error";
                }
                else
                {
                    return "databaseError";
                }

            }
            catch (Exception e)
            {
                return e.Message.ToString();
            }
        } //done


        [WebMethod]
        public String deleteCustomer(string queryString)
        {
            try
            {
                int flag = executeNonQuery(queryString);

                if (flag == 1)
                {
                    return "deleted";
                }
                else
                {
                    return "databaseError";
                }

            }
            catch (Exception e)
            {
                return e.Message.ToString();
            }
        } //done
        #endregion


        # region View all admins tab
        [WebMethod]
        public String getAllAdmins(string queryString)
        {
            try
            {

                DataSet ds = new DataSet();

                ds = executeQuery(queryString);

                if (ds.Tables[0].Rows.Count != 0)
                {

                    jsnAdminData admin;
                    List<jsnAdminData> lstAdmins = new List<jsnAdminData>();

                    int count = ds.Tables[0].Rows.Count;

                    for (int i = 0; i < count; i++)
                    {
                        admin = new jsnAdminData();

                        admin.key = ds.Tables[0].Rows[i][0].ToString();
                        admin.name = ds.Tables[0].Rows[i][1].ToString();
                        admin.username = ds.Tables[0].Rows[i][2].ToString();
                        admin.password = ds.Tables[0].Rows[i][3].ToString();

                        lstAdmins.Add(admin);
                    }


                    JavaScriptSerializer js = new JavaScriptSerializer();

                    string json = js.Serialize(lstAdmins);

                    return json;

                }
                else if (ds.Tables[0].Rows.Count == 0)
                {
                    return "admins unavailable";

                }
                else
                {
                    return "databaseError";
                }

            }
            catch (Exception e)
            {
                return e.Message.ToString();
            }
        } //done


        [WebMethod]
        public String getOneAdminData(string queryString)
        {
            try
            {

                DataSet ds = new DataSet();

                ds = executeQuery(queryString);

                if (ds.Tables[0].Rows.Count == 1)
                {

                    jsnAdminData admin = new jsnAdminData();

                    admin.key = ds.Tables[0].Rows[0][0].ToString();
                    admin.name = ds.Tables[0].Rows[0][1].ToString();
                    admin.username = ds.Tables[0].Rows[0][2].ToString();
                    admin.password = ds.Tables[0].Rows[0][3].ToString();

                    JavaScriptSerializer js = new JavaScriptSerializer();

                    string json = js.Serialize(admin);

                    return json;

                }
                else if (ds.Tables[0].Rows.Count > 1)
                {
                    return "multiple admins";

                }
                else if (ds.Tables[0].Rows.Count == 0)
                {
                    return "admin unavailable";

                }
                else
                {
                    return "databaseError";
                }

            }
            catch (Exception e)
            {
                return e.Message.ToString();
            }
        } //done


        [WebMethod]
        public String updateAdminData(string queryString)
        {
            try
            {

                int flag = executeNonQuery(queryString);

                if (flag == 1)
                {

                    return "updated";

                }
                else if (flag != 1)
                {
                    return "admin unavailable";

                }
                else
                {
                    return "databaseError";
                }

            }
            catch (Exception e)
            {
                return e.Message.ToString();
            }
        } //done


        [WebMethod]
        public String deleteAdmin(string queryString)
        {
            try
            {

                DataSet ds = new DataSet();

                ds = executeQuery("select * from Admins");

                int count = ds.Tables[0].Rows.Count;

                if (count > 1)
                {
                    int flag = executeNonQuery(queryString);

                    if (flag == 1)
                    {
                        return "deleted";
                    }
                    else
                    {
                        return "databaseError";
                    }
                }
                else if (count == 1)
                {
                    return "one admin";
                }
                else if (count == 0)
                {
                    return "no admins";
                }
                else
                {
                    return "databaseError";
                }

            }
            catch (Exception e)
            {
                return e.Message.ToString();
            }
        } //done
        #endregion


        # region Search all customers tab
        [WebMethod]
        public String searchCustomer(string queryString)
        {
            try
            {

                DataSet ds = new DataSet();

                ds = executeQuery(queryString);

                if (ds.Tables[0].Rows.Count > 0)
                {

                    jsnCustomerData cust;
                    List<jsnCustomerData> custList = new List<jsnCustomerData>();

                    int count = ds.Tables[0].Rows.Count;

                    for (int i = 0; i < count; i++)
                    {

                        cust = new jsnCustomerData();

                        cust.key = ds.Tables[0].Rows[i][0].ToString();
                        cust.name = ds.Tables[0].Rows[i][1].ToString();
                        cust.id_num = ds.Tables[0].Rows[i][2].ToString();
                        cust.phone1 = ds.Tables[0].Rows[i][4].ToString();

                        custList.Add(cust);
                    }

                    JavaScriptSerializer js = new JavaScriptSerializer();

                    string json = js.Serialize(custList);

                    return json;

                }
                else if (ds.Tables[0].Rows.Count == 0)
                {
                    return "customer unavailable";
                }
                else
                {
                    return "databaseError";
                }

            }
            catch (Exception e)
            {
                return e.Message.ToString();
            }
        } //done


        [WebMethod]
        public String getCustomerName(string queryString)
        {
            try
            {

                DataSet ds = new DataSet();

                ds = executeQuery(queryString);

                if (ds.Tables[0].Rows.Count == 1)
                {

                    return ds.Tables[0].Rows[0][0].ToString();

                }
                else if (ds.Tables[0].Rows.Count > 1)
                {
                    return "multiple users";
                }
                else if (ds.Tables[0].Rows.Count == 0)
                {
                    return "key unavailable";

                }
                else
                {
                    return "databaseError";
                }

            }
            catch (Exception e)
            {
                return e.Message.ToString();
            }

        } //done
        #endregion

        
        #region Add new sale tab
        [WebMethod]
        public String addNewSale(string json)
        {
            try
            {
                var parsed = JsonConvert.DeserializeObject<jsnSaleData>(json);

                DataSet ds = new DataSet();

                ds = executeQuery("select * from Customers where Customers.[key] = "+ parsed.customer_key+";");

                if (ds.Tables[0].Rows.Count == 1)
    
                {
                    string currentPaymentDate = parsed.saleDate;
                    int paymentDay = Int32.Parse(parsed.paymentDay);
                    int currentDay = Int32.Parse(currentPaymentDate.Split('/')[0].ToString());
                    int currentMonth = Int32.Parse(currentPaymentDate.Split('/')[1].ToString());
                    int currentYear = Int32.Parse(currentPaymentDate.Split('/')[2].ToString());

                    string nextPaymentDate = "";

                    if (currentMonth == 12)
                        nextPaymentDate = "" + paymentDay + "/" + 1 + "/" + (currentYear + 1);
                    else
                        nextPaymentDate = "" + paymentDay + "/" + (currentMonth + 1) + "/" + currentYear;


                    int flag = executeNonQuery("insert into Sales (customer_key, product_name, price, saleDate, paymentDay, lastPaymentDate, nextPaymentDate,monthlyPaid,paymentType, total_paid, notes, Mo2adam) " +
                        "values ( " + parsed.customer_key + " , '" + parsed.product_name + "' , '" + parsed.price + "' , '" + currentPaymentDate + "' , '" + paymentDay + "' , '" + currentPaymentDate + "' , '" + nextPaymentDate + "' , '" + parsed.monthlyPaid + "' , '" + parsed.paymentType + "' , '" + parsed.total_paid + "' , '" + parsed.notes + "', '" + parsed.total_paid + "' )");

                    if (flag == 1)
                    {
                        DataSet ds2 = new DataSet();
                        ds2 = executeQuery("select top 1 Sales.[key] from Sales order by Sales.[key] DESC;");
                        int sale_key = Int32.Parse(ds2.Tables[0].Rows[0][0].ToString());

                        int flag2 = executeNonQuery("insert into Sales_Detailed (sale_key, amount_paid, paymentDate) values ('"+ sale_key +"', '"+parsed.total_paid+"', '"+ currentPaymentDate + "');");

                        if(flag2 == 1)
                        {
                            return "inserted";
                        }
                        else if (flag2 == 0)
                        {
                            return "write in database error";
                        }
                        else if (flag2 > 1)
                        {
                            return "multiple insertions";
                        }
                        else
                        {
                            return "databaseError";
                        }
                        
                    }
                    else if (flag == 0)
                    {
                        return "write in database error";
                    }
                    else if (flag > 1)
                    {
                        return "multiple insertions";
                    }
                    else
                    {
                        return "databaseError";
                    }

                }
                else if (ds.Tables[0].Rows.Count == 0)
                {
                    return "customer unavailable";
                }
                else
                {
                    return "databaseError";
                }

            }
            catch (Exception e)
            {
                return e.Message.ToString();
            }
        } //done
        #endregion


        # region Loans tab (A2saaat)
        [WebMethod]
        public String getCustomerBills(string queryString)
        {
            try
            {

                DataSet ds = new DataSet();

                ds = executeQuery(queryString);

                if (ds.Tables[0].Rows.Count == 0)
                {
                    return "no bills";
                }
                else if (ds.Tables[0].Rows.Count > 0)
                {
                    jsnSaleData sale;
                    List<jsnSaleData> salesList = new List<jsnSaleData>();

                    int count = ds.Tables[0].Rows.Count;

                    for (int i = 0; i < count; i++)
                    {

                        sale = new jsnSaleData();

                        sale.key = ds.Tables[0].Rows[i][0].ToString();
                        sale.customer_key = ds.Tables[0].Rows[i][1].ToString();
                        sale.product_name = ds.Tables[0].Rows[i][2].ToString();
                        sale.price = ds.Tables[0].Rows[i][3].ToString();
                        sale.saleDate = ds.Tables[0].Rows[i][4].ToString();
                        sale.paymentDay = ds.Tables[0].Rows[i][5].ToString();
                        sale.lastPayment = ds.Tables[0].Rows[i][6].ToString();
                        sale.nextPayment = ds.Tables[0].Rows[i][7].ToString();
                        sale.monthlyPaid = ds.Tables[0].Rows[i][8].ToString();
                        sale.paymentType = ds.Tables[0].Rows[i][9].ToString();
                        sale.total_paid = ds.Tables[0].Rows[i][10].ToString();
                        sale.notes = ds.Tables[0].Rows[i][11].ToString();

                        salesList.Add(sale);
                    }

                    JavaScriptSerializer js = new JavaScriptSerializer();

                    string json = js.Serialize(salesList);

                    return json;
                }
                else
                {
                    return "databaseError";
                }

            }
            catch (Exception e)
            {
                return e.Message.ToString();
            }

        } //done


        [WebMethod]
        public String getCustomerBillDetails(string queryString)
        {
            try
            {

                DataSet ds = new DataSet();

                ds = executeQuery(queryString);
                
                if (ds.Tables[0].Rows.Count > 0)
                {
                    jsnSaleDetailsData saleDetails;
                    List<jsnSaleDetailsData> saleDetailsList = new List<jsnSaleDetailsData>();

                    int count = ds.Tables[0].Rows.Count;

                    for (int i = 0; i < count; i++)
                    {

                        saleDetails = new jsnSaleDetailsData();

                        saleDetails.key = ds.Tables[0].Rows[i][0].ToString();
                        saleDetails.amount_paid = ds.Tables[0].Rows[i][2].ToString();
                        saleDetails.paymentDate = ds.Tables[0].Rows[i][3].ToString();

                        saleDetailsList.Add(saleDetails);
                    }

                    JavaScriptSerializer js = new JavaScriptSerializer();

                    string json = js.Serialize(saleDetailsList);

                    return json;
                }
                else
                {
                    return "databaseError";
                }

            }
            catch (Exception e)
            {
                return e.Message.ToString();
            }

        } //done


        [WebMethod]
        public String deleteBill(int billID)
        {
            try
            {

                string queryString = "delete from sales_detailed where sales_detailed.sale_key = " + billID;

                int flag = executeNonQuery(queryString);

                if (flag > 0)
                {

                    string queryString2 = "delete from Sales where Sales.[key] = " + billID;

                    flag = executeNonQuery(queryString2);

                    if (flag == 1)
                    {

                        return "deleted";
                    }
                    else
                    {
                        return "databaseError";
                    }

                }
                else
                {
                    return "databaseError";
                }
               

            }
            catch (Exception e)
            {
                return e.Message.ToString();
            }
        } //done


        [WebMethod]
        public String deleteBillDetail(int billDetailID)
        {
            try
            {

                string queryString = "delete from sales_detailed where sales_detailed.[key] = " + billDetailID;

                int flag = executeNonQuery(queryString);

                if (flag == 1)
                {

                    return "deleted";

                }
                else
                {
                    return "databaseError";
                }


            }
            catch (Exception e)
            {
                return e.Message.ToString();
            }
        } //done


        [WebMethod]
        public String addCash(int billKey, int money, string receivedCashDate)
        {

            string queryString1 = "select * from Sales where Sales.[key] = " + billKey;
            
            DataSet ds = new DataSet();

            ds = executeQuery(queryString1);

            if (ds.Tables[0].Rows.Count == 1)
            {

                //get Old Values

                jsnSaleData sale = new jsnSaleData();

                int count = ds.Tables[0].Rows.Count;

                sale.paymentDay = ds.Tables[0].Rows[0][5].ToString();
                sale.lastPayment = ds.Tables[0].Rows[0][6].ToString();
                sale.nextPayment = ds.Tables[0].Rows[0][7].ToString();
                sale.total_paid = ds.Tables[0].Rows[0][10].ToString();

                //Change to new values
                
                string nextPaymentDate;

                int paymentDay = Int32.Parse(sale.paymentDay);
                int currentMonth = Int32.Parse(receivedCashDate.Split('/')[1].ToString());
                int currentYear = Int32.Parse(receivedCashDate.Split('/')[2].ToString());

                if (currentMonth == 12)
                    nextPaymentDate = "" + paymentDay + "/" + 1 + "/" + (currentYear + 1);
                else
                    nextPaymentDate = "" + paymentDay + "/" + (currentMonth + 1) + "/" + currentYear;

                // Our new values

                sale.total_paid = (Int32.Parse(sale.total_paid) + money) + "";

                string queryString2 = "update Sales set lastPaymentDate = '"+ receivedCashDate + "' , nextPaymentDate = '"+ nextPaymentDate + "' , total_paid = '"+ sale.total_paid + "' where Sales.[key] = " + billKey;

                int flag = executeNonQuery(queryString2);

                if(flag == 1)
                {
                    string queryString3 = "insert into Sales_Detailed values (" + billKey + ", '" + money + "', '" + receivedCashDate + "')";

                    flag = executeNonQuery(queryString3);

                    if (flag == 1)
                    {
                        return "added";
                    }
                    else
                    {
                        return "databaseError";
                    }
                }
                else
                {
                    return "databaseError";
                }

            }
            else
            {
                return "databaseError";
            }

        } //done

        #endregion


        #region MoneyHead and Counter Tab
        [WebMethod]
        public String getMoneyHeadAndLoggedCounter()
        {

            int loggedCounter;
            int moneyHead = 0;

            string queryString1 = "select [count] from loggedCounter";
            string queryString2 = "select price, total_paid from Sales";

            try
            {

                DataSet ds = new DataSet();

                ds = executeQuery(queryString1);

                if (ds.Tables[0].Rows.Count == 1)
                {

                    loggedCounter = Int32.Parse(ds.Tables[0].Rows[0][0].ToString());

                    try
                    {

                        DataSet ds2 = new DataSet();

                        ds2 = executeQuery(queryString2);

                        if (ds2.Tables[0].Rows.Count > 0)
                        {

                            for (int i = 0; i < ds2.Tables[0].Rows.Count; i++)
                            {
                                moneyHead += (Int32.Parse(ds2.Tables[0].Rows[i][0].ToString()) - Int32.Parse(ds2.Tables[0].Rows[i][1].ToString()));
                            }

                        }
                        else if (ds2.Tables[0].Rows.Count == 0)
                        {
                            moneyHead = 0;
                        }
                        else
                        {
                            return "databaseError";
                        }

                    }
                    catch (Exception e)
                    {
                        return e.Message.ToString();
                    }

                }
                else
                {
                    return "databaseError";
                }

            }
            catch (Exception e)
            {
                return e.Message.ToString();
            }

            string jsonResponse = "{\"moneyHead\": \"" + moneyHead + "\", \"loggedCounter\":\"" + loggedCounter + "\"}";

            return jsonResponse;

        } //done


        [WebMethod]
        public String getMonthlyMoneHead()
        {

            string response = "";

            DataSet ds = new DataSet();

            ds = executeQuery("select top 5 * from monthlyMoneyHead order by [key] desc");

            if (ds.Tables[0].Rows.Count > 0)
            {

                jsnMonthlyMoneyHead objMoneyHead;
                List<jsnMonthlyMoneyHead> lstMoneyHeads = new List<jsnMonthlyMoneyHead>();

                for (int i = ((ds.Tables[0].Rows.Count) - 1); i >= 0; i--)
                {
                    objMoneyHead = new jsnMonthlyMoneyHead();

                    objMoneyHead.date = ds.Tables[0].Rows[i][1].ToString();
                    objMoneyHead.moneyHead = ds.Tables[0].Rows[i][2].ToString();

                    lstMoneyHeads.Add(objMoneyHead);

                }

                JavaScriptSerializer js = new JavaScriptSerializer();

                response = js.Serialize(lstMoneyHeads);

            }
            else
            {
                response = "noDataYet";
            }
            
            return response;
        }


        [WebMethod]
        public void checkMonthlyMoneyHead()
        {

            int moneyHead = 0;

            string currentDate = DateTime.Now.ToString("dd/MM/yyyy");

            int currentMonth;
            int currentYear;

            try
            {
                currentMonth = Int32.Parse(currentDate.Split('/')[1].ToString());
                currentYear = Int32.Parse(currentDate.Split('/')[2].ToString());
            }
            catch (Exception)
            {
                currentMonth = Int32.Parse(currentDate.Split('-')[1].ToString());
                currentYear = Int32.Parse(currentDate.Split('-')[2].ToString());
            }

            DataSet ds = new DataSet();

            ds = executeQuery("select top 1 [date] from monthlyMoneyHead order by [key] desc");

            if(ds.Tables[0].Rows.Count > 0)
            {
                string lastDate = ds.Tables[0].Rows[0][0].ToString();

                int lastMonth;

                try
                {
                    lastMonth = Int32.Parse(lastDate.Split('/')[1].ToString());
                }
                catch (Exception)
                {
                    lastMonth = Int32.Parse(lastDate.Split('-')[1].ToString());
                }

                if (currentMonth != lastMonth)
                {
                    //get new moneyHead

                    string queryString = "select price, total_paid from Sales";

                    try
                    {

                        DataSet ds2 = new DataSet();

                        ds2 = executeQuery(queryString);

                        if (ds2.Tables[0].Rows.Count > 0)
                        {

                            for (int i = 0; i < ds2.Tables[0].Rows.Count; i++)
                            {
                                moneyHead += (Int32.Parse(ds2.Tables[0].Rows[i][0].ToString()) - Int32.Parse(ds2.Tables[0].Rows[i][1].ToString()));
                            }

                        }
                        else if (ds2.Tables[0].Rows.Count == 0)
                        {
                            moneyHead = 0;
                        }

                        string insertedDate = "1/" + currentMonth + "/" + currentYear;

                        int flag = executeNonQuery("insert into monthlyMoneyHead values ('" + insertedDate + "', '" + moneyHead + "')");

                        if (flag != 1)
                        {
                            throw new Exception("Error in adding new monthly moneyHead");
                        }

                    }
                    catch (Exception e)
                    {
                        throw new Exception("Error in calculating monthly moneyHead");
                    }

                }
            }
            else
            {
                string queryString = "select price, total_paid from Sales";

                try
                {

                    DataSet ds2 = new DataSet();

                    ds2 = executeQuery(queryString);

                    if (ds2.Tables[0].Rows.Count > 0)
                    {

                        for (int i = 0; i < ds2.Tables[0].Rows.Count; i++)
                        {
                            moneyHead += (Int32.Parse(ds2.Tables[0].Rows[i][0].ToString()) - Int32.Parse(ds2.Tables[0].Rows[i][1].ToString()));
                        }

                    }
                    else if (ds2.Tables[0].Rows.Count == 0)
                    {
                        moneyHead = 0;
                    }

                    string insertedDate = "1/" + currentMonth + "/" + currentYear;

                    int flag = executeNonQuery("insert into monthlyMoneyHead values ('" + insertedDate + "', '" + moneyHead + "')");

                    if (flag != 1)
                    {
                        throw new Exception("Error in adding new monthly moneyHead");
                    }

                }
                catch (Exception e)
                {
                    throw new Exception("Error in calculating monthly moneyHead");
                }
            }

        }


        #endregion


        #region Month Rate Tab
        [WebMethod]
        public String getMonthRate() 
        {

            string jsnRespone;

            try
            {

                int collectedMoney = 0;
                string saleDate;
                int paymentDay;
                int price;
                double rate = 0;
                int mo2adam = 0;
                int monthlyPaid = 0;
                int billCollected = 0;
                int totalBillCollected = 0;
                int totalCollectedMoney = 0;

                string queryString = "select monthlyPaid, total_paid, saleDate, Mo2adam, paymentDay, price from Sales";

                DataSet ds = new DataSet();

                ds = executeQuery(queryString);

                if (ds.Tables[0].Rows.Count > 0)
                {

                    string currentDate = DateTime.Now.ToString("dd/MM/yyyy");

                    int currentDay;
                    int currentMonth;
                    int currentYear;

                    try
                    {
                        currentDay = Int32.Parse(currentDate.Split('/')[0].ToString());
                        currentMonth = Int32.Parse(currentDate.Split('/')[1].ToString());
                        currentYear = Int32.Parse(currentDate.Split('/')[2].ToString());
                    }
                    catch (Exception e)
                    {
                        currentDay = Int32.Parse(currentDate.Split('-')[0].ToString());
                        currentMonth = Int32.Parse(currentDate.Split('-')[1].ToString());
                        currentYear = Int32.Parse(currentDate.Split('-')[2].ToString());
                    }

                    for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                    {
                        monthlyPaid = Int32.Parse(ds.Tables[0].Rows[i][0].ToString());
                        collectedMoney = Int32.Parse(ds.Tables[0].Rows[i][1].ToString());
                        saleDate = ds.Tables[0].Rows[i][2].ToString();
                        mo2adam = Int32.Parse(ds.Tables[0].Rows[i][3].ToString());
                        paymentDay = Int32.Parse(ds.Tables[0].Rows[i][4].ToString());
                        price = Int32.Parse(ds.Tables[0].Rows[i][5].ToString());

                        int saleDay = Int32.Parse(saleDate.Split('/')[0].ToString());
                        int saleMonth = Int32.Parse(saleDate.Split('/')[1].ToString());
                        int saleYear = Int32.Parse(saleDate.Split('/')[2].ToString());

                        DateTime now = DateTime.Parse(currentMonth + "/" + currentDay + "/" + currentYear + " 1:00:00 PM");
                        DateTime compareTo = DateTime.Parse(saleMonth + "/" + paymentDay + "/" + saleYear + " 1:00:00 PM");
                        var dateSpan = DateTimeSpan.CompareDates(compareTo, now);

                        int yearsCount = dateSpan.Years;
                        int monthsCount = dateSpan.Months;

                        //Calculations

                        totalCollectedMoney += collectedMoney;

                        billCollected = (((12 * yearsCount) + monthsCount) * monthlyPaid) + mo2adam;

                        if (price > collectedMoney)
                            totalBillCollected += billCollected;

                    }

                    rate = (totalCollectedMoney * 100) / totalBillCollected;
                    rate = Math.Round(rate, 2);

                    jsnRespone = "{\"collectedMoney\":\"" + totalCollectedMoney + "\", \"toBeCollectedMoney\":\"" + totalBillCollected + "\", \"rate\":\"" + rate + "\" }";
                }
                else if (ds.Tables[0].Rows.Count == 0)
                {
                    jsnRespone = "{\"collectedMoney\":\"" + totalCollectedMoney + "\", \"toBeCollectedMoney\":\"" + totalBillCollected + "\", \"rate\":\"" + rate + "\" }";
                }
                else
                {
                    jsnRespone = "databaseError";
                }

            }
            catch (Exception e)
            {
                return e.Message.ToString();
            }

            return jsnRespone;

        } //done

        #endregion


        #region Inquiry tab
        [WebMethod]
        public String getInquiryData()
        {

            string jsnResponse;

            try
            {
                string queryString = "select Sales.[key], Customers.name, product_name, monthlyPaid, paymentDay, lastPaymentDate, Customers.phone1, Customers.phone2, nextPaymentDate from Customers inner join Sales on Customers.[key] = Sales.customer_key order by CONVERT(int, Sales.paymentDay ) asc";

                DataSet ds = new DataSet();

                ds = executeQuery(queryString);

                if (ds.Tables[0].Rows.Count > 0)
                {

                    jsnInquiryData inquiryData;
                    List<jsnInquiryData> lstInquiryData = new List<jsnInquiryData>();

                    int Count = ds.Tables[0].Rows.Count;

                    string currentDate = DateTime.Now.ToString("dd/MM/yyyy");

                    int currentDay;
                    int currentMonth;
                    int currentYear;

                    try
                    {
                        currentDay = Int32.Parse(currentDate.Split('/')[0].ToString());
                        currentMonth = Int32.Parse(currentDate.Split('/')[1].ToString());
                        currentYear = Int32.Parse(currentDate.Split('/')[2].ToString());
                    }
                    catch (Exception e)
                    {
                        currentDay = Int32.Parse(currentDate.Split('-')[0].ToString());
                        currentMonth = Int32.Parse(currentDate.Split('-')[1].ToString());
                        currentYear = Int32.Parse(currentDate.Split('-')[2].ToString());
                    }

                    int nextPaymentDay;
                    int nextPaymentMonth;
                    int nextPaymentYear;

                    int lastPaymentDay;
                    int lastPaymentMonth;
                    int lastPaymentYear;

                    for (int i = 0; i < Count; i++)
                    {

                        inquiryData = new jsnInquiryData();

                        inquiryData.key = ds.Tables[0].Rows[i][0].ToString();
                        inquiryData.customer_name = ds.Tables[0].Rows[i][1].ToString();
                        inquiryData.product_name = ds.Tables[0].Rows[i][2].ToString();
                        inquiryData.monthlyPaid = ds.Tables[0].Rows[i][3].ToString();
                        inquiryData.paymentDay = ds.Tables[0].Rows[i][4].ToString();
                        inquiryData.lastPayment = ds.Tables[0].Rows[i][5].ToString();
                        inquiryData.phone1 = ds.Tables[0].Rows[i][6].ToString();
                        inquiryData.phone2 = ds.Tables[0].Rows[i][7].ToString();
                        inquiryData.nextPayment = ds.Tables[0].Rows[i][8].ToString();

                        nextPaymentDay = Int32.Parse(inquiryData.nextPayment.Split('/')[0].ToString());
                        nextPaymentMonth = Int32.Parse(inquiryData.nextPayment.Split('/')[1].ToString());
                        nextPaymentYear = Int32.Parse(inquiryData.nextPayment.Split('/')[2].ToString());

                        //To get number of late payments

                        lastPaymentDay = Int32.Parse(inquiryData.lastPayment.Split('/')[0].ToString());
                        lastPaymentMonth = Int32.Parse(inquiryData.lastPayment.Split('/')[1].ToString());
                        lastPaymentYear = Int32.Parse(inquiryData.lastPayment.Split('/')[2].ToString());

                        DateTime compareTo = DateTime.Parse(lastPaymentMonth + "/" + lastPaymentDay + "/" + lastPaymentYear + " 1:00:00 PM");
                        DateTime now = DateTime.Parse(currentMonth+ "/" + currentDay + "/" + currentYear + " 1:00:00 PM");
                        var dateSpan = DateTimeSpan.CompareDates(compareTo, now);

                        int yearsCount = dateSpan.Years;
                        int monthsCount = dateSpan.Months;

                        inquiryData.latePayments = ((yearsCount * 12) + monthsCount).ToString();

                        if (nextPaymentYear == currentYear)
                        {
                            if((nextPaymentMonth == currentMonth) && (nextPaymentDay <= currentDay) )
                            {
                                lstInquiryData.Add(inquiryData);
                            }
                            else if(nextPaymentMonth < currentMonth)
                            {
                                lstInquiryData.Add(inquiryData);
                            }
                        }
                        else if(nextPaymentYear < currentYear)
                        {
                            lstInquiryData.Add(inquiryData);
                        }

                    }

                    JavaScriptSerializer js = new JavaScriptSerializer();

                    jsnResponse = js.Serialize(lstInquiryData);
                }
                else
                {
                    jsnResponse = "";
                }
            }
            catch (Exception e)
            {
                return "error Service : " + e.Message.ToString();
            }

            return jsnResponse;

        }


        #endregion


        #region Latency Notes Tab

        [WebMethod]
        public String getLatencyNotes()
        {
            try
            {
                string queryString = "select latencyNotes.[key], Customers.name, latencyNotes.note from Customers inner join latencyNotes on Customers.[key] = latencyNotes.customer_key";

                DataSet ds = new DataSet();

                ds = executeQuery(queryString);

                if (ds.Tables[0].Rows.Count != 0)
                {

                    jsnNoteData note;
                    List<jsnNoteData> lstNotes = new List<jsnNoteData>();

                    int count = ds.Tables[0].Rows.Count;

                    for (int i = 0; i < count; i++)
                    {
                        note = new jsnNoteData();

                        note.key = ds.Tables[0].Rows[i][0].ToString();
                        note.cutomerName = ds.Tables[0].Rows[i][1].ToString();
                        note.note = ds.Tables[0].Rows[i][2].ToString();

                        lstNotes.Add(note);
                    }


                    JavaScriptSerializer js = new JavaScriptSerializer();

                    string json = js.Serialize(lstNotes);

                    return json;

                }
                else if (ds.Tables[0].Rows.Count == 0)
                {
                    return "notes unavailable";

                }
                else
                {
                    return "databaseError";
                }

            }
            catch (Exception e)
            {
                return e.Message.ToString();
            }
        } //done


        [WebMethod]
        public String deleteLatencyNote(int latencyNoteKey)
        {
            try
            {

                string queryString = "delete from latencyNotes where latencyNotes.[key] = " + latencyNoteKey;

                int flag = executeNonQuery(queryString);

                if (flag > 0)
                {
                    return "deleted";
                }
                else
                {
                    return "databaseError";
                }


            }
            catch (Exception e)
            {
                return e.Message.ToString();
            }
        } //done


        [WebMethod]
        public String addNewlatencyNote(string json)
        {
            try
            {
                var parsed = JsonConvert.DeserializeObject<jsnNoteData>(json);

                int flag = executeNonQuery("insert into latencyNotes (customer_key, note) values (" + parsed.key + ", '" + parsed.note + "')");

                if (flag == 1)
                {
                        
                    return "inserted";

                }
                else
                {
                    return "databaseError";
                }

            }
            catch (Exception e)
            {
                return e.Message.ToString();
            }
        } //done

        #endregion


        //Users Page

        #region Methods for user page 

        [WebMethod]
        public String getOrederedItems(string queryString)
        {
            try
            {

                DataSet ds = new DataSet();

                jsnSaleData jsnOrdered;
                List<jsnSaleData> orderedList = new List<jsnSaleData>();

                ds = executeQuery(queryString);

                int count = ds.Tables[0].Rows.Count;

                if (count > 0)
                {

                    for (int i = 0; i < count; i++)
                    {
                        jsnOrdered = new jsnSaleData();

                        jsnOrdered.product_name= ds.Tables[0].Rows[i][0].ToString();
                        jsnOrdered.price= ds.Tables[0].Rows[i][1].ToString();
                        jsnOrdered.paymentDay = ds.Tables[0].Rows[i][2].ToString();
                        jsnOrdered.lastPayment = ds.Tables[0].Rows[i][3].ToString();
                        jsnOrdered.monthlyPaid = ds.Tables[0].Rows[i][4].ToString();
                        jsnOrdered.total_paid = ds.Tables[0].Rows[i][5].ToString();

                        orderedList.Add(jsnOrdered);

                    }

                    JavaScriptSerializer js = new JavaScriptSerializer();

                    string json = js.Serialize(orderedList);

                    return json;


                }
                else if (count == 0)
                {
                    return "no items";
                }
                else
                {
                    return "databaseError";
                }

            }
            catch (Exception e)
            {
                return e.Message.ToString();
            }
        }

        #endregion


    }
    
}
