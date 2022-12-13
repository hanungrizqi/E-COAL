using e_coal_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace e_coal_api.Controllers
{
    [RoutePrefix("seam")]
    public class SeamController : ApiController
    {
        Models.db_eCoalDataContext db = new db_eCoalDataContext();
        [Route("Create")]
        [HttpPost]
        public IHttpActionResult Create(TBL_M_SEAM seam)
        {
            TBL_M_SEAM seam2 = new TBL_M_SEAM();
            seam2.NAMA_SEAM = seam.NAMA_SEAM;

            db.TBL_M_SEAMs.InsertOnSubmit(seam2);
            db.SubmitChanges();
            return Ok("Data berhasil masuk");
        }

        [Route("Get")]
        [HttpGet]
        public IHttpActionResult Get()
        {
            var data = db.TBL_M_SEAMs.ToList();
            return Ok(data);
        }

        [Route("Delete")]
        [HttpPost]
        public IHttpActionResult Delete(int? id)
        {
            var data = db.TBL_M_SEAMs.Where(x => x.id == id).FirstOrDefault();

            db.TBL_M_SEAMs.DeleteOnSubmit(data);
            db.SubmitChanges();
            return Ok("Data berhasil di hapus");
        }

        [Route("Update")]
        [HttpPost]
        public IHttpActionResult Update(TBL_M_SEAM seam)
        {
            var data = db.TBL_M_SEAMs.Where(x => x.id == seam.id).FirstOrDefault();
            data.NAMA_SEAM = seam.NAMA_SEAM;

            db.SubmitChanges();
            return Ok("Data berhasil di update");
        }

        [Route("Value")]
        [HttpPost]
        public IHttpActionResult GetValue(int? id)
        {
            var data = db.TBL_M_SEAMs.Where(x => x.id == id).FirstOrDefault();
            return Ok(data);
        }
    }
}
