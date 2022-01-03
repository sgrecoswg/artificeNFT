using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using SensibleProgramming.ArtificeNFT.Interfaces;

namespace SensibleProgramming.ArtificeNFT.Data.Cosmos
{
    public class DigitalAssetDataService : IDigitalAssetDataService
    {
        public DigitalAssetDataService(IConfiguration config, IMemoryCache cache)
        {

        }
        public IDigitalAsset GetById(int id)
        {
            throw new System.NotImplementedException();
        }

        public IDigitalAsset Save()
        {
            throw new System.NotImplementedException();
        }
    }
}
