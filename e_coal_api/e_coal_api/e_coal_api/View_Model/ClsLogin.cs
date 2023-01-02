using e_coal_api.Models;
using FormsAuth;
using System;
using System.Collections.Generic;
using System.DirectoryServices;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls;

namespace e_coal_api.View_Model
{
    public class ClsLogin
    {
        db_eCoalDataContext db = new db_eCoalDataContext();

        public string username { get; set; }
        public string password { get; set; }

        public bool Login()
        {
            bool status = false;
            bool status_login = false;
            string nrp = "";

            if (username.Count() > 7)
            {
                nrp = username.Substring(username.Length - 7);
            }
            else
            {
                nrp = username;
            }

            status_login = CheckValidLogin();
            //status_login = true;

            if (status_login == false)
            {
                status_login = OpenLdap(username, password);
            }

            if (status_login == true)
            {
                var data_user = db.TBL_M_USERs.Where(x => x.NRP == nrp).SingleOrDefault();

                if (data_user != null)
                {
                    status = true;
                }
                else
                {
                    status = false;
                }
            }

            return status;
        }

        public bool CheckValidLogin()
        {
            bool stat = false;

            try
            {
                var ldap = new LdapAuthentication("LDAP://KPPMINING:389");
                stat = ldap.IsAuthenticated("KPPMINING", username, password);
            }
            catch (Exception ex)
            {
                stat = false;
            }

            return stat;
        }

        public bool OpenLdap(string username = "", string password = "")
        {
            bool status = true;
            string nrp = "";

            if (username.Count() > 7)
            {
                nrp = username.Substring(username.Length - 7);
            }
            else
            {
                nrp = username;
            }

            String uid = "cn=" + nrp + ",ou=Users,dc=kpp,dc=net";

            DirectoryEntry root = new DirectoryEntry("LDAP://10.12.101.102", uid, password, AuthenticationTypes.None);

            try
            {
                // attempt to use LDAP connection
                object connected = root.NativeObject;
                status = true;
                // no exception, login successful
                //Session["LoginNRP"] = model.username.ToUpper();
                //return RedirectToLocal(returnUrl);

            }
            catch (Exception ex)
            {
                status = false;
            }

            return status;
        }

        public VW_USER_PROFILE getSession()
        {
            string nrp = "";
            if (username.Count() > 7)
            {
                nrp = username.Substring(username.Length - 7);
            }
            else
            {
                nrp = username;
            }
            var data = db.VW_USER_PROFILEs.Where(a => a.NRP == nrp).FirstOrDefault();
            return data;
        }
    }
}