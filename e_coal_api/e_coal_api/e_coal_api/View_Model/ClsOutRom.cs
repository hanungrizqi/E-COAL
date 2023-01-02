using e_coal_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace e_coal_api.View_Model
{
    public class ClsOutRom
    {
        db_eCoalDataContext db = new db_eCoalDataContext();

        public int ID_OUT_ROM { get; set; }
        public string DISTRICT { get; set; }
        public DateTime JAM { get; set; }
        public string ID_IN_SITU_SEAM { get; set; }
        public string GRADE { get; set; }
        /*public decimal LOADER { get; set; }*/
        public string NO_UNIT_DT { get; set; }
        public decimal BERAT_TARA_UNIT_KG { get; set; }
        public decimal BERAT_BRUTO_UNIT_KG { get; set; }
        public decimal TOTAL_TONASE { get; set; }
        public DateTime TANGGAL { get; set; }
        public string INPUT_DATE { get; set; }
        public string INPUT_BY { get; set; }

        public IQueryable<cufn_getAvaliableTonaseInRomResult> c_getSeamInRom()
        {
            var data = db.cufn_getAvaliableTonaseInRom();
            return data;
        }

        public cufn_getAvaliableTonaseInRomResult c_getAvaliableTonaseInRom()
        {
            var data = db.cufn_getAvaliableTonaseInRom().Where(a => a.ID_IN_SITU_SEAM == ID_IN_SITU_SEAM).FirstOrDefault();
            return data;
        }

        public void c_submmitOutRom()
        {
            TBL_T_OUT_ROM tbl = new TBL_T_OUT_ROM();
            tbl.ID_OUT_ROM = ID_OUT_ROM;
            tbl.JAM = JAM;
            tbl.ID_IN_SITU_SEAM = ID_IN_SITU_SEAM;
            tbl.GRADE = GRADE;
            /*tbl.LOADER = LOADER;*/
            tbl.NO_UNIT_DT = NO_UNIT_DT;
            tbl.BERAT_TARA_UNIT_KG = BERAT_TARA_UNIT_KG;
            tbl.BERAT_BRUTO_UNIT_KG = BERAT_BRUTO_UNIT_KG;
            tbl.TOTAL_TONASE = TOTAL_TONASE;
            //tbl.TANGGAL = TANGGAL;
            tbl.DISTRICT = DISTRICT;
            tbl.INPUT_DATE = DateTime.Now;
            tbl.INPUT_BY = INPUT_BY;

            db.TBL_T_OUT_ROMs.InsertOnSubmit(tbl);
            db.SubmitChanges();
        }
    }
}