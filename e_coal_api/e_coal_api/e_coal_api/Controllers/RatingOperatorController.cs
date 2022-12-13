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

        [HttpGet]
        [Route("api/RatingOperator/getDetailOperator")]
        public IHttpActionResult getDetailOperator(int idPairing)
        {
            try
            {
                ClsRatingOperator clsRatingOperator = new ClsRatingOperator();
                clsRatingOperator.ID_PAIRING = idPairing;
                var data = clsRatingOperator.getDetailOperator();

                return Ok(new { Status = true, Data = data });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }

        //[HttpPost]
        //[Route("api/RatingOperator/nilaiOperator")]
        //public IHttpActionResult nilaiOperator(ClsRatingOperator clsRatingOperator)
        //{
        //    try
        //    {
        //        clsRatingOperator.nilaiOperator();

        //        return Ok(new { Status = true });
        //    }
        //    catch (Exception e)
        //    {
        //        return Ok(new { Status = false, Error = e.ToString() });
        //    }
        //}

        [HttpPost]
        [Route("api/RatingOperator/nilaiOperator")]
        public IHttpActionResult nilaiOperator(ClsRatingOperator clsRatingOperator)
        {
            try
            {
                clsRatingOperator.nilaiOperator();

                return Ok(new { Status = true });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }
    }
}
