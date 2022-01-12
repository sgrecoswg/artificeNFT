using System;

namespace SensibleProgramming.ArtificeNFT.Interfaces
{
    public interface IDigitalAsset
    {
        string ArtistId { get; set; }
        string FileName { get; set; }
        byte[] Data { get; set; }
        DateTime CreatedOn { get; set; }
        string CreatedBy { get; set; }
        string MimeType { get; set; }
    }
}
