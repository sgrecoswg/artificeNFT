using Microsoft.Extensions.Configuration;
using SensibleProgramming.ArtificeNFT.Data.Cosmos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SensibleProgramming.ArtificeNFT.API
{
    public static class CosmosDataClientFactory
    {
        /// <summary>
        /// Creates a base Cosmos data client
        /// </summary>
        /// <param name="configurationSection"></param>
        /// <returns></returns>
        public static Microsoft.Azure.Cosmos.CosmosClient CreateCosomosClient(IConfigurationSection configurationSection)
        {
            string account = configurationSection.GetSection("Account").Value;
            string key = configurationSection.GetSection("Key").Value;
            Microsoft.Azure.Cosmos.CosmosClient client = new Microsoft.Azure.Cosmos.CosmosClient(account, key);
            return client;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="account"></param>
        /// <param name="key"></param>
        /// <returns></returns>
        public static Microsoft.Azure.Cosmos.CosmosClient CreateCosomosClient(string account, string key)
        {
            Microsoft.Azure.Cosmos.CosmosClient client = new Microsoft.Azure.Cosmos.CosmosClient(account, key);
            return client;
        }

        /// <summary>
        /// Creates a Cosmos DB database and a container with the specified partition key. 
        /// </summary>
        /// <returns></returns>
        public static async Task<ArtistsCosmosDbService> InitializeArtistsCosmosClientInstanceAsync(IConfigurationSection configurationSection)
        {
            string databaseName = configurationSection.GetSection("DatabaseName").Value;
            string containerName = configurationSection.GetSection("ContainerName").Value;
            Microsoft.Azure.Cosmos.CosmosClient client = CreateCosomosClient(configurationSection);
            ArtistsCosmosDbService cosmosDbService = new ArtistsCosmosDbService(client, databaseName, containerName);
            Microsoft.Azure.Cosmos.DatabaseResponse database = await client.CreateDatabaseIfNotExistsAsync(databaseName);
            await database.Database.CreateContainerIfNotExistsAsync(containerName, "/id");

            return cosmosDbService;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="account"></param>
        /// <param name="key"></param>
        /// <param name="databaseName"></param>
        /// <param name="containerName"></param>
        /// <returns></returns>
        public static async Task<ArtistsCosmosDbService> InitializeArtistsCosmosClientInstanceAsync(string account, string key,string databaseName, string containerName)
        {
            Microsoft.Azure.Cosmos.CosmosClient client = CreateCosomosClient(account, key);
            ArtistsCosmosDbService cosmosDbService = new ArtistsCosmosDbService(client, databaseName, containerName);
            Microsoft.Azure.Cosmos.DatabaseResponse database = await client.CreateDatabaseIfNotExistsAsync(databaseName);
            await database.Database.CreateContainerIfNotExistsAsync(containerName, "/id");

            return cosmosDbService;
        }
    }
}
