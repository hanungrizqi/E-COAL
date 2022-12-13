using e_coal_api.View_Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace e_coal_api.Controllers
{
    public class RequestCoalController : ApiController
    {
        [HttpPost]
        [Route("api/RequestCoal/submitOperator")]
        public IHttpActionResult submitOperator(ClsRequestCoal clsRequestCoal)
        {
            try
            {
                clsRequestCoal.submitOperator();

                return Ok(new { Status = true });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }
    }
}
