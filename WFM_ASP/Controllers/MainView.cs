using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WFM;

namespace MvcApplication5.Controllers
{
    /// <summary>
    /// Контроллер возвращает главную страницу приложения
    /// </summary>
    public class MainViewController : Controller
    {        
        public ActionResult Index()
        {
            // к странице присоединяется информация об автотизации текущего пользователя (используется при настройке стрницы на клиенте)
            var user = System.Web.HttpContext.Current.User;

            HttpCookie cookie1 = new HttpCookie("userName");
            cookie1.Value = user.Identity.Name;
            HttpCookie cookie2 = new HttpCookie("role");
            cookie2.Value = UserRoles.GetUserRole(user.Identity.Name);

            HttpContext.Response.Cookies.Add(cookie1);
            HttpContext.Response.Cookies.Add(cookie2);

            return View();
        }
    }
}
