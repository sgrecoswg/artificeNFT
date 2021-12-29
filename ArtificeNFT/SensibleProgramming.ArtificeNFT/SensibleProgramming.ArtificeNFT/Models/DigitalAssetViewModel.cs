using System;

namespace SensibleProgramming.ArtificeNFT.Models
{
    public class DigitalAssetViewModel
    {
        public DigitalAssetViewModel()
        {
        }

        public byte[] Data { get; set; }
        public string MimeType { get; set; }
        public int ArtistId { get; set; }

        public string FileData
        {
            get
            {
                return $"data:{MimeType};base64, {Convert.ToBase64String(Data)}";
            }
        }
    }
}
