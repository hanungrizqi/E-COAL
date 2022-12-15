using e_coal_api.Models;
using e_coal_api.View_Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace e_coal_api.Controllers
{
    public class DashboardController : ApiController
    {
        #region getinsitu
        [HttpGet]
        [Route("api/Dashboard/getListInSitu")]
        public IHttpActionResult getListInSitu(DateTime TANGGAL_AWAL, DateTime TANGGAL_AKHIR)
        {
            try
            {
                ClsDashboard clsDashboard = new ClsDashboard();
                clsDashboard.TANGGAL_AWAL = TANGGAL_AWAL;
                clsDashboard.TANGGAL_AKHIR = TANGGAL_AKHIR;
                var data = clsDashboard.getListInSitu();
                
                return Ok(new { Status = true, Data = data});
                /*return Ok(new { Data = data });*/
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }
        #endregion

        #region getinoutrom
        public IHttpActionResult getListInOutRom(DateTime TANGGAL_AWAL, DateTime TANGGAL_AKHIR)
        {
            try
            {
                ClsDashboard clsDashboard = new ClsDashboard();
                clsDashboard.TANGGAL_AWAL = TANGGAL_AWAL;
                clsDashboard.TANGGAL_AKHIR = TANGGAL_AKHIR;
                var data = clsDashboard.getListInSitu();

                return Ok(new { Status = true, Data = data });
                /*return Ok(new { Data = data });*/
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }
        #endregion
    }
}
