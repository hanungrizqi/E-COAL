using e_coal_web.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace e_coal_web.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            if (Session["Nrp"] == null)
            {
                return RedirectToAction("Index", "Login");
            }

            ViewBag.path = ConfigurationManager.AppSettings["path"].ToString();
            return View();
        }

        [HttpPost]
        public JsonResult ImageUpload(ClsUploadImage clsUploadImage)
        {
            Models.eCoalDataContext db = new eCoalDataContext();
            int imgId = 0;
            var file = clsUploadImage.ImageFile;
            byte[] imagebyte = null;
            if (file != null)
            {
                file.SaveAs(Server.MapPath("/UploadImage/" + file.FileName));
                BinaryReader reader = new BinaryReader(file.InputStream);
                imagebyte = reader.ReadBytes(file.ContentLength);

                TBL_M_IMAGE img = new TBL_M_IMAGE();
                img.IMAGE_TITLE = file.FileName;
                img.IMAGE_BYTE = imagebyte;
                img.IMAGE_PATH = "/UploadImage/" + file.FileName;
                db.TBL_M_IMAGEs.InsertOnSubmit(img);
                db.SubmitChanges();
                imgId = img.ID;
            }
            return Json(file.FileName, JsonRequestBehavior.AllowGet);
        }

    }
}