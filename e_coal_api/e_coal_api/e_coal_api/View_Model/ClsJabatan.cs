using e_coal_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace e_coal_api.View_Model
{
    public class ClsJabatan
    {
        db_eCoalDataContext db = new db_eCoalDataContext();

        public int ID { get; set; }
        public int ID_JABATAN { get; set; }
        public string JABATAN { get; set; }
        public DateTime CREATE_DATE { get; set; }
        public string CREATE_BY { get; set; }
        public string DISTRICT { get; set; }

        public IQueryable<TBL_M_JABATAN> getListJabatan()
        {
            var data = db.TBL_M_JABATANs.ToList().AsQueryable();
            return data;
        }

        public void saveJabatan()
        {
            TBL_M_JABATAN tbl = new TBL_M_JABATAN();
            /*tbl.id = id;*/
            tbl.JABATAN = JABATAN;
            tbl.CREATE_DATE = DateTime.Now;
            tbl.DISTRICT = DISTRICT;

            db.TBL_M_JABATANs.InsertOnSubmit(tbl);
            db.SubmitChanges();
        }

        public void deleteJabatan()
        {
            var query = db.TBL_M_JABATANs.Where(t => t.ID_JABATAN == ID_JABATAN).FirstOrDefault();
            db.TBL_M_JABATANs.DeleteOnSubmit(query);
            db.SubmitChanges();
        }
    }
}