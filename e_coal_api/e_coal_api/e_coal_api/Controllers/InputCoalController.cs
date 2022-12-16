using e_coal_api.View_Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace e_coal_api.Controllers
{
    public class InputCoalController : ApiController
    {
        #region In SITU
        [HttpGet]
        [Route("api/InputCoal/getGar")]
        public IHttpActionResult getGar(string grade)
        {
            try
            {
                ClsInSitu clsInSitu = new ClsInSitu();
                clsInSitu.GRADE = grade;
                var data = clsInSitu.getGar();

                return Ok(new { Status = true, Data = data });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }

        [HttpPost]
        [Route("api/InputCoal/submmitInSitu")]
        public IHttpActionResult submmitInSitu(ClsInSitu clsInSitu)
        {
            try
            {
                clsInSitu.submmitInSitu();

                return Ok(new { Status = true });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }
        #endregion

        #region To ROM
        [HttpGet]
        [Route("api/InputCoal/getListLocation")]
        public IHttpActionResult getListLocation(string district)
        {
            try
            {
                ClsToRom clsToRom = new ClsToRom();
                clsToRom.DISTRICT = district;
                var data = clsToRom.c_getListLocation();

                return Ok(new { Status = true, Data = data });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }

        [HttpGet]
        [Route("api/InputCoal/getListSeamInSitu")]
        public IHttpActionResult getListSeamInSitu()
        {
            try
            {
                ClsToRom clsToRom = new ClsToRom();
                var data = clsToRom.c_getSeamInSitu();

                return Ok(new { Status = true, Data = data });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }

        [HttpGet]
        [Route("api/InputCoal/getAvaliableTonaseInSitu")]
        public IHttpActionResult getAvaliableTonaseInSitu(string id_inSitu)
        {
            try
            {
                ClsInSitu clsInSitu = new ClsInSitu();
                clsInSitu.ID_IN_SITU = id_inSitu;
                var data = clsInSitu.c_getAvaliableTonaseInSitu();

                return Ok(new { Status = true, Data = data });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }

        [HttpPost]
        [Route("api/InputCoal/submmitToRom")]
        public IHttpActionResult submmitToRom(ClsToRom clsToRom)
        {
            try
            {
                clsToRom.c_submmitToRom();

                return Ok(new { Status = true });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }
        #endregion

        #region Out ROM
        [HttpPost]
        [Route("api/InputCoal/submmitOutRom")]
        public IHttpActionResult submmitOutRom(ClsOutRom clsOutRom)
        {
            try
            {
                clsOutRom.c_submmitOutRom();

                return Ok(new { Status = true });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }

        [HttpGet]
        [Route("api/InputCoal/getListSeamInRom")]
        public IHttpActionResult getListSeamInRom()
        {
            try
            {
                ClsOutRom clsOutRom = new ClsOutRom();
                var data = clsOutRom.c_getSeamInRom();

                return Ok(new { Status = true, Data = data });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }

        [HttpGet]
        [Route("api/InputCoal/getAvaliableTonaseInRom")]
        public IHttpActionResult getAvaliableTonaseInRom(string id_inSitu)
        {
            try
            {
                ClsOutRom clsOutRom = new ClsOutRom();
                clsOutRom.ID_IN_SITU_SEAM = id_inSitu;
                var data = clsOutRom.c_getAvaliableTonaseInRom();

                return Ok(new { Status = true, Data = data });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }
        #endregion
    }
}
