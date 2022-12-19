using e_coal_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace e_coal_api.View_Model
{
    public class ClsRequestCoal
    {
        db_eCoalDataContext db = new db_eCoalDataContext();

        public string MOMCOST { get; set; }
        public decimal VOLUMECOAL { get; set; }
        public decimal TARGETGCV { get; set; }
        public DateTime DEADLINE { get; set; }
        public int STATUS { get; set; }
        /*public DateTime INPUT_DATE { get; set; }*/
        /*public DateTime UPLOAD_DATE { get; set; }
        public string UPLOAD_BY { get; set; }
        public int FLAG { get; set; }
        public string IMAGE_PATH { get; set; }*/

        public void submitOperator()
        {
            TBL_T_REQUEST_COAL tbl = new TBL_T_REQUEST_COAL();
            tbl.MOMCOST = MOMCOST;
            tbl.VOLUMECOAL = VOLUMECOAL;
            tbl.TARGETGCV = TARGETGCV;
            tbl.DEADLINE = DEADLINE;
            tbl.STATUS = STATUS;
            /*tbl.INPUT_DATE = DateTime.Now;*/
            /*tbl.UPLOAD_DATE = UPLOAD_DATE;
            tbl.UPLOAD_BY = UPLOAD_BY;
            tbl.FLAG = FLAG;
            tbl.IMAGE_PATH = IMAGE_PATH;*/

            db.TBL_T_REQUEST_COALs.InsertOnSubmit(tbl);
            db.SubmitChanges();
        }
    }
}