using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace e_coal_web.Controllers
{
    public class ProfileController : Controller
    {
        // GET: Profile
        public ActionResult Index()
        {
            if (Session["Nrp"] == null)
            {
                return RedirectToAction("Index", "Login");
            }

            return View();
        }

        public ActionResult Create()
        {
            if (Session["Nrp"] == null)
            {
                return RedirectToAction("Index", "Login");
            }

            return View();
        }

        public ActionResult Get()
        {
            if (Session["Nrp"] == null)
            {
                return RedirectToAction("Index", "Login");
            }

            return View();
        }

        public ActionResult Update(int? id)
        {
            if (Session["Nrp"] == null)
            {
                return RedirectToAction("Index", "Login");
            }

            Session["updateid"] = id.ToString();
            return View();
        }
    }
}