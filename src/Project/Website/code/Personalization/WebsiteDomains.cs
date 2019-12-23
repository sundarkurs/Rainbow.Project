using Sitecore;
using Sitecore.Diagnostics;
using Sitecore.Rules;
using Sitecore.Sites;

namespace Rain.Project.Website.Personalization
{
    public class WebsiteDomains<T> : Sitecore.Rules.Conditions.SiteConditions.WebSiteNameCondition<T>
        where T : RuleContext
    {

        protected override bool Execute(T ruleContext)
        {
            Assert.ArgumentNotNull(ruleContext, "ruleContext");

            if (string.IsNullOrEmpty(base.Value))
            {
                return false;
            }

            var siteItem = Context.Database.GetItem(base.Value);
            if (siteItem == null)
            {
                return false;
            }

            var contextSite = Context.Site;
            if (contextSite == null)
            {
                return false;
            }

            return Compare(contextSite.Name, siteItem.Name);
        }

    }
}