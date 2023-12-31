﻿using e_coal_api.Models;
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
        db_eCoalDataContext db = new db_eCoalDataContext();

        #region Get Date
        [HttpGet]
        [Route("api/Dashboard/getDate")]
        public IHttpActionResult getDate()
        {
            try
            {
                ClsDashboard clsDashboard = new ClsDashboard();
                var data = clsDashboard.c_getDate();

                return Ok(new { Status = true, Data = data });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }

        //[HttpGet]
        //[Route("api/Dashboard/getSumProduct")]
        //public IHttpActionResult getSumProduct(string district)
        //{
        //    try
        //    {
        //        ClsDashboard clsDashboard = new ClsDashboard();
        //        clsDashboard.DISTRICT = district;
        //        var data = clsDashboard.c_getSumProduct();

        //        return Ok(new { Status = true, Data = data });
        //    }
        //    catch (Exception e)
        //    {
        //        return Ok(new { Status = false, Error = e.ToString() });
        //    }
        //}
        #endregion

        #region get Chart
        [HttpGet]
        [Route("api/Dashboard/getChart")]
        public IHttpActionResult getChart(string district)
        {
            try
            {
                var header = db.cufn_getChart(district).OrderBy(a => a.GRADE).Select(a => a.GRADE_DESC).ToList();
                var data =db.cufn_getChart(district).OrderBy(a => a.GRADE).Select(a => a.P).ToList();

                return Ok(new { Status = true, Header = header, Data = data});
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }
        #endregion

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
                
                return Ok(new { Status = true, Data = data, Total = data.Count()});
                /*return Ok(new { Data = data });*/
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }

        [HttpGet]
        [Route("api/Dashboard/getListAnomaliInSitu")]
        public IHttpActionResult getListAnomaliInSitu(DateTime TANGGAL_AWAL, DateTime TANGGAL_AKHIR)
        {
            try
            {
                ClsDashboard clsDashboard = new ClsDashboard();
                clsDashboard.TANGGAL_AWAL = TANGGAL_AWAL;
                clsDashboard.TANGGAL_AKHIR = TANGGAL_AKHIR;
                var data = clsDashboard.getAnomaliInSitu();

                return Ok(new { Status = true, Data = data, Total = data.Count() });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }

        [HttpPost]
        [Route("api/Dashboard/approveAnomali")]
        public IHttpActionResult approveAnomali(ClsDashboard clsDashboard)
        {
            try
            {
                clsDashboard.c_approveAnomali();

                return Ok(new { Status = true });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }

        [HttpPost]
        [Route("api/Dashboard/rejectAnomali")]
        public IHttpActionResult rejectAnomali(ClsDashboard clsDashboard)
        {
            try
            {
                clsDashboard.c_rejectAnomali();

                return Ok(new { Status = true });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }
        #endregion

        #region getinoutrom
        [HttpGet]
        [Route("api/Dashboard/getListInOutRom")]
        public IHttpActionResult getListInOutRom(DateTime TANGGAL_AWAL, DateTime TANGGAL_AKHIR)
        {
            try
            {
                ClsDashboard clsDashboard = new ClsDashboard();
                clsDashboard.TANGGAL_AWAL = TANGGAL_AWAL;
                clsDashboard.TANGGAL_AKHIR = TANGGAL_AKHIR;
                var data = clsDashboard.c_getListInOutRom();

                return Ok(new { Status = true, Data = data, Total = data.Count() });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }
        #endregion

        #region getCGVinROM
        [HttpGet]
        [Route("api/Dashboard/getCGVInROM")]
        public IHttpActionResult getCGVInROM(string district)
        {
            try
            {
                ClsDashboard clsDashboard = new ClsDashboard();
                clsDashboard.DISTRICT = district;
                var data = clsDashboard.c_getCGVInROM();

                return Ok(new { Status = true, Data = data });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }
        #endregion

        #region requestcoal
        [HttpGet]
        [Route("api/Dashboard/getRequestCoalApproval")]
        public IHttpActionResult getRequestCoalApproval()
        {
            try
            {
                ClsDashboard clsDashboard = new ClsDashboard();
                var data = clsDashboard.getRequestCoalApproval();

                return Ok(new { Status = true, Data = data, Total = data.Count() });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }

        [HttpPost]
        [Route("api/Dashboard/approveRequestCoal")]
        public IHttpActionResult approveRequestCoal(ClsDashboard clsDashboard)
        {
            try
            {
                clsDashboard.c_approveRequestCoal();

                return Ok(new { Status = true });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }
        #endregion
    }
}
