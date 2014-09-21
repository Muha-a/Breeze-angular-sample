using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace WFMModel
{
    public partial class Employee
    {
        public int Id { get; set; }
        public string Surname { get; set; }
        public string Name { get; set; }
        public string Patronymic { get; set; }
        public string UserName { get; set; }
        public string Role { get; set; }        
    }
}
