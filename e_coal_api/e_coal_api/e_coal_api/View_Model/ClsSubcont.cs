using e_coal_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace e_coal_api.View_Model
{
    public class ClsSubcont
    {
        db_eCoalDataContext db = new db_eCoalDataContext();

        public int ID { get; set; }
        public string SUBCONT { get; set; }

        public IQueryable<TBL_M_SUBCONT> getListSubcont()
        {
            var data = db.TBL_M_SUBCONTs.ToList().AsQueryable();
            return data;
        }
    }
}