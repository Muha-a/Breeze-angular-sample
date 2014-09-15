using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WFMUseful.Scheduler
{
    public interface IWFMTimer
    {
        /// <summary>
        /// Интервал, мс
        /// </summary>        
        void SetInterval(int p);
        /// <summary>
        /// Пуск таймера
        /// </summary>
        void Start();
        /// <summary>
        /// Таймер запущен
        /// </summary>
        bool Enabled(); 
        /// <summary>
        /// Приостановка таймера
        /// </summary>
        void Stop();
        /// <summary>
        /// Установить вызываемую таймером функцию
        /// </summary>        
        void SetTick(EventHandler eventHandler);
        /// <summary>
        /// Уничтожить таймер
        /// </summary>
        void Dispose();
    }
}
