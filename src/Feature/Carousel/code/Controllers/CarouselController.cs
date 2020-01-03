using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Rain.Feature.Carousel.Models;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.Mvc.Presentation;

namespace Rain.Feature.Carousel.Controllers
{
    public class CarouselController : Controller
    {
        public ActionResult Slides()
        {
            var dataSourceItem = DataSourceItem;
            if (dataSourceItem != null)
            {

            }
            
            return View(dataSourceItem);
        }

        public Item DataSourceItem
        {
            get
            {
                try
                {
                    var str = RenderingContext.Current.Rendering.DataSource;
                    return string.IsNullOrEmpty(str) ? null : RenderingContext.Current.Rendering.Item;
                }
                catch (Exception)
                {
                    return null;
                }
            }
        }
    }
}