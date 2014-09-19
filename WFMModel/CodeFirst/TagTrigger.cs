using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WFMModel
{
    public partial class TagTrigger
    {
        public int Id { get; set; }
        public string CondExpression { get; set; }
        public Nullable<int> Pause { get; set; }
        public string ObjName { get; set; }
        public string DocClass { get; set; }
        public string DocContent { get; set; }
    }
}
