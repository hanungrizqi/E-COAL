using e_coal_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace e_coal_api.View_Model
{
    public class ClsLocation
    {
        db_eCoalDataContext db = new db_eCoalDataContext();

        public int ID_LOC { get; set; }
        public string LOCATION { get; set; }
        public string DISTRICT { get; set; }

        public IQueryable<TBL_M_LOCATION> getListLocation()
        {
            var data = db.TBL_M_LOCATIONs.ToList().AsQueryable();
            return data;
        }

        public void saveLocation()
        {
            TBL_M_LOCATION tbl = new TBL_M_LOCATION();
            /*tbl.id = id;*/
            tbl.LOCATION = LOCATION;
            tbl.DISTRICT = DISTRICT;

            db.TBL_M_LOCATIONs.InsertOnSubmit(tbl);
            db.SubmitChanges();
        }

        public void updateLocation()
        {
            var Query = db.TBL_M_LOCATIONs.Where(x => x.ID_LOC == ID_LOC).FirstOrDefault();
            Query.LOCATION = LOCATION;
            Query.DISTRICT = DISTRICT;
            db.SubmitChanges();
        }

        public void deleteLocation()
        {
            var query = db.TBL_M_LOCATIONs.Where(t => t.ID_LOC == ID_LOC).FirstOrDefault();
            db.TBL_M_LOCATIONs.DeleteOnSubmit(query);
            db.SubmitChanges();
        }
    }
}