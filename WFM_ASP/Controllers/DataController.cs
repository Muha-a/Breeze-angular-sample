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
    /// The controler serves the non-standard requests of the client (not view html or model objects)
    /// </summary>
    public class DataController : ApiController
    {
        [Authorize]
        [HttpGet]
        public HttpResponseMessage GPUStopReport([FromUri] GPUStopRepParams parameters)
        {
            // запросить отчет 
            var par = new List<JsReportParameter>();
            if (parameters.GPUName != null)
            {
                par.Add(new JsReportParameter() { name = "objFilterOn", value = 1 });
                par.Add(new JsReportParameter() { name = "objName", value = parameters.GPUName });
            }
            if (parameters.CauseType != null)
            {
                par.Add(new JsReportParameter() { name = "typeFilterOn", value = 1 });
                par.Add(new JsReportParameter() { name = "typicalId", value = parameters.CauseType });
            }
            if (parameters.FailType != null)
            {
                par.Add(new JsReportParameter() { name = "failFilterOn", value = 1 });
                par.Add(new JsReportParameter() { name = "failType", value = parameters.FailType });
            }
            if (parameters.StartTime != null)
            {
                par.Add(new JsReportParameter() { name = "timeFilterOn", value = 1 });
                par.Add(new JsReportParameter() { name = "timeStart", value = parameters.StartTime });
                par.Add(new JsReportParameter() { name = "timeEnd", value = parameters.EndTime });
            }
            Stream rep = JasperHttpHelper.GetReportAsPdf("santaReport", par.ToArray(), BASampleConfig.GetJasperPort());
            // to return the report
            var response = new HttpResponseMessage(HttpStatusCode.OK);
            response.Content = new StreamContent(rep);
            response.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue("application/pdf");
            return response;
        }
        
        /// <summary>
        /// Returns count of new GPUStop documents
        /// </summary>
        [HttpGet]
        public HttpResponseMessage NewDocCount(string parameters)
        {
            int cnt = 0;
            // прочитать в базе если пора
            WFMModelContainer db = new WFMModelContainer();
            foreach (var st in db.GPUStopSet.Where(s => s.CauseDoc == null).ToArray())
                cnt++;
            db.Dispose();
            HttpContext.Current.Application.Contents.Set("DocCount", cnt);
            
            object storedCount = HttpContext.Current.Application.Contents.Get("DocCount");
            if (storedCount!=null)
                cnt = (int)storedCount;
            // ответить
            var response = new HttpResponseMessage(HttpStatusCode.OK);
            response.Content = new StringContent(cnt.ToString());
            return response;
        }

    }

    public class GPUStopRepParams
    {
        /// <summary>
        /// Time interval
        /// </summary>
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        /// <summary>
        ///  wich GPU
        /// </summary>
        public string GPUName { get; set; }
        /// <summary>
        /// Typical cause
        /// </summary>
        public int? CauseType { get; set; }
        /// <summary>
        /// GPU stop time
        /// </summary>
        public int? FailType { get; set; }
    }

}
