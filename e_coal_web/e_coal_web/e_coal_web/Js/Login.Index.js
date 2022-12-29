//Codebase.onLoad
//(
//    class {
//        static initValidationSignIn() {
//            Codebase.helpers("jq-validation"), jQuery(".js-validation-signin").validate({
//                rules: {
//                    "login_username": { required: !0, minlength: 3 }
//                    , "login_password": { required: !0, minlength: 5 }
//                }, messages: {
//                    "login_username": { required: "Please enter a username", minlength: "Your username must consist of at least 3 characters" }
//                    , "login_password": { required: "Please provide a password", minlength: "Your password must be at least 5 characters long" }
//                }
//            })
//        } static init() { this.initValidationSignIn() }
//    }.init()
//);

function login() {
    console.log('masuk login');
    var obj = {
        username: $("#login-username").val()
        , password: $("#login-password").val()
    }

    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        url: $("#hd_path").val() + "Login",
        data: JSON.stringify(obj),
        success: function (result) {
            if (result.Status == true) {
                console.log(result.Data);
                if (result.Data == true) {
                    getSession();
                } else {
                    alert("username/password salah!!");
                }
            } else {
                alert(result.Error);
            }
        }
    })
}

function getSession() {
    console.log('masuk get sesion');
    var obj = {
        username: $("#login-username").val()
        , password: $("#login-password").val()
    }

    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        url: $("#hd_path").val() + "Session",
        data: JSON.stringify(obj),
        success: function (result) {
            if (result.Status == true) {
                setSession(result.Data);
            } else {
                alert(result.Error);
            }
        }
    })
}

function setSession(data) {
    console.log('masuk set sesion');
    console.log(data);
    var obj = {
        NRP: data.NRP
        , NAME: data.NAME
        , ID_PROFILE: data.ID_PROFILE
        , PROFILE: data.PROFILE
        , DISTRICT: data.DISTRICT
        , POSITION_ID: data.POSITION_ID
        , POS_TITLE: data.POS_TITLE
    }
    console.log(obj);
    $.ajax({
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        url: "Login/setSession",
        data: JSON.stringify(obj),
        success: function (result) {
            window.location.href = "/Home/Index";
        }
    })
}