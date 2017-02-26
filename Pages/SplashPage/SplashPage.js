var Timer = require("FuseJS/Timer");

Timer.create(function() {
    goToLoginPage();
}, 3000, false);

function goToLoginPage() {
    router.goto("login");
}
