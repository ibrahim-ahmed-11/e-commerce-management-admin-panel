using Newtonsoft.Json;

namespace Ta2seetProject
{
    public class jsnSaleDetailsData
    {
        [JsonProperty(PropertyName = "key")]
        public string key { get; set; }

        [JsonProperty(PropertyName = "amount_paid")]
        public string amount_paid { get; set; }

        [JsonProperty(PropertyName = "paymentDate")]
        public string paymentDate { get; set; }

    }
}  