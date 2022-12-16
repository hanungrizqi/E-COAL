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
    public class OperatorSubController : ApiController
    {
        Models.db_eCoalDataContext db = new db_eCoalDataContext();

        [HttpGet]
        [Route("api/OperatorSub/getListOperatorSub")]
        public IHttpActionResult GetListOperatorSub()
        {
            var data = db.TBL_M_OPERATOR_EXes.ToList();
            return Ok(new { Data = data });
        }

        [HttpPost]
        [Route("api/OperatorSub/submitOperator")]
        public IHttpActionResult submitOperator(ClsOperatorSub clsOperatorSub)
        {
            try
            {
                clsOperatorSub.submitOperator();

                return Ok(new { Status = true });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }
    }
}
