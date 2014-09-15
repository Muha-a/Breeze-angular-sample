using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WFMUseful.Scheduler
{
    /// <summary>
    /// Фабрика таймеров, иммитирующих однопоточную работу таймеров Forms.Timer на базе шедулера
    /// </summary>
    public class SchedulerTimerFactory : ITimerFactory
    {

        private Scheduler scheduler = null;

        public SchedulerTimerFactory()
        {
            scheduler = new Scheduler();
            scheduler.Start();
        }

        public IWFMTimer NewTimer()
        {
            WFMTimerOnScheduler t= new WFMTimerOnScheduler(scheduler);
            scheduler.AddTimer(t);
            return t;
        }

        public void DisposeTimers()
        {
            scheduler.Dispose();
        }
    }
}
