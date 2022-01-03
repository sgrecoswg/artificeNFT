using Microsoft.AspNetCore.Http;

namespace SensibleProgramming.ArtificeNFT
{
    public static class AppContext
    {
        public static IHttpContextAccessor _httpContextAccessor;

        public static void Configure(IHttpContextAccessor accessor)
        {
            _httpContextAccessor = accessor;
        }

        public static HttpContext Current => _httpContextAccessor.HttpContext;
    }
}
