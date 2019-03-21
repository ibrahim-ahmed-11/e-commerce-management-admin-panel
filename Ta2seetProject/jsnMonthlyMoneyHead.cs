using Newtonsoft.Json;

namespace Ta2seetProject
{
    public class jsnMonthlyMoneyHead
    {
        [JsonProperty(PropertyName = "key")]
        public string key { get; set; }

        [JsonProperty(PropertyName = "date")]
        public string date { get; set; }

        [JsonProperty(PropertyName = "moneyHead")]
        public string moneyHead { get; set; }


    }
}  