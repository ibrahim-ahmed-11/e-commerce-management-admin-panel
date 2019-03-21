using Newtonsoft.Json;

namespace Ta2seetProject
{
    public class jsnInquiryData
    {
        [JsonProperty(PropertyName = "key")]
        public string key { get; set; }

        [JsonProperty(PropertyName = "customer_name")]
        public string customer_name { get; set; }

        [JsonProperty(PropertyName = "product_name")]
        public string product_name { get; set; }

        [JsonProperty(PropertyName = "monthlyPaid")]
        public string monthlyPaid { get; set; }

        [JsonProperty(PropertyName = "paymentDay")]
        public string paymentDay { get; set; }

        [JsonProperty(PropertyName = "lastPayment")]
        public string lastPayment { get; set; }

        [JsonProperty(PropertyName = "nextPayment")]
        public string nextPayment { get; set; }

        [JsonProperty(PropertyName = "phone1")]
        public string phone1 { get; set; }

        [JsonProperty(PropertyName = "phone2")]
        public string phone2 { get; set; }

        [JsonProperty(PropertyName = "latePayments")]
        public string latePayments { get; set; }


    }
}  