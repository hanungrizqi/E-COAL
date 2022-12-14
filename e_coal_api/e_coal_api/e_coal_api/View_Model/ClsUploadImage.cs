using e_coal_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace e_coal_api.View_Model
{
    public class ClsUploadImage
    {
        db_eCoalDataContext db = new db_eCoalDataContext();
        public int ID { get; set; }
        public string IMAGE_TITLE { get; set; }
        public byte[] IMAGE_BYTE { get; set; }
        public string IMAGE_PATH { get; set; }
        public DateTime UPLOAD_DATE { get; set; }
        public string UPLOAD_BY { get; set; }
        public HttpPostedFileWrapper ImageFile { get; set; }

        /*public void submitImage()
        {
            TBL_M_IMAGE tbl = new TBL_M_IMAGE();
            tbl.IMAGE_TITLE = IMAGE_TITLE;
            tbl.IMAGE_PATH = IMAGE_PATH;
            tbl.UPLOAD_DATE = DateTime.Now;
            tbl.UPLOAD_BY = UPLOAD_BY;
            *//*tbl.UPLOAD_DATE = UPLOAD_DATE;
            tbl.UPLOAD_BY = UPLOAD_BY;
            tbl.FLAG = FLAG;
            tbl.IMAGE_PATH = IMAGE_PATH;*//*

            db.TBL_M_IMAGEs.InsertOnSubmit(tbl);
            db.SubmitChanges();
        }*/
    }
}