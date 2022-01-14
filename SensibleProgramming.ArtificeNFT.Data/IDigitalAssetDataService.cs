using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using SensibleProgramming.ArtificeNFT.Interfaces;

namespace SensibleProgramming.ArtificeNFT.Data
{
    public interface IDigitalAssetDataService
    {
        IDigitalAsset GetById(int id);
        IDigitalAsset Save(IDigitalAsset asset);
    }

   
}
