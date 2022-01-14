using SensibleProgramming.ArtificeNFT.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace SensibleProgramming.ArtificeNFT.API.Models
{
    public class ArtistViewModel : IArtist
    {
        public string Name { get; set; }
        public string About { get; set; }
        public string Id { get; set; }
        public string BackgroundImageUrl { get; set; }
        public string AvatarImageUrl { get; set; }

        public string PublicAddress { get; set; }
        public string Email { get; set; }
        public Dictionary<string, string> OtherUrls { get; set; } = new Dictionary<string, string>();

        public static ArtistViewModel From(IArtist artist)
        {
            return new() {
                Name = artist.Name,
                About = artist.About,
                Id = artist.Id,
                BackgroundImageUrl = artist.BackgroundImageUrl,
                AvatarImageUrl = artist.AvatarImageUrl,
                PublicAddress = artist.PublicAddress,
                Email = artist.Email,
                OtherUrls = artist.OtherUrls
            };
        }

        public static IEnumerable<ArtistViewModel> From(IEnumerable<IArtist> artists)
        {
            return from a in artists select From(a);
        }
    }
}
