#define framework_40
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
#if !framework_35 
using System.Threading.Tasks;
using System.Collections.Concurrent;
#endif
using System.Threading;



namespace WFMUseful.Scheduler
{
    /// <summary>
    /// Обеспечивает запуск таймеров согласно указанным интервалам
    /// </summary>
    internal class Scheduler
    {
#if !framework_35
        ConcurrentDictionary<WFMTimerOnScheduler, DateTime?> timers = new ConcurrentDictionary<WFMTimerOnScheduler, DateTime?>();
#endif

        volatile bool stop = false;
#if !framework_35 
        Task mainCycle;
#endif

        internal void Start()
        {
#if !framework_35 
            // запускаем бесконечный цикл обработки 
            mainCycle = Task.Factory.StartNew(() => 
                {
                    while (!stop)
                    {
                        Thread.Sleep(100);
                        foreach (var tm in timers)
                        {
                            // если таймер не работает - обнулить время сработки
                            if (!tm.Key.Enabled())
                            {
                                if (tm.Value.HasValue)
                                    timers[tm.Key] = null;
                            }
                            else
                            {
                                // если еще не срабатывал - начать отсчет
                                if (!tm.Value.HasValue)
                                    timers[tm.Key] = DateTime.Now;
                                else // срабатывал - посмотреть не пора ли
                                    if (IsTimeToTick(tm.Key, tm.Value))
                                    {
                                        EventHandler ev = tm.Key.GetEventHandler();
                                        if (ev != null)
                                            ev(null, new EventArgs());
                                        timers[tm.Key] = DateTime.Now;
                                    }
                            }
                        }
                    }
                } );
#endif
        }

        private bool IsTimeToTick(WFMTimerOnScheduler timer, DateTime? lastTick)
        {
            return (DateTime.Now - lastTick.Value).TotalMilliseconds > timer.GetInterval();
        }

        internal void DisposeTimer(WFMTimerOnScheduler timer)
        {
#if !framework_35
            DateTime? t;
            timers.TryRemove(timer, out t);
#endif
        }

        internal void Dispose()
        {
#if !framework_35
            stop = true;
            Task.WaitAll(mainCycle);
#endif
        }

        internal void AddTimer(WFMTimerOnScheduler t)
        {
#if !framework_35
            timers.TryAdd(t, null);
#endif
        }
    }
}
