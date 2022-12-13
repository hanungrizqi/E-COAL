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
            return View();
        }

        public ActionResult Create()
        {
            return View();
        }

        public ActionResult Get()
        {
            return View();
        }

        public ActionResult Update(int? id)
        {
            Session["updateid"] = id.ToString();
            return View();
        }
    }
}