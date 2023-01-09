using e_coal_api.Models;
using Microsoft.Ajax.Utilities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace e_coal_api.View_Model
{
    public class ClsInSitu
    {
        db_eCoalDataContext db = new db_eCoalDataContext();

        public string ID_IN_SITU { get; set; }
        public int ID_SEAM { get; set; }
        public string GRADE { get; set; }
        public decimal GAR_ACTUAL { get; set; }
        public string COAL_CONDITION { get; set; }
        public decimal TOTAL_TONASE { get; set; }
        public DateTime TANGGAL { get; set; }
        public string INPUT_DATE { get; set; }
        public string INPUT_BY { get; set; }
        public int STATUS { get; set; }


        public TBL_M_GRADE getGar()
        {
            var data = db.TBL_M_GRADEs.Where(a => a.GRADE.Equals(GRADE)).FirstOrDefault();
            return data;
        }

        public void submmitInSitu()
        {                 
            if (COAL_CONDITION == "Anomali")
            {
                STATUS = 0;
            }

            TBL_T_IN_SITU tbl = new TBL_T_IN_SITU();
            tbl.ID_IN_SITU = ID_IN_SITU;
            tbl.ID_SEAM = ID_SEAM;
            tbl.GRADE = GRADE;
            tbl.GAR_ACTUAL = GAR_ACTUAL;
            tbl.COAL_CONDITION = COAL_CONDITION;
            tbl.TOTAL_TONASE = TOTAL_TONASE;
            tbl.TANGGAL = TANGGAL;
            tbl.INPUT_DATE = DateTime.Now;
            tbl.INPUT_BY = INPUT_BY;
            tbl.FLAG = false;
            tbl.STATUS = STATUS;
            db.TBL_T_IN_SITUs.InsertOnSubmit(tbl);
            db.SubmitChanges();
        }

        public IQueryable<TBL_T_IN_SITU> c_getListSeamInSitu()
        {
            var data = db.TBL_T_IN_SITUs.Where(a => a.FLAG == false).ToList().AsQueryable();
            return data;
        }
        
        public cufn_getAvaliableTonaseInSituResult c_getAvaliableTonaseInSitu()
        {
            var data = db.cufn_getAvaliableTonaseInSitu(ID_IN_SITU).FirstOrDefault();
            return data;
        }
    }
}