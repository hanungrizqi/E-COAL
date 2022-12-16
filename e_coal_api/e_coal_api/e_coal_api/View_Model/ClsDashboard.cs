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
            var upt = db.TBL_T_IN_SITUs.Where(a => a.ID_IN_SITU == IN_SITU).FirstOrDefault();
            upt.STATUS = 1;

            db.SubmitChanges();
        }

        public void c_rejectAnomali()
        {
            var upt = db.TBL_T_IN_SITUs.Where(a => a.ID_IN_SITU == IN_SITU).FirstOrDefault();
            upt.STATUS = 2;

            db.SubmitChanges();
        }
        #endregion
        public IQueryable<cufn_getInOutRomResult> getListInOutRom()
        {
            var data = db.cufn_getInOutRom(TANGGAL_AWAL, TANGGAL_AKHIR).OrderByDescending(a => a.TANGGAL);
            return data;
        }
    }
}