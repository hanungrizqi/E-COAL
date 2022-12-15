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

        
    }
}
