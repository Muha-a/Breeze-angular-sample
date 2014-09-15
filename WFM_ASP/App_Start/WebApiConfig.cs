using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace MvcApplication5
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // маршрут для доступа к функциям контроллеров отвечающих на запросы пользователей, не связанные с получением представлений и объектов модели.
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{parameters}",
                defaults: new { parameters = RouteParameter.Optional }
            );
        }
    }
}
