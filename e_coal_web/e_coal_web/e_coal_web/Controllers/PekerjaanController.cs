using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace e_coal_web.Controllers
{
    public class PekerjaanController : Controller
    {
        // GET: Pekerjaan
        public ActionResult Index()
        {
            if (Session["Nrp"] == null)
            {
                return RedirectToAction("Index", "Login");
            }

            ViewBag.path = ConfigurationManager.AppSettings["path"].ToString();
            return View();
        }

        public ActionResult Create()
        {
            if (Session["Nrp"] == null)
            {
                return RedirectToAction("Index", "Login");
            }

            ViewBag.path = ConfigurationManager.AppSettings["path"].ToString();
            return View();
        }

        public ActionResult Get()
        {
            if (Session["Nrp"] == null)
            {
                return RedirectToAction("Index", "Login");
            }

            ViewBag.path = ConfigurationManager.AppSettings["path"].ToString();
            return View();
        }

        public ActionResult Update(int? id)
        {
            if (Session["Nrp"] == null)
            {
                return RedirectToAction("Index", "Login");
            }

            ViewBag.path = ConfigurationManager.AppSettings["path"].ToString();
            Session["updateid"] = id.ToString();
            return View();
        }
    }
}