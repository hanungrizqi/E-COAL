using e_coal_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace e_coal_api.View_Model
{
    public class ClsRatingOperator
    {
        db_eCoalDataContext db = new db_eCoalDataContext();

        public int ID_PAIRING { get; set; }
        public string NRP { get; set; }
        public int SAFETY { get; set; }
        public int KOMUNIKASI { get; set; }
        public int METODE_KERJA { get; set; }
        public int VOLUME { get; set; }
        public string INPUT_BY { get; set; }

        public IQueryable<cusp_getListPenilaianResult> getListPenilaian()
        {
            var data = db.cusp_getListPenilaian().ToList().AsQueryable();
            return data;
        }

        public cufn_getDetailOperatorResult getDetailOperator()
        {
            var data = db.cufn_getDetailOperator(ID_PAIRING).FirstOrDefault();
            return data;
        }

        public void nilaiOperator()
        {
            TBL_T_APPRAISAL tbl = new TBL_T_APPRAISAL();
            tbl.PAIRING_OU_ID = ID_PAIRING;
            tbl.OPERATOR = NRP;
            tbl.SAFETY = SAFETY;
            tbl.KOMUNIKASI = KOMUNIKASI;
            tbl.METODE_KERJA = METODE_KERJA;
            tbl.INPUT_BY = INPUT_BY;
            tbl.INPUT_DATE = DateTime.Now;
            //tbl.VOLUME = VOLUME;
            db.TBL_T_APPRAISALs.InsertOnSubmit(tbl);

            var upt = db.TBL_T_PAIRING_OPERATOR_UNITs.Where(a => a.ID == ID_PAIRING).FirstOrDefault();
            upt.VOLUME = VOLUME;

            db.SubmitChanges();
        }
    }
}