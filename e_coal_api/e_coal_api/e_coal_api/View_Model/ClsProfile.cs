using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc.Ajax;
using e_coal_api.Models;

namespace e_coal_api.View_Model
{
	public class ClsProfile
	{
        db_eCoalDataContext db = new db_eCoalDataContext();

        public string PROFILE { get; set; }

        public IQueryable<TBL_M_PROFILE> getListProfile()
        {
            var data = db.TBL_M_PROFILEs.ToList().AsQueryable();
            return data;
        }
    }
}