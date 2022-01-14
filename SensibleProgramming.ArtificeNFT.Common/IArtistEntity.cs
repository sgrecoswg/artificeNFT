using System.Collections.Generic;

namespace SensibleProgramming.ArtificeNFT.Interfaces
{
    public interface IArtist
    {
        string About { get; set; }
        string AvatarImageUrl { get; set; }
        string BackgroundImageUrl { get; set; }
        string Id { get; set; }
        string Name { get; set; }
        string Email { get; set; }
        Dictionary<string,string> OtherUrls { get; set; }
        string PublicAddress { get; set; }
    }
}
