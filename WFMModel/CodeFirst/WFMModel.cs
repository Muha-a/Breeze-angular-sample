using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Text;

namespace WFMModel
{
    public class WFMModelContainer : DbContext
    {
        public WFMModelContainer()
            : base("WFMModelContainer")
        {
        }

        public DbSet<TagTrigger> TagTriggerSet { get; set; }
        public DbSet<GPUTypicalCause> GPUTypicalCauseSet { get; set; }
        public DbSet<Employee> EmployeeSet { get; set; }
        public DbSet<GPUCause> GPUCauseSet { get; set; }
        public DbSet<GPUStop> GPUStopSet { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}
