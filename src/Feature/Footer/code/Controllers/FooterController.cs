using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Rain.Feature.Footer.Models;
using Sitecore;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.Mvc.Presentation;

namespace Rain.Feature.Footer.Controllers
{
    public class FooterController : Controller
    {
        // GET: Footer
        public ActionResult MainFooter()
        {
            var viewModel = new List<_GenericLink>();

            var dataSourceItem = DataSourceItem;
            if (dataSourceItem != null)
            {
                var navigationLinks = dataSourceItem.Children;

                if (navigationLinks != null || navigationLinks.Count > 0)
                {
                    navigationLinks.ToList().ForEach(x =>
                    {
                        viewModel.Add(new _GenericLink()
                        {
                            Title = x.Fields["Title"].ToString(),
                            Link = (LinkField)x.Fields["Link"]
                        });
                    });
                }
            }

            return View(viewModel);
        }

        public ActionResult Copyright()
        {
            var item = Context.Database.GetItem(Context.Site.RootPath);
            return View(new Copyright() { Text = item.Fields["Copyright"].ToString() });
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