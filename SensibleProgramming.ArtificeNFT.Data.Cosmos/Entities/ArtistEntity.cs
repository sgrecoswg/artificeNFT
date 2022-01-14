using Newtonsoft.Json;
using SensibleProgramming.ArtificeNFT.Interfaces;
using System;
using System.Collections.Generic;
using System.Diagnostics;

namespace SensibleProgramming.ArtificeNFT.Data.Cosmos
{
    [DebuggerDisplay("{Name} - id({Id})")]
    public class ArtistEntity : BaseEntity,IArtist
    {
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "about")]
        public string About { get; set; }

        [JsonProperty(PropertyName = "background")]
        public string BackgroundImageUrl { get; set; }

        [JsonProperty(PropertyName = "avatar")]
        public string AvatarImageUrl { get; set; }

        [JsonProperty(PropertyName = "publicaddress")]
        public string PublicAddress { get; set; }

        [JsonProperty(PropertyName = "email")]
        public string Email { get; set; }

        [JsonProperty(PropertyName = "otherurls")]
        public Dictionary<string, string> OtherUrls { get; set; } = new Dictionary<string, string>();

    }
}
