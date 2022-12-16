using e_coal_api.Models;
using e_coal_api.View_Model;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace e_coal_api.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            Models.db_eCoalDataContext db = new db_eCoalDataContext();
            return View();
        }

        //[HttpPost]
        //[Route("api/Home/ImageUpload")]
        //public JsonResult ImageUpload(ClsUploadImage clsUploadImage)
        //{
        //    Models.db_eCoalDataContext db = new db_eCoalDataContext();
        //    int imgId = 0;
        //    var file = clsUploadImage.ImageFile;
        //    byte[] imagebyte = null;
        //    if (file != null)
        //    {
        //        file.SaveAs(Server.MapPath("/UploadImage/" + file.FileName));
        //        BinaryReader reader = new BinaryReader(file.InputStream);
        //        imagebyte = reader.ReadBytes(file.ContentLength);

        //        TBL_M_IMAGE img = new TBL_M_IMAGE();
        //        img.IMAGE_TITLE = file.FileName;
        //        //img.IMAGE_BYTE = imagebyte;
        //        img.IMAGE_PATH = "/UploadImage/" + file.FileName;
        //        db.TBL_M_IMAGEs.InsertOnSubmit(img);
        //        db.SubmitChanges();
        //        imgId = img.ID;
        //    }
        //    return Json(imgId, JsonRequestBehavior.AllowGet);
        //}

        //[HttpGet]
        //[Route("api/Home/DisplayImage")]
        //public ActionResult DisplayImage(int imgid)
        //{
        //    Models.db_eCoalDataContext db = new db_eCoalDataContext();
        //    var img = db.TBL_M_IMAGEs.SingleOrDefault(x => x.ID == imgid);
        //    return File(img.IMAGE_BYTE.ToArray(), "image/jpg");
        //}
    }
}
