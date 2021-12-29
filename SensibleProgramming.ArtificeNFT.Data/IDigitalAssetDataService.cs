using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using SensibleProgramming.ArtificeNFT.Interfaces;

namespace SensibleProgramming.ArtificeNFT.Data
{
    public interface IDigitalAssetDataService
    {
        IDigitalAsset GetById(int id);
        IDigitalAsset Save();
    }

    public class DigitalAssetDataService : IDigitalAssetDataService
    {
        public DigitalAssetDataService(IConfiguration config,IMemoryCache cache)
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
