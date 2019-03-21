using Newtonsoft.Json;

namespace Ta2seetProject
{
    public class jsnUserVerifyLoginMail
    {
        [JsonProperty(PropertyName = "username")]
        public string username { get; set; }

        [JsonProperty(PropertyName = "password")]
        public string password { get; set; }
    }
}  