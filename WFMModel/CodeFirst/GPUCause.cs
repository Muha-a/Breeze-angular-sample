using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WFMModel
{
    public partial class GPUCause
    {
        public int ID { get; set; }
        public string Comment { get; set; }
        public DateTime? RestartTime { get; set; }
        public string Work { get; set; }
        public DateTime? CreationTime { get; set; }
        public virtual Employee Employee { get; set; }
        public virtual GPUTypicalCause Cause { get; set; }
        public virtual GPUCause Replaces { get; set; }

        public int? EmployeeID { get; set; }
        public int? CauseID { get; set; }
        public int? ReplacesID { get; set; }                
    }
}
