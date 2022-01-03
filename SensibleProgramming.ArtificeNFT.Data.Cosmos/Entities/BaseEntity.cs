using Newtonsoft.Json;

namespace SensibleProgramming.ArtificeNFT.Data.Cosmos
{
    public abstract class BaseEntity
    {
        [JsonProperty(PropertyName = "id")]
        public string Id { get; set; }
    }
}
