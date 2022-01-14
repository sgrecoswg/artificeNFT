using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using SensibleProgramming.ArtificeNFT.Data;
using SensibleProgramming.ArtificeNFT.Data.Cosmos;
using SensibleProgramming.ArtificeNFT.Interfaces;
using SensibleProgramming.ArtificeNFT.API.Models;
using SensibleProgramming.ArtificeNFT.Models;

namespace SensibleProgramming.ArtificeNFT.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ArtistsController : BaseAPIController<ArtistViewModel>
    {
        IArtistsCosmosDbService _service;


        public ArtistsController(ILogger<ArtistViewModel> logger, IMemoryCache cache, IArtistsCosmosDbService service) : base(logger,cache)
        {
            _service = service;
        }

        [HttpGet()]
        public async Task<ActionResult<dynamic>> Get()
        {
            try
            {
                IEnumerable<IArtist> artist = await _service.GetItemsAsync();
                if (artist is not null)
                {
                    return OKResponse(ArtistViewModel.From(artist), $"Found {artist.Count()} artists.");
                }
                return WarnResponse(null, $"No artists found");
            }
            catch (Exception exc)
            {
                return ErrorResponse(exc);
            }
        }


        [HttpGet("Get/{id}")]
        public async Task<ActionResult<dynamic>> Get(string id)
        {
            try
            {
                IArtist artist = await _service.GetItemAsync(id);
                if (artist is not null)
                {
                    return OKResponse(ArtistViewModel.From(artist), $"Found artists {artist.Name}");
                }
                return WarnResponse(null, $"No artists found by id {id}");
            }
            catch (Exception exc)
            {
                return ErrorResponse(exc);
            }
        }

        [HttpPost]
        public async Task<ActionResult<dynamic>> Post([FromBody] ArtistViewModel model)
        {
            try
            {
                IArtist _newArtist = await new Artist(_service) {
                    Name = model.Name,
                    About = model.About,
                    BackgroundImageUrl = model.BackgroundImageUrl,
                    AvatarImageUrl = model.AvatarImageUrl,
                    PublicAddress = model.PublicAddress
                }.Save();

                return OKResponse(_newArtist, "Saved new artists");
            }
            catch (Exception exc)
            {
                return ErrorResponse(exc);
            }
        }

       
        [HttpPost("Update/{id}")]
        public async Task<ActionResult<dynamic>> Put(string id,[FromBody] ArtistViewModel model)
        {
            try
            {
                IArtist _artist = await new Artist(_service)
                {
                    Name = model.Name,
                    About = model.About,
                    Id = model.Id,
                    BackgroundImageUrl = model.BackgroundImageUrl,
                    AvatarImageUrl = model.AvatarImageUrl,
                    PublicAddress = model.PublicAddress,
                    Email = model.Email,
                    OtherUrls = model.OtherUrls
                }.Update();
                
                return OKResponse(_artist, "Updated new artists");
            }
            catch (Exception exc)
            {
                return ErrorResponse(exc);
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<dynamic>> Delete(string id)
        {
            try
            {
                await new Artist(_service)
                {                   
                    Id = id
                }.Delete();
               
                return OKResponse(new { }, "Updated new artists");
            }
            catch (Exception exc)
            {
                return ErrorResponse(exc);
            }
        }

    }

    
}