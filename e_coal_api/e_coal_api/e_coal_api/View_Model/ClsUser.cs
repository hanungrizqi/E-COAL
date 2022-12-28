using e_coal_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace e_coal_api.View_Model
{
    public class ClsUser
    {
        db_eCoalDataContext db = new db_eCoalDataContext();

        public int ID { get; set; }
        public string NRP { get; set; }
        public int ID_PROFILE { get; set; }
        public string DISTRICT { get; set; }
        public DateTime CREATE_DATE { get; set; }
        public string CREATE_BY { get; set; }

        public IQueryable<VW_USER_PROFILE> getListUser()
        {
            var data = db.VW_USER_PROFILEs.ToList().AsQueryable();
            return data;
        }

        public void saveUser()
        {
            TBL_M_USER tbl = new TBL_M_USER();
            /*tbl.id = id;*/
            tbl.NRP = NRP;
            tbl.ID_PROFILE = ID_PROFILE;
            tbl.DISTRICT = DISTRICT;
            tbl.CREATE_DATE = DateTime.Now;

            db.TBL_M_USERs.InsertOnSubmit(tbl);
            db.SubmitChanges();
        }

        public void updateUser()
        {
            var Query = db.TBL_M_USERs.Where(x => x.ID == ID).FirstOrDefault();
            Query.NRP = NRP;
            Query.ID_PROFILE = ID_PROFILE;
            Query.DISTRICT = DISTRICT;
            Query.CREATE_DATE = DateTime.Now;
            db.SubmitChanges();
        }
        public void deleteUser()
        {
            var query = db.TBL_M_USERs.Where(t => t.ID == ID).FirstOrDefault();
            db.TBL_M_USERs.DeleteOnSubmit(query);
            db.SubmitChanges();
        }
    }
}