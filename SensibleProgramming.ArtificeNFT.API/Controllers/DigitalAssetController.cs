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
using SensibleProgramming.ArtificeNFT.Interfaces;
using SensibleProgramming.ArtificeNFT.API.Models;
using SensibleProgramming.ArtificeNFT.Models;
using Microsoft.Extensions.Configuration;
using SensibleProgramming.ArtificeNFT.Extensions;

namespace SensibleProgramming.ArtificeNFT.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class DigitalAssetController : BaseAPIController<DigitalAssetViewModel>
    {
        IDigitalAssetDataService _service;
        IConfiguration _config;

        public DigitalAssetController(ILogger<DigitalAssetViewModel> logger, IMemoryCache cache,IConfiguration config) : base(logger,cache)
        {
            _config = config;
        }

        [HttpPost("Get/{id}")]
        public async Task<ActionResult<dynamic>> Get(int id)
        {
            try
            {
                IDigitalAsset file = _service.GetById(id);
                return OKResponse(new DigitalAssetViewModel() { 
                    Data = file.Data,
                    MimeType = file.MimeType,
                    ArtistId = file.ArtistId,


                }, "");
                //src = {x.filedata}
            }
            catch (Exception exc)
            {
                return ErrorResponse(exc);
            }
        }

        [HttpPost("Upload/{id}/{imageType:regex(avatar|Avatar|Background|background)}")]
        public async Task<ActionResult<dynamic>> Upload(string id,string imageType,IFormCollection form)
        {
            try
            {
                List<IDigitalAsset> _list = new List<IDigitalAsset>();
                string _baseUrl = _config["ExternalSites:UIUrl"].ToString();
                string _userFilePath = _baseUrl + id;
                if (!Directory.Exists(_userFilePath)) Directory.CreateDirectory(_userFilePath);


                foreach (IFormFile file in form.Files)
                {
                    //using (var target = new MemoryStream())
                    //{
                    //    file.CopyTo(target);
                    //    target.ToBitmap()
                    //        //.ScaleToHeight(225)
                    //        .Save(_userFilePath + $"/{imageType}.jpg");

                    //    //IDigitalAsset _asset = await new DigitalAsset(_service)
                    //    //{
                    //    //    ArtistId = id,
                    //    //    FileName = file.FileName,
                    //    //    Data = target.ToArray(),
                    //    //    CreatedOn = DateTime.Now,
                    //    //    CreatedBy = "",
                    //    //    MimeType = file.ContentType
                    //    //}.Save();

                    //    //_list.Add(_asset);
                    //}
                    using (var stream = new FileStream(_userFilePath + $"/{imageType}.jpg", FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                }

                return OKResponse(_list,$"{imageType} file uploaded");

            }
            catch (Exception e)
            {
                return ErrorResponse(e);
            }

        }
        //

    }


    

}