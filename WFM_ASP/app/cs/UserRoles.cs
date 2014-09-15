using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WFMModel;

namespace WFM
{
    public static class UserRoles
    {
        /// <summary>
        /// Прочитать роль пользователя из базы
        /// </summary>
        public static string GetUserRole(string userName)
        {
            using (var dm = new WFMModelContainer())
            {
                var emp = dm.EmployeeSet.FirstOrDefault(e => e.UserName == userName);
                return emp == null ? "uknown" : emp.Role;
            }
        }

    }
}