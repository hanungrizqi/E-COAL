using e_coal_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace e_coal_api.View_Model
{
    public class ClsSeam
    {
        db_eCoalDataContext db = new db_eCoalDataContext();

        public int ID { get; set; }
        public int id { get; set; }
        public string NAMA_SEAM { get; set; }
        public string GRADE { get; set; }
        public string INITIAL { get; set; }
        public string SEAM { get; set; }

        public IQueryable<TBL_M_SEAM> getListSeam()
        {
            var data = db.TBL_M_SEAMs.ToList().AsQueryable();
            return data;
        }

        public void saveSeam()
        {
            TBL_M_SEAM tbl = new TBL_M_SEAM();
            /*tbl.id = id;*/
            tbl.NAMA_SEAM = NAMA_SEAM;
            tbl.GRADE = GRADE;
            tbl.INITIAL = INITIAL;

            db.TBL_M_SEAMs.InsertOnSubmit(tbl);
            db.SubmitChanges();
        }

        public void deleteSeam()
        {
            var query = db.TBL_M_SEAMs.Where(t => t.id == id).FirstOrDefault();
            db.TBL_M_SEAMs.DeleteOnSubmit(query);
            db.SubmitChanges();
        }
    }
}