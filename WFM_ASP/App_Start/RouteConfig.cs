using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace MvcApplication5
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            // Стандартный контроллер ASP, возвращающий представления (страницы cshtml).
            // Здесь используется только для того, чтобы вернуть главную страницу.
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "MainView", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}