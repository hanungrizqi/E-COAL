using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace e_coal_web.Controllers
{
    public class InputCoalController : Controller
    {
        // GET: InputCoal
        public ActionResult InSitu()
        {
            ViewBag.path = ConfigurationManager.AppSettings["path"].ToString();
            return View();
        }

        public ActionResult InRom()
        {
            ViewBag.path = ConfigurationManager.AppSettings["path"].ToString();
            return View();
        }

        public ActionResult OutRom()
        {
            ViewBag.path = ConfigurationManager.AppSettings["path"].ToString();
            return View();
        }
    }
}