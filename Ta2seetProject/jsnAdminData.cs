using Newtonsoft.Json;

namespace Ta2seetProject
{
    public class jsnAdminData
    {
        [JsonProperty(PropertyName = "key")]
        public string key { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string name { get; set; }

        [JsonProperty(PropertyName = "username")]
        public string username { get; set; }

        [JsonProperty(PropertyName = "password")]
        public string password { get; set; }
    }
}  