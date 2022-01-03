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

        public static ArtistViewModel From(IArtist artist)
        {
            return new() {
                Name = artist.Name,
                About = artist.About,
                Id = artist.Id,
                BackgroundImageUrl = artist.BackgroundImageUrl,
                AvatarImageUrl = artist.AvatarImageUrl
            };
        }

        public static IEnumerable<ArtistViewModel> From(IEnumerable<IArtist> artists)
        {
            return from a in artists select From(a);
        }
    }
}
