using Newtonsoft.Json;

namespace Ta2seetProject
{
    public class jsnCustomerData
    {
        [JsonProperty(PropertyName = "key")]
        public string key { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string name { get; set; }

        [JsonProperty(PropertyName = "id_num")]
        public string id_num { get; set; }

        [JsonProperty(PropertyName = "address")]
        public string address { get; set; }

        [JsonProperty(PropertyName = "phone1")]
        public string phone1 { get; set; }

        [JsonProperty(PropertyName = "phone2")]
        public string phone2 { get; set; }

        [JsonProperty(PropertyName = "landLine")]
        public string landLine { get; set; }

        [JsonProperty(PropertyName = "guarantee1")]
        public string guarantee1 { get; set; }

        [JsonProperty(PropertyName = "g_id_1")]
        public string g_id_1 { get; set; }

        [JsonProperty(PropertyName = "g_address_1")]
        public string g_address_1 { get; set; }

        [JsonProperty(PropertyName = "g_phone_1")]
        public string g_phone_1 { get; set; }

        [JsonProperty(PropertyName = "guarantee2")]
        public string guarantee2 { get; set; }

        [JsonProperty(PropertyName = "g_id_2")]
        public string g_id_2 { get; set; }

        [JsonProperty(PropertyName = "g_address_2")]
        public string g_address_2 { get; set; }

        [JsonProperty(PropertyName = "g_phone_2")]
        public string g_phone_2 { get; set; }

        [JsonProperty(PropertyName = "password")]
        public string password { get; set; }



    }
}  