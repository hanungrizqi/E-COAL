using e_coal_api.View_Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace e_coal_api.Controllers
{
    public class LoginController : ApiController
    {
        [HttpPost]
        [Route("Login")]
        public IHttpActionResult Login(ClsLogin clsLogin)
        {
            try
            {
                var data = clsLogin.Login();

                return Ok(new { Status = true, Data = data });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }

        [HttpPost]
        [Route("Session")]
        public IHttpActionResult getSession(ClsLogin clsLogin)
        {
            try
            {
                var data = clsLogin.getSession();

                return Ok(new { Status = true, Data = data });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }
    }
}
