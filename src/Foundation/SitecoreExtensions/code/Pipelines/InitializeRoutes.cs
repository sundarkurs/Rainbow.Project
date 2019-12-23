using System;
using Sitecore.Pipelines;
using System.Web.Mvc;
using System.Web.Routing;

namespace Rain.Foundation.SitecoreExtensions.Pipelines
{
    public class InitializeRoutes
    {
        public void Process(PipelineArgs args)
        {
            RouteTable.Routes.IgnoreRoute("{resource}.axd/{*pathInfo}");


        }
    }
}