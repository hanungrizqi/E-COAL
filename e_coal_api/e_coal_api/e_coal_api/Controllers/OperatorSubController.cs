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
        /*[HttpGet]
        [Route("api/SettingUnit/getListOperatorByRating")]
        public IHttpActionResult getListOperatorByRating(int ID_PEKERJAAN)
        {
            try
            {
                ClsSettingUnit clsSettingUnit = new ClsSettingUnit();
                clsSettingUnit.ID_PEKERJAAN = ID_PEKERJAAN;
                var data = clsSettingUnit.getListOperatorByReting();

                return Ok(new { Status = true, Data = data, Total = data.Count() });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }

        [HttpGet]
        [Route("api/SettingUnit/getAlatByPekerjaanSeam")]
        public IHttpActionResult getAlatByPekerjaanSeam(int ID_PEKERJAAN, int ID_SEAM)
        {
            try
            {
                bool flag = true;

                ClsSettingUnit clsSettingUnit = new ClsSettingUnit();
                clsSettingUnit.ID_PEKERJAAN = ID_PEKERJAAN;
                clsSettingUnit.ID_SEAM = ID_SEAM;
                var data = clsSettingUnit.getAlatByPekerjaanSeam();
                if (data == null)
                {
                    flag = false;
                }

                return Ok(new { Status = true, Data = data, GetFlag = flag });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }*/
        Models.db_eCoalDataContext db = new db_eCoalDataContext();
        /*[HttpGet]
        [Route("api/OperatorSub/getListOperatorSub")]
        public IHttpActionResult getListOperatorSub(int ID_JABATAN)
        {
            try
            {
                ClsOperatorSub clsOperatorSub = new ClsOperatorSub();
                clsOperatorSub.ID_JABATAN = ID_JABATAN;
                var data = clsOperatorSub.getListOperatorSub();

                return Ok(new { Status = true, Data = data, Total = data.Count() });
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }*/

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
