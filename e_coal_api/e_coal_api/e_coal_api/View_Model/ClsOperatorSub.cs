using e_coal_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace e_coal_api.View_Model
{
    public class ClsOperatorSub
    {
        db_eCoalDataContext db = new db_eCoalDataContext();

        public string NRP { get; set; }
        public string NAMA { get; set; }
        public string SUBCONT_CODE { get; set; }
        public int ID_JABATAN { get; set; }
        public string DEPT_CODE { get; set; }
        public string DISTRICT { get; set; }
        public DateTime TGL_MASUK { get; set; }
        public DateTime INPUT_DATE { get; set; }
        public string INPUT_BY { get; set; }
        /*public int STATUS { get; set; }*/


        /*public IQueryable<cufn_getListOperatorByRatingResult> getListOperatorByReting()
        {
            var data = db.cufn_getListOperatorByRating(ID_PEKERJAAN).OrderByDescending(a => a.AVG_AP);
            return data;
        }

        public cufn_getAlatByPekerjanSeamResult getAlatByPekerjaanSeam()
        {
            var data = db.cufn_getAlatByPekerjanSeam(ID_PEKERJAAN, ID_SEAM).FirstOrDefault();
            return data;
        }*/

        public void submitOperator()
        {
            TBL_M_OPERATOR_EX tbl = new TBL_M_OPERATOR_EX();
            tbl.NRP = NRP;
            tbl.NAMA = NAMA;
            tbl.SUBCONT_CODE = SUBCONT_CODE;
            tbl.ID_JABATAN = ID_JABATAN;
            tbl.DEPT_CODE = DEPT_CODE;
            tbl.DISTRICT = DISTRICT;
            tbl.TGL_MASUK = TGL_MASUK;
            tbl.INPUT_DATE = DateTime.Now;
            tbl.INPUT_BY = INPUT_BY;
            /*tbl.STATUS = STATUS;*/

            db.TBL_M_OPERATOR_EXes.InsertOnSubmit(tbl);
            db.SubmitChanges();
        }
    }
}