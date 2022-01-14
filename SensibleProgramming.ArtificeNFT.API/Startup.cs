using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using SensibleProgramming.ArtificeNFT.Data;
using SensibleProgramming.ArtificeNFT.Data.Cosmos;
using SensibleProgramming.ArtificeNFT.FileIO;

namespace SensibleProgramming.ArtificeNFT.API
{
    public class Startup
    {
        string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

#if DEBUG
            services.AddCors(options =>
            {
                options.AddPolicy(MyAllowSpecificOrigins,
                builder =>
                {
                    builder.WithOrigins("https://localhost:44348")
                           .AllowAnyHeader()
                           .WithMethods("GET", "POST", "PUT", "DELETE");
                          // .AllowCredentials();
                });
            });
#endif

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton(Configuration);
            services.AddMemoryCache();
            services.AddDataServices(Configuration);

            services.AddHttpContextAccessor();
            //services.AddResponseCaching();

          

            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            

            app.UseHttpsRedirection();
            AppContext.Configure(app.ApplicationServices.GetRequiredService<IHttpContextAccessor>());
            app.UseRouting();

            //app.UseResponseCaching();
            //app.UseAuthentication();
            //app.UseAuthorization();

#if DEBUG
            app.UseCors(MyAllowSpecificOrigins);
#endif
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }

    public static class StartupX10sions
    {
        public static void AddDataServices(this IServiceCollection services, IConfiguration config)
        {
            var serviceProvider = services.BuildServiceProvider();
            IMemoryCache _cache = serviceProvider.GetService<IMemoryCache>();

            //services.AddTransient<IDigitalAssetDataService, DigitalAssetDataService>(x => ActivatorUtilities.CreateInstance<DigitalAssetDataService>(x, config, _cache));
            services.AddTransient<IDigitalAssetDataService, DigitalAssestFileIOService>(x => ActivatorUtilities.CreateInstance<DigitalAssestFileIOService>(x, config, _cache));

            var _cosmosConfig = config.GetSection("CosmosDb");
            string databaseName = _cosmosConfig.GetSection("DatabaseName").Value;
            string containerName = _cosmosConfig.GetSection("ContainerName").Value;
            string account = _cosmosConfig.GetSection("Account").Value;
            string key = _cosmosConfig.GetSection("Key").Value;
                        
            ArtistsCosmosDbService _client = CosmosDataClientFactory.InitializeArtistsCosmosClientInstanceAsync(account,key,databaseName,containerName).GetAwaiter().GetResult();
            services.AddSingleton<IArtistsCosmosDbService>(_client);
        }
    }
}
