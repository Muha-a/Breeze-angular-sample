using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WFMModel
{
    public class GPUTypicalCause
    {
        public GPUTypicalCause()
        {
            this.IsFailure = false;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Comment { get; set; }
        public bool IsFailure { get; set; }
    }
}
