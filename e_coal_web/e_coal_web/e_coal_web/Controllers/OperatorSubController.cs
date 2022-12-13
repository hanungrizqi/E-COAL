using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace e_coal_web.Controllers
{
    public class OperatorSubController : Controller
    {
        // GET: OperatorSub
        public ActionResult Index()
        {
            ViewBag.path = ConfigurationManager.AppSettings["path"].ToString();
            return View();
        }
    }
}