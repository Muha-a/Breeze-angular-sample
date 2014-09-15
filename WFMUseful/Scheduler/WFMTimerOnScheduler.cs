using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WFMUseful.Scheduler
{
    internal class WFMTimerOnScheduler : IWFMTimer
    {        
        private Scheduler scheduler;

        private int interval = 1000;

        private bool enabled = false;

        private EventHandler eventHandler;

        public WFMTimerOnScheduler(Scheduler scheduler)
        {
            this.scheduler = scheduler;
        }

        public void SetInterval(int interval)
        {
            this.interval = interval;
        }

        public void Start()
        {
            enabled = true;
        }

        public bool Enabled()
        {
            return enabled;
        }

        public void SetTick(EventHandler eventHandler)
        {
            this.eventHandler = eventHandler;
        }        

        public void Dispose()
        {            
            scheduler.DisposeTimer(this);
            scheduler = null;
        }


        public void Stop()
        {
            enabled = false;
        }

        internal EventHandler GetEventHandler()
        {
            return eventHandler;
        }

        internal double GetInterval()
        {
            return interval;
        }
    }
}
