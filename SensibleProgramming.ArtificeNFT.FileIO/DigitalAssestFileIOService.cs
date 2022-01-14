using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using SensibleProgramming.ArtificeNFT.Data;
using SensibleProgramming.ArtificeNFT.Extensions;
using SensibleProgramming.ArtificeNFT.Interfaces;
using SensibleProgramming.ArtificeNFT.Models;
using System;
using System.Threading.Tasks;

namespace SensibleProgramming.ArtificeNFT.FileIO
{
    public class DigitalAssestFileIOService : IDigitalAssetDataService
    {
        private IMemoryCache _cache;

        public DigitalAssestFileIOService(IConfiguration config, IMemoryCache cache)
        {
            _cache = cache;
        }

        public IDigitalAsset GetById(int id)
        {
            throw new NotImplementedException();
            //if (!_cache.TryGetValue($"{CacheKeys.DigitalAsset}_ByID_{id}", out IDigitalAsset cacheValue))
            //{
            //    cacheValue = new DigitalAsset();
                
            //    _cache.Set($"{CacheKeys.DigitalAsset}_ByID_{id}", cacheValue, new MemoryCacheEntryOptions
            //    {
            //        AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(15),//this may be over kill, but it will definitely expire every 15 minutes
            //                                                                   //SlidingExpiration = TimeSpan.FromMinutes(15) //used if we want to go towards a 'last time accessed' method
            //    });
            //}
            //return cacheValue;
        }

        public IDigitalAsset Save(IDigitalAsset asset)
        {            
            asset.Data.ConvertToBitmap()
                //.ScaleToHeight(130)
                .Save(asset.Path);
            return asset;
        }
    }

   
}
