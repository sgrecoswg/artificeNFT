using SensibleProgramming.ArtificeNFT.Data;
using SensibleProgramming.ArtificeNFT.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SensibleProgramming.ArtificeNFT.Models
{
    public class Artist : IArtist
    {
        IArtistsCosmosDbService _service;
        public string About { get; set; }
        public string AvatarImageUrl { get; set; }
        public string BackgroundImageUrl { get; set; }
        public string Id { get; set; }
        public string Name { get; set; }
        public string PublicAddress { get; set; }
        public string Email { get; set; }
        public Dictionary<string, string> OtherUrls { get; set; } = new Dictionary<string, string>();

        public Artist(IArtistsCosmosDbService service)
        {
            _service = service;
        }

        /// <summary>
        /// Creates a new record in the db
        /// </summary>
        /// <returns></returns>
        public async Task<IArtist> Save()
        {
            try
            {
                if (_service is null) throw new InvalidOperationException("Data service was null.");
                ///TODO: validate the user is not already in the db
                await _service.AddItemAsync(this);
                return this;
            }
            catch (Exception)
            {

                throw;
            }            
        }

        /// <summary>
        /// Updates a record in the db
        /// </summary>
        /// <returns></returns>
        public async Task<IArtist> Update()
        {
            
            try
            {
                if (_service is null) throw new InvalidOperationException("Data service was null.");
                if (string.IsNullOrEmpty(Id)) throw new InvalidOperationException("Id can not be empty.");
                if (string.IsNullOrEmpty(Name)) throw new InvalidOperationException("Name can not be empty..");
                ///TODO: validate public address with metamask
                await _service.UpdateItemAsync(this.Id, this);
                return this;
            }
            catch (Exception)
            {

                throw;
            }
        }

        /// <summary>
        /// Removes a record from the db
        /// </summary>
        /// <returns></returns>
        public async Task Delete()
        {
            
            try
            {
                if (_service is null) throw new InvalidOperationException("Data service was null.");
                if (string.IsNullOrEmpty(Id)) throw new InvalidOperationException("Id can not be empty.");
                await _service.DeleteItemAsync(Id);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
