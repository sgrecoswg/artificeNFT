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
                await _service.AddItemAsync(model);
                return OKResponse(model, "Saved new artists");
            }
            catch (Exception exc)
            {
                return ErrorResponse(exc);
            }
        }

       
        [HttpPut]
        public async Task<ActionResult<dynamic>> Put(string id,[FromBody] ArtistViewModel model)
        {
            try
            {
                await _service.UpdateItemAsync(model.Id,model);
                return OKResponse(model, "Updated new artists");
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
                await _service.DeleteItemAsync(id);
                return OKResponse(new { }, "Updated new artists");
            }
            catch (Exception exc)
            {
                return ErrorResponse(exc);
            }
        }

    }

    
}