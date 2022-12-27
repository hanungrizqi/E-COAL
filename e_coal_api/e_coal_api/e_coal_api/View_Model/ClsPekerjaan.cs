using e_coal_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace e_coal_api.View_Model
{
    public class ClsPekerjaan
    {
        db_eCoalDataContext db = new db_eCoalDataContext();

        public int ID { get; set; }
        public int id { get; set; }
        public string NAMA_PEKERJAAN { get; set; }

        public IQueryable<TBL_M_PEKERJAAN> getListPekerjaan()
        {
            var data = db.TBL_M_PEKERJAANs.ToList().AsQueryable();
            return data;
        }
        public void savePekerjaan()
        {
            TBL_M_PEKERJAAN tbl = new TBL_M_PEKERJAAN();
            /*tbl.id = id;*/
            tbl.NAMA_PEKERJAAN = NAMA_PEKERJAAN;

            db.TBL_M_PEKERJAANs.InsertOnSubmit(tbl);
            db.SubmitChanges();
        }

        public void deletePekerjaan()
        {
            var query = db.TBL_M_PEKERJAANs.Where(t => t.id == id).FirstOrDefault();
            db.TBL_M_PEKERJAANs.DeleteOnSubmit(query);
            db.SubmitChanges();
        }
    }
}