using e_coal_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace e_coal_api.View_Model
{
    public class ClsGrade
    {
        db_eCoalDataContext db = new db_eCoalDataContext();

        public string GRADE { get; set; }
        public int GAR_MIN { get; set; }
        public int GAR_MAX { get; set; }
        public string DISTRICT { get; set; }

        public IQueryable<TBL_M_GRADE> getListGrade()
        {
            var data = db.TBL_M_GRADEs.ToList().AsQueryable();
            return data;
        }

        public void saveGrade()
        {
            TBL_M_GRADE tbl = new TBL_M_GRADE();
            /*tbl.id = id;*/
            tbl.GRADE = GRADE;
            tbl.GAR_MIN = GAR_MIN;
            tbl.GAR_MAX = GAR_MAX;
            tbl.DISTRICT = DISTRICT;

            db.TBL_M_GRADEs.InsertOnSubmit(tbl);
            db.SubmitChanges();
        }

        public void deleteGrade()
        {
            var query = db.TBL_M_GRADEs.Where(t => t.GRADE == GRADE).FirstOrDefault();
            db.TBL_M_GRADEs.DeleteOnSubmit(query);
            db.SubmitChanges();
        }
    }
}