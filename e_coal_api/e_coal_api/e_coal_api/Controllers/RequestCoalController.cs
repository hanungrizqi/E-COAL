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
    public class RequestCoalController : ApiController
    {
        Models.db_eCoalDataContext db = new db_eCoalDataContext();
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

        [HttpGet]
        [Route("api/RequestCoal/getListRequestCoal")]
        public IHttpActionResult getListRequestCoal()
        {
            var data = db.TBL_T_REQUEST_COALs.ToList();
            return Ok(new { Data = data });
        }
    }
}
