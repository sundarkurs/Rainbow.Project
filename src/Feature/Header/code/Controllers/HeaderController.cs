using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Rain.Feature.Header.Models;
using Sitecore.Data.Fields;
using Sitecore.Data.Items;
using Sitecore.Mvc.Presentation;


namespace Rain.Feature.Header.Controllers
{
    public class HeaderController : Controller
    {

        public ActionResult MainHeader()
        {
            return View();
        }

        public ActionResult MainHeaderWithLinks()
        {
            return View();
        }

        public ActionResult TopHeader()
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