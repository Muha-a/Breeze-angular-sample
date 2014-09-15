using Breeze.ContextProvider;
using Breeze.ContextProvider.EF6;
using Breeze.WebApi2;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WFMAsp;
using WFMModel;

namespace MvcApplication5.Controllers
{
    /// <summary>
    /// Entity frameworm model controller; it is necessary to add function for each class
    /// </summary>
    [Authorize]
    [BreezeController]    
    public class ModelController : ApiController
    {
        readonly EFContextProvider<WFMModelContainer> _contextProvider =
                new EFContextProvider<WFMModelContainer>();

        // ~/breeze/todos/Metadata        
        [HttpGet]
        public string Metadata()
        {            
            return _contextProvider.Metadata();
        }
        
        [HttpGet]
        public IQueryable<TagTrigger> TagTriggerSet()
        {
            return _contextProvider.Context.TagTriggerSet;
        }
        
        [HttpGet]
        public IQueryable<GPUTypicalCause> GPUTypicalCauseSet()
        {
            return _contextProvider.Context.GPUTypicalCauseSet;
        }

        [HttpGet]
        public IQueryable<GPUCause> GPUCauseSet()
        {
            return _contextProvider.Context.GPUCauseSet;
        }
        [HttpGet]
        public IQueryable<GPUStop> GPUStopSet()
        {
            return _contextProvider.Context.GPUStopSet;
        }

        [HttpGet]
        public IQueryable<Employee> EmployeeSet()
        {
            return _contextProvider.Context.EmployeeSet;
        }
        
        [HttpPost]
        public SaveResult SaveChanges(JObject saveBundle)
        {                        
            return _contextProvider.SaveChanges(saveBundle);
        }
    }
}

// http://ricardodsanchez.com/2012/04/18/how-to-secure-your-asp-net-mvc-application-and-use-active-directory-as-the-membership-provider/

