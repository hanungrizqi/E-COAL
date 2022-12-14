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

        #endregion
    }
}
