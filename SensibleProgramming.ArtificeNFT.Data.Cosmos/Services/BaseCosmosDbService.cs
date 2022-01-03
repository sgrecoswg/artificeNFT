using Microsoft.Azure.Cosmos;
using System.Runtime.CompilerServices;

namespace SensibleProgramming.ArtificeNFT.Data.Cosmos
{
    public abstract class BaseCosmosDbService
    {
        protected Container _container { get; init; }

        public BaseCosmosDbService(CosmosClient dbClient, string databaseName, string containerName)
        {
            _container = dbClient.GetContainer(databaseName, containerName);
        }
    }
}