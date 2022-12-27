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
    public class ProfileController : ApiController
    {
        Models.db_eCoalDataContext db = new db_eCoalDataContext();

        [HttpGet]
        [Route("api/Profile/getListProfile")]
        public IHttpActionResult getListProfile()
        {
            var data = db.TBL_M_PROFILEs.ToList();
            return Ok(new { Data = data });
        }

        /*[HttpPost]
        [Route("api/Profile/submitProfile")]
        public IHttpActionResult submitProfile(ClsProfile clsProfile)
        {
            try
            {
                clsProfile.submitProfile();

                return Ok(new { Status = true });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }*/
    }
}
