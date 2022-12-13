using e_coal_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace e_coal_api.Controllers
{
    [RoutePrefix("profile")]
    public class ProfileController : ApiController
    {
        Models.db_eCoalDataContext db = new db_eCoalDataContext();
        [Route("Create")]
        [HttpPost]
        public IHttpActionResult Create(TBL_M_PROFILE profile)
        {
            TBL_M_PROFILE profile2 = new TBL_M_PROFILE();
            profile2.PROFILE = profile.PROFILE;

            db.TBL_M_PROFILEs.InsertOnSubmit(profile2);
            db.SubmitChanges();
            return Ok("Data berhasil masuk");
        }

        [Route("Get")]
        [HttpGet]
        public IHttpActionResult Get()
        {
            var data = db.TBL_M_PROFILEs.ToList();
            return Ok(data);
        }

        [Route("Delete")]
        [HttpPost]
        public IHttpActionResult Delete(int? id)
        {
            var data = db.TBL_M_PROFILEs.Where(x => x.id == id).FirstOrDefault();

            db.TBL_M_PROFILEs.DeleteOnSubmit(data);
            db.SubmitChanges();
            return Ok("Data berhasil di hapus");
        }

        [Route("Update")]
        [HttpPost]
        public IHttpActionResult Update(TBL_M_PROFILE profile)
        {
            var data = db.TBL_M_PROFILEs.Where(x => x.id == profile.id).FirstOrDefault();
            data.PROFILE = profile.PROFILE;

            db.SubmitChanges();
            return Ok("Data berhasil di update");
        }

        [Route("Value")]
        [HttpPost]
        public IHttpActionResult GetValue(int? id)
        {
            var data = db.TBL_M_PROFILEs.Where(x => x.id == id).FirstOrDefault();
            return Ok(data);
        }
    }
}
