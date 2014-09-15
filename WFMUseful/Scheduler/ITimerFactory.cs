using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WFMUseful.Scheduler
{
    /// <summary>
    /// Фабрика таймеров, иммитирующих однопоточную работу таймеров Forms.Timer
    /// </summary>
    public interface ITimerFactory
    {
        IWFMTimer NewTimer();
        void DisposeTimers();
    }
}
