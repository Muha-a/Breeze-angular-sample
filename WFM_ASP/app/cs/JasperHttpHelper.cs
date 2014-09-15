using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;

namespace WFMAsp
{
    public class JasperHttpHelper
    {
        /// <summary>
        /// Запрашивает и возвращает отчет с jasper-сервера
        /// </summary>
        public static Stream GetReportAsPdf(string repName, JsReportParameter[] repPar, int port)
        {
            string parameters = "";
            foreach (var p in repPar)
                parameters += (repPar.First()==p? "?":"&") + p.name + "=" + p.value.ToString();
                HttpWebRequest getR = (HttpWebRequest)WebRequest.Create("http://localhost:" + port.ToString() + "/jasperserver/rest_v2/reports/reports/" + repName + ".pdf" + parameters);
                getR.Credentials = new NetworkCredential("jasperadmin", "jasperadmin");
                getR.Method = "GET";
                //getR.CookieContainer = new CookieContainer();
                //getR.ContentType = "application/x-www-form-urlencoded";
                WebResponse response = getR.GetResponse();
                string st = ((HttpWebResponse)response).StatusDescription;
                Stream dataStream = response.GetResponseStream();
                MemoryStream result = new MemoryStream();
                dataStream.CopyTo(result);
                result.Position = 0;
                response.Close();            
            return result;
        }
    }

    public class JsReportParameter
    {
        public string name;
        public object value;
    }

}