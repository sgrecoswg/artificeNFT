using System;

namespace SensibleProgramming.ArtificeNFT.API.Models
{
    public class DigitalAssetViewModel
    {
        public DigitalAssetViewModel()
        {
        }

        public byte[] Data { get; set; }
        public string MimeType { get; set; }
        public string ArtistId { get; set; }

        public string FileData
        {
            get
            {
                return $"data:{MimeType};base64, {Convert.ToBase64String(Data)}";
            }
        }
    }

}
