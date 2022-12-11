using e_coal_api.View_Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace e_coal_api.Controllers
{
    public class MastersController : ApiController
    {
        [HttpGet]
        [Route("api/Masters/getListProfile")]
        public IHttpActionResult getListProfile()
        {
            try
            {
                ClsProfile clsProfile = new ClsProfile();
                var data = clsProfile.getListProfile();

                return Ok(new { Status = true, Data = data });
            }
            catch(Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }

        [HttpGet]
        [Route("api/Masters/getListPekerjaan")]
        public IHttpActionResult getListPekerjaan()
        {
            try
            {
                ClsPekerjaan clsPekerjaan = new ClsPekerjaan();
                var data = clsPekerjaan.getListPekerjaan();

                return Ok(new { Status = true, Data = data });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }

        [HttpGet]
        [Route("api/Masters/getListSeam")]
        public IHttpActionResult getListSeam()
        {
            try
            {
                ClsSeam clsSeam = new ClsSeam();
                var data = clsSeam.getListSeam();

                return Ok(new { Status = true, Data = data });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }
    }
}
