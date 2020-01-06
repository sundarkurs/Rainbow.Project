using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Rain.Feature.Carousel.Models;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.Mvc.Presentation;
using Sitecore.Resources.Media;

namespace Rain.Feature.Carousel.Controllers
{
    public class CarouselController : Controller
    {
        public ActionResult Slides()
        {
            var carousel = new List<_Carousel>();

            var dataSourceItem = DataSourceItem;
            if (dataSourceItem != null)
            {
                IEnumerable<Item> slideImages = null;
                var slideImagesField = new MultilistField(dataSourceItem.Fields["Slide Images"]);

                if (slideImagesField != null)
                {
                    slideImages = slideImagesField.GetItems();
                }

                if (slideImages != null)
                {
                    foreach (var carouselItem in slideImages)
                    {
                        var mediaItem = (MediaItem)carouselItem;
                        carousel.Add(new _Carousel() { ImageUrl = MediaManager.GetMediaUrl(mediaItem) });
                    }
                }
            }

            return View(carousel);
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