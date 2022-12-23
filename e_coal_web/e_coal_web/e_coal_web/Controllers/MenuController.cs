using e_coal_web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace e_coal_web.Controllers
{
    public class MenuController : Controller
    {
        eCoalDataContext db = new eCoalDataContext();
        // GET: Menu
        public ActionResult Menu()
        {
            string profile = Session["IdProfile"].ToString();
            var menu = db.cusp_getMenuProfile(profile).ToList();
            ViewBag.Menu = menu;

            return PartialView("SideMenu");
        }
    }
}