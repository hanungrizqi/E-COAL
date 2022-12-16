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
        public IQueryable<cufn_getInSituResult> getListInSitu()
        {
            var data = db.cufn_getInSitu(TANGGAL_AWAL, TANGGAL_AKHIR).OrderByDescending(a => a.TANGGAL);
            return data;
        }

        public IQueryable<cufn_getInOutRomResult> getListInOutRom()
        {
            var data = db.cufn_getInOutRom(TANGGAL_AWAL, TANGGAL_AKHIR).OrderByDescending(a => a.TANGGAL);
            return data;
        }
    }
}