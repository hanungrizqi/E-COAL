using e_coal_api.View_Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace e_coal_api.Controllers
{
    public class RatingOperatorController : ApiController
    {
        [HttpGet]
        [Route("api/RatingOperator/getListPenilaian")]
        public IHttpActionResult getListPenilaian()
        {
            try
            {
                ClsRatingOperator clsRatingOperator = new ClsRatingOperator();
                var data = clsRatingOperator.getListPenilaian();

                return Ok(new { Status = true, Data = data, Total = data.Count() });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }
    }
}
