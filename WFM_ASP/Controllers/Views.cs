using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcApplication5.Controllers
{
    /// <summary>
    /// Контроллер возвращает html представлений
    /// </summary>
    public class ViewsController : Controller
    {
        public ActionResult Get(string id)
        {            
            return File(Server.MapPath("/WFM/app/views/") + id + ".html", "text/html");
        }
    }
}
