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
            if (Session["Nrp"] == null)
            {
                return RedirectToAction("Index", "Login");
            }

            ViewBag.path = ConfigurationManager.AppSettings["path"].ToString();
            return View();
        }

        public ActionResult InRom()
        {
            if (Session["Nrp"] == null)
            {
                return RedirectToAction("Index", "Login");
            }

            ViewBag.path = ConfigurationManager.AppSettings["path"].ToString();
            return View();
        }

        public ActionResult OutRom()
        {
            if (Session["Nrp"] == null)
            {
                return RedirectToAction("Index", "Login");
            }

            ViewBag.path = ConfigurationManager.AppSettings["path"].ToString();
            return View();
        }
    }
}