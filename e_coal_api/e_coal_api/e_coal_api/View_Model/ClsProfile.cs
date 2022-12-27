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

        public int id { get; set; }
        public string PROFILE { get; set; }

        public IQueryable<TBL_M_PROFILE> getListProfile()
        {
            var data = db.TBL_M_PROFILEs.ToList().AsQueryable();
            return data;
        }

        public void saveProfile()
        {
            TBL_M_PROFILE tbl = new TBL_M_PROFILE();
            /*tbl.id = id;*/
            tbl.PROFILE = PROFILE;

            db.TBL_M_PROFILEs.InsertOnSubmit(tbl);
            db.SubmitChanges();
        }

        public void updateProfile()
        {
            var Query = db.TBL_M_PROFILEs.Where(x => x.id == id).FirstOrDefault();
            Query.PROFILE = PROFILE;
            db.SubmitChanges();
        }

        public void deleteProfile()
        {
            var query = db.TBL_M_PROFILEs.Where(t => t.id == id).FirstOrDefault();
            db.TBL_M_PROFILEs.DeleteOnSubmit(query);
            db.SubmitChanges();
        }
    }
}