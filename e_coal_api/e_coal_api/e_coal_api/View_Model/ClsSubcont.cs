using e_coal_api.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;

namespace e_coal_api.View_Model
{
    public class ClsSubcont
    {
        db_eCoalDataContext db = new db_eCoalDataContext();

        public int ID { get; set; }
        public string SUBCONT_CODE { get; set; }
        public string SUBCONT_NAME { get; set; }
        public DateTime CREATE_DATE { get; set; }
        public string CRETATE_BY { get; set; }
        public string DISTRICT { get; set; }
        public string SUBCONT { get; set; }

        public IQueryable<TBL_M_SUBCONT> getListSubcont()
        {
            var data = db.TBL_M_SUBCONTs.ToList().AsQueryable();
            return data;
        }

        public void saveSubcont()
        {
            TBL_M_SUBCONT tbl = new TBL_M_SUBCONT();
            /*tbl.id = id;*/
            tbl.SUBCONT_CODE = SUBCONT_CODE;
            tbl.SUBCONT_NAME = SUBCONT_NAME;
            tbl.CREATE_DATE = DateTime.Now;
            tbl.DISTRICT = DISTRICT;

            db.TBL_M_SUBCONTs.InsertOnSubmit(tbl);
            db.SubmitChanges();
        }

        public void updateSubcont()
        {
            var Query = db.TBL_M_SUBCONTs.Where(x => x.ID == ID).FirstOrDefault();
            Query.SUBCONT_CODE = SUBCONT_CODE;
            Query.SUBCONT_NAME = SUBCONT_NAME;
            Query.CREATE_DATE = DateTime.Now;
            Query.DISTRICT = DISTRICT;
            db.SubmitChanges();
        }
        public void deleteSubcont()
        {
            var query = db.TBL_M_SUBCONTs.Where(t => t.ID == ID).FirstOrDefault();
            db.TBL_M_SUBCONTs.DeleteOnSubmit(query);
            db.SubmitChanges();
        }
    }
}