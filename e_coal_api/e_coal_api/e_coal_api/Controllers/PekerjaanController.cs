using e_coal_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace e_coal_api.Controllers
{
    [RoutePrefix("pekerjaan")]
    public class PekerjaanController : ApiController
    {
        Models.db_eCoalDataContext db = new db_eCoalDataContext();
        [Route("Create")]
        [HttpPost]
        public IHttpActionResult Create(TBL_M_PEKERJAAN pekerjaan)
        {
            TBL_M_PEKERJAAN pekerjaan2 = new TBL_M_PEKERJAAN();
            pekerjaan2.NAMA_PEKERJAAN = pekerjaan.NAMA_PEKERJAAN;

            db.TBL_M_PEKERJAANs.InsertOnSubmit(pekerjaan2);
            db.SubmitChanges();
            return Ok("Data berhasil masuk");
        }

        [Route("Get")]
        [HttpGet]
        public IHttpActionResult Get()
        {
            var data = db.TBL_M_PEKERJAANs.ToList();
            return Ok(data);
        }

        [Route("Delete")]
        [HttpPost]
        public IHttpActionResult Delete(int? id)
        {
            var data = db.TBL_M_PEKERJAANs.Where(x => x.id == id).FirstOrDefault();

            db.TBL_M_PEKERJAANs.DeleteOnSubmit(data);
            db.SubmitChanges();
            return Ok("Data berhasil di hapus");
        }

        [Route("Update")]
        [HttpPost]
        public IHttpActionResult Update(TBL_M_PEKERJAAN pekerjaan)
        {
            var data = db.TBL_M_PEKERJAANs.Where(x => x.id == pekerjaan.id).FirstOrDefault();
            data.NAMA_PEKERJAAN = pekerjaan.NAMA_PEKERJAAN;

            db.SubmitChanges();
            return Ok("Data berhasil di update");
        }

        [Route("Value")]
        [HttpPost]
        public IHttpActionResult GetValue(int? id)
        {
            var data = db.TBL_M_PEKERJAANs.Where(x => x.id == id).FirstOrDefault();
            return Ok(data);
        }
    }
}
