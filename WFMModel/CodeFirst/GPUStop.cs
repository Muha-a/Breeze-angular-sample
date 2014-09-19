using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WFMModel
{
    public partial class GPUStop
    {
        public string ObjName { get; set; }
        public Nullable<System.DateTime> EventTime { get; set; }
        public Nullable<System.DateTime> RevocationTime { get; set; }
        public int Id { get; set; }
        public Nullable<int> GPUCauseId { get; set; }
        public virtual GPUCause CauseDoc { get; set; }
    }
}
