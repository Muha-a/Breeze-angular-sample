using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WFMUseful.Scheduler
{
    /// <summary>
    /// Фабрика таймеров, иммитирующих однопоточную работу таймеров Forms.Timer на базе таймеров Forms.Timer (нужен для обобщения архитектуры)
    /// </summary>
    public class FormsTimerFactory : ITimerFactory
    {

        public IWFMTimer NewTimer()
        {
            return new WFMTimerOnTimer();
        }


        public void DisposeTimers()
        {
            // таймеры диспозятся системой
            return;
        }
    }
}
