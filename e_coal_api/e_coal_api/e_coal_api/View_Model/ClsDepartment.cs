using e_coal_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace e_coal_api.View_Model
{
    public class ClsDepartment
    {
        db_eCoalDataContext db = new db_eCoalDataContext();

        public int ID { get; set; }
        public string DEPARTMENT { get; set; }

        public IQueryable<VW_DEPT> getListDepartment()
        {
            var data = db.VW_DEPTs.ToList().AsQueryable();
            return data;
        }
    }
}