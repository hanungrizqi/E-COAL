using e_coal_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace e_coal_api.View_Model
{
    public class ClsRatingOperator
    {
        db_eCoalDataContext db = new db_eCoalDataContext();

        public IQueryable<cusp_getListPenilaianResult> getListPenilaian()
        {
            var data = db.cusp_getListPenilaian().ToList().AsQueryable();
            return data;
        }
    }
}