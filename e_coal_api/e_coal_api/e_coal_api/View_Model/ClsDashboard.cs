using e_coal_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace e_coal_api.View_Model
{
    public class ClsDashboard
    {
        db_eCoalDataContext db = new db_eCoalDataContext();

        public DateTime TANGGAL_AWAL { get; set; }
        public DateTime TANGGAL_AKHIR { get; set; }
        public string IN_SITU { get; set; }
        public string DISTRICT { get; set; }
        public int ID_REQUESTCOAL { get; set; }

        public cufn_getDateInSituResult c_getDate()
        {
            var data = db.cufn_getDateInSitu().FirstOrDefault();
            return data;
        }

        #region In SITU
        public IQueryable<cufn_getInSituResult> getListInSitu()
        {
            var data = db.cufn_getInSitu(TANGGAL_AWAL, TANGGAL_AKHIR).OrderByDescending(a => a.TANGGAL);
            return data;
        }

        public IQueryable<cufn_getAnomaliInSituResult> getAnomaliInSitu() {
            var data = db.cufn_getAnomaliInSitu(TANGGAL_AWAL, TANGGAL_AKHIR).OrderByDescending(a => a.TANGGAL);
            return data;
        }

        public void c_approveAnomali()
        {
            db.cusp_updateAnomaliData(IN_SITU);
            //var upt = db.TBL_T_IN_SITUs.Where(a => a.ID_IN_SITU == IN_SITU).FirstOrDefault();
            //upt.STATUS = 1;
            //db.SubmitChanges();
        }

        public void c_rejectAnomali()
        {
            var upt = db.TBL_T_IN_SITUs.Where(a => a.ID_IN_SITU == IN_SITU).FirstOrDefault();
            upt.STATUS = 2;

            db.SubmitChanges();
        }
        #endregion

        #region in out rom
        public IQueryable<cufn_getInOutRomResult> c_getListInOutRom()
        {
            var data = db.cufn_getInOutRom(TANGGAL_AWAL, TANGGAL_AKHIR).OrderByDescending(a => a.TANGGAL);
            return data;
        }
        #endregion

        #region CGV in ROM
        public cufn_getCGVInROMResult c_getCGVInROM()
        {
            var data = db.cufn_getCGVInROM(DISTRICT).FirstOrDefault();
            return data;
        }
        #endregion

        #region request coal
        public IQueryable<cufn_getRequestCoalApprovalResult> getRequestCoalApproval()
        {
            var data = db.cufn_getRequestCoalApproval().OrderBy(a => a.DEADLINE);
            return data;
        }

        public void c_approveRequestCoal()
        {
            var upt = db.TBL_T_REQUEST_COALs.Where(a => a.ID == ID_REQUESTCOAL).FirstOrDefault();
            upt.STATUS = 1;

            db.SubmitChanges();
        }
        #endregion

        //public cufn_getSumProductResult c_getSumProduct()
        //{
        //    var data = db.cufn_getSumProduct(DISTRICT).FirstOrDefault();
        //    return data;
        //}

        //public List<cufn_getChartResult> c_getChart()
        //{
        //    var data = db.cufn_getChart(DISTRICT).Select(a => a.GRADE).ToList();
        //    return data;
        //}
    }
}