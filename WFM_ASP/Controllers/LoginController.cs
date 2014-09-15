using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;
using System.Web.Security;
using WFM;
using WFMAsp;
using WFMModel;

namespace MvcApplication5.Controllers
{
    /// <summary>
    /// Authorization requests processing
    /// </summary>
    public class LoginController : ApiController
    {

        [HttpPost]
        public HttpResponseMessage Login([FromUri] LoginStruct parameters)
        {
            try
            {
                var response = new HttpResponseMessage(HttpStatusCode.OK);
                //var response = new HttpResponseMessage(HttpStatusCode.OK);
                var responseContent = "userName=" + parameters.user + ";" + "role=" + UserRoles.GetUserRole(parameters.user);
                // авторизация
                // AD authorization disabled or user exists in Active Directory
                if (BASampleConfig.AD_Off()||Membership.ValidateUser(parameters.user, parameters.password))
                {                       
                    // authorization timeout: at 8:00 or 20:00;
                    DateTime endAuthTime;
                    var now = DateTime.Now;
                    if (now.TimeOfDay >= TimeSpan.FromHours(8) && now.TimeOfDay <= TimeSpan.FromHours(20))
                        endAuthTime = now.Date + TimeSpan.FromHours(20);
                    else
                        if (now.TimeOfDay < TimeSpan.FromHours(8))
                            endAuthTime = now.Date + TimeSpan.FromHours(8);
                        else
                            endAuthTime = now.Date.AddDays(1) + TimeSpan.FromHours(8);                    
                    FormsAuthenticationTicket ticket = new FormsAuthenticationTicket(1,
                      parameters.user,
                      DateTime.Now,                        
                        endAuthTime,
                      true,
                      "content",
                      FormsAuthentication.FormsCookiePath);                    
                    string encTicket = FormsAuthentication.Encrypt(ticket);
                    var userCookie = new HttpCookie(FormsAuthentication.FormsCookieName, encTicket);                    
                                        
                    userCookie.Expires=DateTime.Now.AddYears(15);
                    HttpContext.Current.Response.Cookies.Set(userCookie);

                    response.Content = new StringContent("userName=" + parameters.user + ";" + "role=" + UserRoles.GetUserRole(parameters.user));
                    return response;
                }
                else
                {                    
                    response.Content = new StringContent("fail");
                    return response;
                }                
            }
            catch (Exception e)
            {
                var response = new HttpResponseMessage(HttpStatusCode.OK);
                response.Content = new StringContent(e.Message+" stack: "+e.StackTrace+e.InnerException==null? "": (" inner:"+e.Message+" stack: "+e.StackTrace));
                return response;
            }
        }

        [HttpPost]
        public HttpResponseMessage LogOut()
        {
            FormsAuthentication.SignOut();
            var response = new HttpResponseMessage();            
            response.Content = new StringContent("Ok");
            return response;
        }

    }

    public class LoginStruct
    {
        public string user { get; set; }
        public string password { get; set; }
    }
}
