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
                var message = "";
                var check = db.TBL_M_PROFILEs.Where(x => x.id == clsProfile.id).FirstOrDefault();
                if (check != null)
                {
                    clsProfile.updateProfile();
                    message = "Data berhasil diubah";
                }
                else {

                    clsProfile.saveProfile();
                    message = "data Berhasil disimpan";
                }

                return Ok(new { Message = message, Status = true });
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

                return Ok(new { Remarks = true, Data = data, Message = "Berhasil Edit Data" });
            }
            catch (Exception e)
            {
                return Ok(new { Remarks = false, Message = "Gagal Edit", error = e.ToString() });
            }
        }

        /*[HttpPost]
        [Route("api/Masters/Update")]
        public IHttpActionResult Update(TBL_M_PROFILE profile)
        {
            var data = db.TBL_M_PROFILEs.Where(x => x.id == profile.id).FirstOrDefault();
            data.PROFILE = profile.PROFILE;

            db.SubmitChanges();
            return Ok("Data berhasil di update");
        }

        [HttpPost]
        [Route("api/Masters/getValueProfile")]
        public IHttpActionResult GetValueProfile(int? id)
        {
            var data = db.TBL_M_PROFILEs.Where(x => x.id == id).FirstOrDefault();
            return Ok(data);
        }*/
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
                var message = "";
                var check = db.TBL_M_PEKERJAANs.Where(x => x.id == clsPekerjaan.id).FirstOrDefault();
                if (check != null)
                {
                    clsPekerjaan.updatePekerjaan();
                    message = "Data berhasil diubah";
                }
                else
                {

                    clsPekerjaan.savePekerjaan();
                    message = "data Berhasil disimpan";
                }

                return Ok(new { Message = message, Status = true });
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

        [HttpPost]
        [Route("api/Masters/getPekerjaanByID")]
        public IHttpActionResult getPekerjaanByID(int id)
        {
            try
            {
                var data = db.TBL_M_PEKERJAANs.Where(x => x.id == id);

                return Ok(new { Remarks = true, Data = data, Message = "Berhasil Edit Data" });
            }
            catch (Exception e)
            {
                return Ok(new { Remarks = false, Message = "Gagal Edit", error = e.ToString() });
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
                var message = "";
                var check = db.TBL_M_SEAMs.Where(x => x.id == clsSeam.id).FirstOrDefault();
                if (check != null)
                {
                    clsSeam.updateSeam();
                    message = "Data berhasil diubah";
                }
                else
                {

                    clsSeam.saveSeam();
                    message = "data Berhasil disimpan";
                }

                return Ok(new { Message = message, Status = true });
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

        [HttpPost]
        [Route("api/Masters/getSeamByID")]
        public IHttpActionResult getSeamByID(int id)
        {
            try
            {
                var data = db.TBL_M_SEAMs.Where(x => x.id == id);

                return Ok(new { Remarks = true, Data = data, Message = "Berhasil Edit Data" });
            }
            catch (Exception e)
            {
                return Ok(new { Remarks = false, Message = "Gagal Edit", error = e.ToString() });
            }
        }

        [HttpGet]
        [Route("api/Masters/getListGradeForSeam")]
        public IHttpActionResult getListGradeForSeam()
        {
            try
            {
                ClsGrade clsGrade = new ClsGrade();
                var data = clsGrade.getListGrade().Where(a => a.GRADE != "Reject");

                return Ok(new { Status = true, Data = data });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
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
                var message = "";
                var check = db.TBL_M_SUBCONTs.Where(x => x.ID == clsSubcont.ID).FirstOrDefault();
                if (check != null)
                {
                    clsSubcont.updateSubcont();
                    message = "Data berhasil diubah";
                }
                else
                {

                    clsSubcont.saveSubcont();
                    message = "data Berhasil disimpan";
                }

                return Ok(new { Message = message, Status = true });
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

        [HttpPost]
        [Route("api/Masters/getSubcontByID")]
        public IHttpActionResult getSubcontByID(int id)
        {
            try
            {
                var data = db.TBL_M_SUBCONTs.Where(x => x.ID == id);

                return Ok(new { Remarks = true, Data = data, Message = "Berhasil Edit Data" });
            }
            catch (Exception e)
            {
                return Ok(new { Remarks = false, Message = "Gagal Edit", error = e.ToString() });
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
                var message = "";
                var check = db.TBL_M_JABATANs.Where(x => x.ID_JABATAN == clsJabatan.ID_JABATAN).FirstOrDefault();
                if (check != null)
                {
                    clsJabatan.updateJabatan();
                    message = "Data berhasil diubah";
                }
                else
                {

                    clsJabatan.saveJabatan();
                    message = "data Berhasil disimpan";
                }

                return Ok(new { Message = message, Status = true });
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

        [HttpPost]
        [Route("api/Masters/getJabatanByID")]
        public IHttpActionResult getJabatanByID(int ID_JABATAN)
        {
            try
            {
                var data = db.TBL_M_JABATANs.Where(x => x.ID_JABATAN == ID_JABATAN);

                return Ok(new { Remarks = true, Data = data, Message = "Berhasil Edit Data" });
            }
            catch (Exception e)
            {
                return Ok(new { Remarks = false, Message = "Gagal Edit", error = e.ToString() });
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
                var message = "";
                var check = db.TBL_M_LOCATIONs.Where(x => x.ID_LOC == clsLocation.ID_LOC).FirstOrDefault();
                if (check != null)
                {
                    clsLocation.updateLocation();
                    message = "Data berhasil diubah";
                }
                else
                {

                    clsLocation.saveLocation();
                    message = "data Berhasil disimpan";
                }

                return Ok(new { Message = message, Status = true });
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

        [HttpPost]
        [Route("api/Masters/getLocationByID")]
        public IHttpActionResult getLocationByID(int ID_LOC)
        {
            try
            {
                var data = db.TBL_M_LOCATIONs.Where(x => x.ID_LOC == ID_LOC);

                return Ok(new { Remarks = true, Data = data, Message = "Berhasil Edit Data" });
            }
            catch (Exception e)
            {
                return Ok(new { Remarks = false, Message = "Gagal Edit", error = e.ToString() });
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
                var message = "";
                var check = db.TBL_M_GRADEs.Where(x => x.GRADE == clsGrade.GRADE).FirstOrDefault();
                if (check != null)
                {
                    clsGrade.updateGrade();
                    message = "Data berhasil diubah";
                }
                else
                {

                    clsGrade.saveGrade();
                    message = "data Berhasil disimpan";
                }

                return Ok(new { Message = message, Status = true });
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

        [HttpPost]
        [Route("api/Masters/getGradeByID")]
        public IHttpActionResult getGradeByID(string GRADE)
        {
            try
            {
                var data = db.TBL_M_GRADEs.Where(x => x.GRADE == GRADE);

                return Ok(new { Remarks = true, Data = data, Message = "Berhasil Edit Data" });
            }
            catch (Exception e)
            {
                return Ok(new { Remarks = false, Message = "Gagal Edit", error = e.ToString() });
            }
        }
        #endregion

        #region Master User
        [HttpGet]
        [Route("api/Masters/getListUser")]
        public IHttpActionResult getListUser()
        {
            try
            {
                ClsUser clsUser = new ClsUser();
                var data = clsUser.getListUser();

                return Ok(new { Status = true, Data = data });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }

        [HttpPost]
        [Route("api/Masters/saveUser")]
        public IHttpActionResult saveUser(ClsUser clsUser)
        {
            try
            {
                var message = "";
                var check = db.TBL_M_USERs.Where(x => x.ID == clsUser.ID).FirstOrDefault();
                if (check != null)
                {
                    clsUser.updateUser();
                    message = "Data berhasil diubah";
                }
                else
                {

                    clsUser.saveUser();
                    message = "data Berhasil disimpan";
                }

                return Ok(new { Message = message, Status = true });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }

        [HttpPost]
        [Route("api/Masters/deleteUser")]
        public IHttpActionResult deleteUser(ClsUser clsUser)
        {
            try
            {
                clsUser.deleteUser();
                return Ok(new { Remarks = true, Message = "Berhasil Hapus Data" });
            }
            catch (Exception e)
            {
                return Ok(new { Remarks = false, Message = e.ToString() });
            }
        }

        [HttpPost]
        [Route("api/Masters/getUserByID")]
        public IHttpActionResult getUserByID(int ID)
        {
            try
            {
                var data = db.TBL_M_USERs.Where(x => x.ID == ID);

                return Ok(new { Remarks = true, Data = data, Message = "Berhasil Edit Data" });
            }
            catch (Exception e)
            {
                return Ok(new { Remarks = false, Message = "Gagal Edit", error = e.ToString() });
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
