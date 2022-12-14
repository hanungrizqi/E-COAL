using e_coal_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace e_coal_api.View_Model
{
    public class ClsCgv
    {
        db_eCoalDataContext db = new db_eCoalDataContext();

        public TBL_M_IMAGE getImg()
        {
            var data = db.TBL_M_IMAGEs.OrderByDescending(a => a.UPLOAD_DATE).FirstOrDefault();
            return data;
        }
    }
}