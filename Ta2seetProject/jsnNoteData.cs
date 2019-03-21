using Newtonsoft.Json;

namespace Ta2seetProject
{
    public class jsnNoteData
    {
        [JsonProperty(PropertyName = "key")]
        public string key { get; set; }

        [JsonProperty(PropertyName = "cutomerName")]
        public string cutomerName { get; set; }

        [JsonProperty(PropertyName = "note")]
        public string note { get; set; }


    }
}  