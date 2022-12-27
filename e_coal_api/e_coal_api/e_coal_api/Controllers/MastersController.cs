using e_coal_api.Models;
using e_coal_api.View_Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
/*using System.Web.Mvc;*/
/*using System.Web.Mvc;*/
/*using System.Web.Mvc;*/

namespace e_coal_api.Controllers
{
    public class MastersController : ApiController
    {
        Models.db_eCoalDataContext db = new db_eCoalDataContext();

        #region Master Profile
        [HttpGet]
        [Route("api/Masters/getListProfile")]
        public IHttpActionResult getListProfile()
        {
            try
            {
                ClsProfile clsProfile = new ClsProfile();
                var data = clsProfile.getListProfile();

                return Ok(new { Status = true, Data = data });
            }
            catch(Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }

        [HttpPost]
        [Route("api/Masters/saveProfile")]
        public IHttpActionResult saveProfile(ClsProfile clsProfile)
        {
            try
            {
                clsProfile.saveProfile();

                return Ok(new { Message = "Data berhasil di masukan", Status = true });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }

        [HttpPost]
        [Route("api/Masters/deleteProfile")]
        public IHttpActionResult deleteProfile(ClsProfile clsProfile)
        {
            try
            {
                clsProfile.deleteProfile();
                return Ok(new { Remarks = true, Message = "Berhasil Hapus Data" });
            }
            catch (Exception e)
            {
                return Ok(new { Remarks = false, Message = e.ToString() });
            }
        }

        [HttpPost]
        [Route("api/Masters/getProfileByID")]
        public IHttpActionResult getProfileByID(int id)
        {
            try
            {
                var data = db.TBL_M_PROFILEs.Where(x => x.id == id);

                return Ok(new { Remarks = true, Data = data });
            }
            catch (Exception e)
            {
                return Ok(new { Remarks = false, Message = "Gagal Edit", error = e.ToString() });
            }
        }
        #endregion

        #region Master Pekerjaan
        [HttpGet]
        [Route("api/Masters/getListPekerjaan")]
        public IHttpActionResult getListPekerjaan()
        {
            try
            {
                ClsPekerjaan clsPekerjaan = new ClsPekerjaan();
                var data = clsPekerjaan.getListPekerjaan();

                return Ok(new { Status = true, Data = data });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }

        [HttpPost]
        [Route("api/Masters/savePekerjaan")]
        public IHttpActionResult savePekerjaan(ClsPekerjaan clsPekerjaan)
        {
            try
            {
                clsPekerjaan.savePekerjaan();

                return Ok(new { Message = "Data berhasil di masukan", Status = true });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }

        [HttpPost]
        [Route("api/Masters/deletePekerjaan")]
        public IHttpActionResult deletePekerjaan(ClsPekerjaan clsPekerjaan)
        {
            try
            {
                clsPekerjaan.deletePekerjaan();
                return Ok(new { Remarks = true, Message = "Berhasil Hapus Data" });
            }
            catch (Exception e)
            {
                return Ok(new { Remarks = false, Message = e.ToString() });
            }
        }
        #endregion

        #region Master Seam
        [HttpGet]
        [Route("api/Masters/getListSeam")]
        public IHttpActionResult getListSeam()
        {
            try
            {
                ClsSeam clsSeam = new ClsSeam();
                var data = clsSeam.getListSeam();

                return Ok(new { Status = true, Data = data });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }

        [HttpPost]
        [Route("api/Masters/saveSeam")]
        public IHttpActionResult saveSeam(ClsSeam clsSeam)
        {
            try
            {
                clsSeam.saveSeam();

                return Ok(new { Message = "Data berhasil di masukan", Status = true });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }

        [HttpPost]
        [Route("api/Masters/deleteSeam")]
        public IHttpActionResult deleteSeam(ClsSeam clsSeam)
        {
            try
            {
                clsSeam.deleteSeam();
                return Ok(new { Remarks = true, Message = "Berhasil Hapus Data" });
            }
            catch (Exception e)
            {
                return Ok(new { Remarks = false, Message = e.ToString() });
            }
        }
        #endregion

        #region Master Subcont
        [HttpGet]
        [Route("api/Masters/getListSubcont")]
        public IHttpActionResult getListSubcont()
        {
            try
            {
                ClsSubcont clsSubcont = new ClsSubcont();
                var data = clsSubcont.getListSubcont();

                return Ok(new { Status = true, Data = data });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }

        [HttpPost]
        [Route("api/Masters/saveSubcont")]
        public IHttpActionResult saveSubcont(ClsSubcont clsSubcont)
        {
            try
            {
                clsSubcont.saveSubcont();

                return Ok(new { Message = "Data berhasil di masukan", Status = true });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }

        [HttpPost]
        [Route("api/Masters/deleteSubcont")]
        public IHttpActionResult deleteSubcont(ClsSubcont clsSubcont)
        {
            try
            {
                clsSubcont.deleteSubcont();
                return Ok(new { Remarks = true, Message = "Berhasil Hapus Data" });
            }
            catch (Exception e)
            {
                return Ok(new { Remarks = false, Message = e.ToString() });
            }
        }
        #endregion

        #region Master Jabatan
        [HttpGet]
        [Route("api/Masters/getListJabatan")]
        public IHttpActionResult getListJabatan()
        {
            try
            {
                ClsJabatan clsJabatan = new ClsJabatan();
                var data = clsJabatan.getListJabatan();

                return Ok(new { Status = true, Data = data });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }

        [HttpPost]
        [Route("api/Masters/saveJabatan")]
        public IHttpActionResult saveJabatan(ClsJabatan clsJabatan)
        {
            try
            {
                clsJabatan.saveJabatan();

                return Ok(new { Message = "Data berhasil di masukan", Status = true });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }

        [HttpPost]
        [Route("api/Masters/deleteJabatan")]
        public IHttpActionResult deleteJabatan(ClsJabatan clsJabatan)
        {
            try
            {
                clsJabatan.deleteJabatan();
                return Ok(new { Remarks = true, Message = "Berhasil Hapus Data" });
            }
            catch (Exception e)
            {
                return Ok(new { Remarks = false, Message = e.ToString() });
            }
        }
        #endregion

        #region Master Location
        [HttpGet]
        [Route("api/Masters/getListLocation")]
        public IHttpActionResult getListLocation()
        {
            try
            {
                ClsLocation clsLocation = new ClsLocation();
                var data = clsLocation.getListLocation();

                return Ok(new { Status = true, Data = data });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }

        [HttpPost]
        [Route("api/Masters/saveLocation")]
        public IHttpActionResult saveLocation(ClsLocation clsLocation)
        {
            try
            {
                clsLocation.saveLocation();

                return Ok(new { Message = "Data berhasil di masukan", Status = true });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }

        [HttpPost]
        [Route("api/Masters/deleteLocation")]
        public IHttpActionResult deleteLocation(ClsLocation clsLocation)
        {
            try
            {
                clsLocation.deleteLocation();
                return Ok(new { Remarks = true, Message = "Berhasil Hapus Data" });
            }
            catch (Exception e)
            {
                return Ok(new { Remarks = false, Message = e.ToString() });
            }
        }
        #endregion

        #region Master Grade
        [HttpGet]
        [Route("api/Masters/getListGrade")]
        public IHttpActionResult getListGrade()
        {
            try
            {
                ClsGrade clsGrade = new ClsGrade();
                var data = clsGrade.getListGrade();

                return Ok(new { Status = true, Data = data });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }

        [HttpPost]
        [Route("api/Masters/saveGrade")]
        public IHttpActionResult saveGrade(ClsGrade clsGrade)
        {
            try
            {
                clsGrade.saveGrade();

                return Ok(new { Message = "Data berhasil di masukan", Status = true });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }

        [HttpPost]
        [Route("api/Masters/deleteGrade")]
        public IHttpActionResult deleteGrade(ClsGrade clsGrade)
        {
            try
            {
                clsGrade.deleteGrade();
                return Ok(new { Remarks = true, Message = "Berhasil Hapus Data" });
            }
            catch (Exception e)
            {
                return Ok(new { Remarks = false, Message = e.ToString() });
            }
        }
        #endregion

        #region Departmen
        [HttpGet]
        [Route("api/Masters/getListDepartment")]
        public IHttpActionResult getListDepartment(string DISTRICT)
        {
            try
            {
                ClsDepartment clsDepartment = new ClsDepartment();
                var data = clsDepartment.getListDepartment().Where(a => a.DSTRCT_CODE == DISTRICT);

                return Ok(new { Status = true, Data = data });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }
        #endregion

        #region District
        [HttpGet]
        [Route("api/Masters/getListDistrict")]
        public IHttpActionResult getListDistrict()
        {
            try
            {
                ClsDistrict clsDistrict = new ClsDistrict();
                var data = clsDistrict.getListDistrict();

                return Ok(new { Status = true, Data = data });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }
        #endregion
    }
}
