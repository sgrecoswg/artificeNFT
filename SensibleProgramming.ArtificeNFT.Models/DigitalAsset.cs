using SensibleProgramming.ArtificeNFT.Data;
using SensibleProgramming.ArtificeNFT.Interfaces;
using System;
using System.Threading.Tasks;

namespace SensibleProgramming.ArtificeNFT.Models
{
    public class DigitalAsset : IDigitalAsset
    {
        IDigitalAssetDataService _service;
        public DigitalAsset()
        {

        }

        public DigitalAsset(IDigitalAssetDataService service)
        {
            _service = service;
        }

        public string ArtistId { get; set; }
        public string FileName { get; set; }
        public byte[] Data { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public string MimeType { get; set; }
        public string Path { get; set; }

        public async Task<DigitalAsset> Save()
        {
            if (_service is null) throw new InvalidOperationException("Service is empty");
            _service.Save(this);
            return this;
        }
    }
}
