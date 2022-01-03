using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.Cosmos.Fluent;
using SensibleProgramming.ArtificeNFT.Interfaces;
using SensibleProgramming.ArtificeNFT.Data;
using Microsoft.Azure.Cosmos.Linq;

namespace SensibleProgramming.ArtificeNFT.Data.Cosmos
{
    /// <summary>
    /// Data access for Artists to a Cosomos db set up in Azure
    /// </summary>
    public class ArtistsCosmosDbService : BaseCosmosDbService,IArtistsCosmosDbService
    {
        /// <summary>
        /// Data access service for Artists in a Cosmos data base
        /// </summary>
        /// <param name="dbClient">The Azure Cosmos client</param>
        /// <param name="databaseName">The name of the database we are accessing</param>
        /// <param name="containerName">The container(table) we are storing the Artist's data</param>
        public ArtistsCosmosDbService(CosmosClient dbClient, string databaseName, string containerName) : base(dbClient, databaseName, containerName)
        { }

        public async Task AddItemAsync(IArtist item)
        {
            try
            {
                ArtistEntity _newEntity = new ArtistEntity()
                {
                    Id = Guid.NewGuid().ToString(),
                    About = item.About,
                    AvatarImageUrl = item.AvatarImageUrl,
                    BackgroundImageUrl = item.BackgroundImageUrl,
                    Name = item.Name
                };

                await _container.CreateItemAsync<ArtistEntity>(_newEntity, new PartitionKey(_newEntity.Id));
            }
            catch (Exception)
            {
                throw;
            }           
        }

        public async Task DeleteItemAsync(string id)
        {
            await _container.DeleteItemAsync<ArtistEntity>(id, new PartitionKey(id));
        }

        public async Task<IArtist> GetItemAsync(string id)
        {
            try
            {
                ItemResponse<ArtistEntity> response = await _container.ReadItemAsync<ArtistEntity>(id, new PartitionKey(id));
                return response.Resource as IArtist;
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return null;
            }

        }

        public async Task<IEnumerable<IArtist>> GetItemsAsync(string queryString="")
        {
            var q = _container.GetItemLinqQueryable<ArtistEntity>();
            var iterator = q.ToFeedIterator();
            var _results = await iterator.ReadNextAsync();

            //if (string.IsNullOrEmpty(queryString)) 
            //{
            //    queryString = "select * from Artists";
            //};

            //var query = _container.GetItemQueryIterator<ArtistEntity>(new QueryDefinition(queryString));
            //List <ArtistEntity> results = new List<ArtistEntity>();
            //while (query.HasMoreResults)
            //{
            //    var response = await query.ReadNextAsync();

            //    results.AddRange(response.ToList());
            //}

            return _results;
        }

        public async Task UpdateItemAsync(string id, IArtist item)
        {
            ArtistEntity _newEntity = new ArtistEntity()
            {
                Id = item.Id,
                About = item.About,
                AvatarImageUrl = item.AvatarImageUrl,
                BackgroundImageUrl = item.BackgroundImageUrl,
                Name = item.Name
            };

            await this._container.UpsertItemAsync<ArtistEntity>(_newEntity, new PartitionKey(id));
        }
    }
}
