using e_coal_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace e_coal_api.View_Model
{
    public class ClsDistrict
    {
        db_eCoalDataContext db = new db_eCoalDataContext();
        public int ID { get; set; }
        public string DISTRICT { get; set; }

        public IQueryable<VW_DISTRICT> getListDistrict()
        {
            var data = db.VW_DISTRICTs.ToList().AsQueryable();
            return data;
        }
    }
}