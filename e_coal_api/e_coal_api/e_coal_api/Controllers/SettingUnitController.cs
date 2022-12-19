using e_coal_api.View_Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace e_coal_api.Controllers
{
    public class SettingUnitController : ApiController
    {
        [HttpGet]
        [Route("api/SettingUnit/getListOperatorByRating")]
        public IHttpActionResult getListOperatorByRating(int ID_PEKERJAAN)
        {
            try
            {
                ClsSettingUnit clsSettingUnit = new ClsSettingUnit();
                clsSettingUnit.ID_PEKERJAAN = ID_PEKERJAAN;
                var data = clsSettingUnit.getListOperatorByRating();

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
        }

        [HttpPost]
        [Route("api/SettingUnit/submitOperator")]
        public IHttpActionResult submitOperator(ClsSettingUnit clsSettingUnit)
        {
            try
            {
                clsSettingUnit.submitOperator();

                return Ok(new { Status = true});
            }
            catch (Exception e)
            {
                return Ok(new { Status = false, Error = e.ToString() });
            }
        }
    }
}
