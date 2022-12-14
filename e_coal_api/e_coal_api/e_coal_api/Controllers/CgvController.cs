using e_coal_api.View_Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace e_coal_api.Controllers
{
    public class CgvController : ApiController
    {
        [HttpGet]
        [Route("api/Cgv/getImgCgv")]
        public IHttpActionResult getImgCgv()
        {
            try
            {
                ClsCgv clsCgv = new ClsCgv();
                var data = clsCgv.getImg();

                return Ok(new { Status = true, Data = data });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }
    }
}
