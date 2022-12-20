using e_coal_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace e_coal_api.View_Model
{
    public class ClsSettingUnit
    {
        db_eCoalDataContext db = new db_eCoalDataContext();

        public string OPERATOR { get;set; }
        public int ID_EQUIPMENT { get; set; }
        public string EQUIPMENT { get; set; }
        public int ID_PEKERJAAN { get; set; }
        public int ID_SEAM { get; set; }
        public decimal VOLUME { get; set; }
        public DateTime STAR_WORK_HOUR { get; set; }
        public int TIME_H { get; set; }
        public int TIME_M { get; set; }
        public int TIME_S { get; set; }
        public string GRADE { get; set; }
        public DateTime INPUT_DATE { get; set; }
        public string INPUT_BY { get; set; }
        public int STATUS { get; set; }
        public string DISTRICT { get; set; }

        public IQueryable<cufn_getListOperatorByRatingResult> getListOperatorByRating()
        {
            var data = db.cufn_getListOperatorByRating(ID_PEKERJAAN).OrderByDescending(a => a.AVG_AP);
            return data;
        }

        public cufn_getAlatByPekerjanSeamResult getAlatByPekerjaanSeam()
        {
            var data = db.cufn_getAlatByPekerjanSeam(ID_PEKERJAAN, ID_SEAM).FirstOrDefault();
            return data;
        }

        public void submitOperator()
        {
            TBL_T_PAIRING_OPERATOR_UNIT tbl = new TBL_T_PAIRING_OPERATOR_UNIT();
            tbl.OPERATOR = OPERATOR;
            tbl.ID_EQUIPMENT = ID_EQUIPMENT;
            tbl.EQUIPMENT = EQUIPMENT;
            tbl.ID_PEKERJAAN = ID_PEKERJAAN;
            tbl.ID_SEAM = ID_SEAM;
            tbl.VOLUME = VOLUME;
            tbl.START_WORK_HOUR = STAR_WORK_HOUR;
            tbl.TIME_H = TIME_H;
            tbl.TIME_M = TIME_M;
            //tbl.GRADE = GRADE;
            tbl.INPUT_DATE = DateTime.Now;
            tbl.INPUT_BY = INPUT_BY;
            tbl.STATUS = 1;
            tbl.DISTRICT = DISTRICT;

            db.TBL_T_PAIRING_OPERATOR_UNITs.InsertOnSubmit(tbl);
            db.SubmitChanges();
        }
    }
}