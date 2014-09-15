using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WFMUseful.Scheduler
{

    public enum TimerFactoryTypes
    {
        FormsTimer,
        SchedulerTimer
    }

    /// <summary>
    /// Синглтоны фабрик таймеров
    /// </summary>
    public static class TimerFactories
    {
        /// <summary>
        /// Настройка, указывающая какая  фабрика будет возвращаться при запросе синглтона
        /// </summary>
        public static TimerFactoryTypes FactoryType = TimerFactoryTypes.FormsTimer;

        /// <summary>
        /// Синглтон с готовой фабрикой, если нет необходимости создавать фабрику отдельно
        /// </summary>        
        public static ITimerFactory GetTimerFactory()
        {
            if (FactoryType == TimerFactoryTypes.FormsTimer)
                return GetFormsTimerFactorySingleton();
            else
                return GetSchedulerTimerFactorySingleton();
        }

        private static FormsTimerFactory formsTimerFactorySingleton = null;

        private static SchedulerTimerFactory shedulerFactorySingleton = null;

        /// <summary>
        /// Синглтон с готовой фабрикой, если нет необходимости создавать фабрику отдельно
        /// </summary>        
        public static ITimerFactory GetFormsTimerFactorySingleton()
        {
            if (formsTimerFactorySingleton == null)
                formsTimerFactorySingleton = new FormsTimerFactory();
            return formsTimerFactorySingleton;
        }

        /// <summary>
        /// Синглтон с готовой фабрикой, если нет необходимости создавать фабрику отдельно
        /// </summary>        
        public static ITimerFactory GetSchedulerTimerFactorySingleton()
        {
            if (shedulerFactorySingleton == null)
                shedulerFactorySingleton = new SchedulerTimerFactory();
            return shedulerFactorySingleton;
        }



    }
}
