using System;
using System.Collections.Generic;
using System.Security.Principal;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;

namespace SensibleProgramming.ArtificeNFT.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public abstract class BaseAPIController<T> : ControllerBase
    {
        ILogger<T> _logger;
        IMemoryCache _cache;
        public WindowsIdentity Current => (WindowsIdentity)AppContext.Current.User.Identity;


        public BaseAPIController(ILogger<T> logger)
        {
            _logger = logger;
        }

        public BaseAPIController(ILogger<T> logger, IMemoryCache cache) : this(logger)
        {
            _cache = cache;
        }

        protected ActionResult<dynamic> OKResponse(dynamic o, string message, Dictionary<string, string> extraData = null)
        {

            var _p = new Dictionary<string, string>();
            _p.Add("Controller", RouteData.Values["controller"].ToString());
            _p.Add("Action", RouteData.Values["action"].ToString());
            _p.Add("status", "success");
            //_p.Add("currentuser", CurrentUser.Name);

            if (extraData != null)
            {
                foreach (var p in extraData)
                {
                    _p.Add(p.Key, p.Value);
                }
            }

            switch (Environment.GetEnvironmentVariable("SP_Enviornment"))
            {
                case "Local":

                    return new
                    {
                        status = "success",
                        message,
                        items = o
                    };
                default:
                    return new
                    {
                        status = "success",
                        message,
                        items = o
                    };
            }
        }

        protected ActionResult<dynamic> WarnResponse(dynamic o, string message, Dictionary<string, string> extraData = null)
        {

            var _p = new Dictionary<string, string>();
            _p.Add("Controller", RouteData.Values["controller"].ToString());
            _p.Add("Action", RouteData.Values["action"].ToString());
            _p.Add("status", "warn");
            //_p.Add("currentuser", CurrentUser.Name);

            if (extraData != null)
            {
                foreach (var p in extraData)
                {
                    _p.Add(p.Key, p.Value);
                }
            }

            switch (Environment.GetEnvironmentVariable("SP_Enviornment"))
            {
                case "Local":

                    return new
                    {
                        status = "warn",
                        message,
                        items = o
                    };
                default:
                    return new
                    {
                        status = "warn",
                        message,
                        items = o
                    };
            }
        }

        protected ActionResult<dynamic> ErrorResponse(Exception exc)
        {

            var _p = new Dictionary<string, string>();
            _p.Add("Controller", RouteData.Values["controller"].ToString());
            _p.Add("Action", RouteData.Values["action"].ToString());
            _p.Add("status", "error");
            _p.Add("stackTrace", exc.StackTrace);
            //_p.Add("currentuser", CurrentUser.Name);



            switch (Environment.GetEnvironmentVariable("SP_Enviornment"))
            {
                case "Local":
                    return new
                    {
                        status = "error",
                        exc.Message,
                        stackTrace = exc.StackTrace
                    };
                default:
                    return new
                    {
                        status = "error",
                        exc.Message
                    };
            }
        }
    }
}