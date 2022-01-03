using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using SensibleProgramming.ArtificeNFT.Data;
using SensibleProgramming.ArtificeNFT.Data.Cosmos;
using System.Threading.Tasks;

namespace SensibleProgramming.ArtificeNFT
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options => {
                options.AddPolicy("SpecificOrigins", builder => {
                    builder.WithOrigins("https://localhost:44328/")
                            .AllowAnyHeader()
                            .WithHeaders("GET");
                            //.AllowCredentials();
                });
            });

            services.AddControllersWithViews();

            services.AddHttpContextAccessor();
            services.AddResponseCaching();
            services.AddMemoryCache();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseCors(builder => {

                builder.WithOrigins("https://localhost:44328/")
                        .AllowAnyHeader()
                        .WithHeaders("GET");
                        //.AllowCredentials();

            });

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();
            
            app.UseResponseCaching();

            //app.UseEndpoints(endpoints =>
            //{
            //    endpoints.MapControllerRoute(
            //        name: "default",
            //        pattern: "{controller}/{action=Index}/{id?}");
            //});

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }

   
}

/*
 <rewrite>
    <rules>
        <rule name="ReactRouter Routes" stopProcessing="true">
            <conditions logicalGrouping="MatchAll">
                <match url="*" />
                <conditions input="[REQUEST_FILENAME]" matchType="IsFile" negate="true" />
                <conditions input="[REQUEST_FILENAME]" matchType="IsDirectory" negate="true" />
            </conditions>
                <action type="Rewrite" url="/<><><>/index.html">

     
     */
