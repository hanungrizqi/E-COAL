using e_coal_web.View_Model;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace e_coal_web.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        public ActionResult Index()
        {
            ViewBag.path = ConfigurationManager.AppSettings["path"].ToString();
            return View();
        }

        public JsonResult setSession(ClsLogin param)
        {
            Session["Nrp"] = param.NRP;
            Session["Nama"] = param.NAME;
            Session["IdProfile"] = param.ID_PROFILE;
            Session["Profile"] = param.PROFILE;
            Session["District"] = param.DISTRICT;
            Session["PosId"] = param.POSITION_ID;
            Session["PosTitle"] = param.POS_TITLE;

            return Json(JsonRequestBehavior.AllowGet);
        }

        public ActionResult Logout()
        {
            Session.RemoveAll();

            return RedirectToAction("Index", "Login");
        }

    }
}