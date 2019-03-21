using Newtonsoft.Json;

namespace Ta2seetProject
{
    public class jsnSaleData
    {
        [JsonProperty(PropertyName = "key")]
        public string key { get; set; }

        [JsonProperty(PropertyName = "customer_key")]
        public string customer_key { get; set; }

        [JsonProperty(PropertyName = "product_name")]
        public string product_name { get; set; }

        [JsonProperty(PropertyName = "price")]
        public string price { get; set; }

        [JsonProperty(PropertyName = "saleDate")]
        public string saleDate { get; set; }

        [JsonProperty(PropertyName = "paymentDay")]
        public string paymentDay { get; set; }

        [JsonProperty(PropertyName = "paymentType")]
        public string paymentType { get; set; }

        [JsonProperty(PropertyName = "monthlyPaid")]
        public string monthlyPaid { get; set; }

        [JsonProperty(PropertyName = "lastPayment")]
        public string lastPayment { get; set; }

        [JsonProperty(PropertyName = "nextPayment")]
        public string nextPayment { get; set; }

        [JsonProperty(PropertyName = "total_paid")]
        public string total_paid { get; set; }

        [JsonProperty(PropertyName = "notes")]
        public string notes { get; set; }


    }
}  