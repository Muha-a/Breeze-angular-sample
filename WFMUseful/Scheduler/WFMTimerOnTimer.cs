using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace WFMUseful.Scheduler
{
    internal class WFMTimerOnTimer : IWFMTimer
    {
        private Timer timer = new Timer();

        public void SetInterval(int interval)
        {
            if (interval == 0)
                interval = 30000;
            else
                timer.Interval= interval;
        }

        public void Start()
        {
            timer.Start();
        }

        public bool Enabled()
        {
            return timer.Enabled;
        }

        public void SetTick(EventHandler eventHandler)
        {            
            timer.Tick += eventHandler;
        }

        public void Dispose()
        {
            timer.Dispose();
        }

        public void Stop()
        {
            timer.Stop();
        }
    }
}
