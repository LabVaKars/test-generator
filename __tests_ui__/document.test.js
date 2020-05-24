module.exports = {
    "Test name": function(browser){
    browser.useCss();
    browser.init();
    browser.url("https://the-internet.herokuapp.com/");
    browser.setCookie({name:"asd",value:"asd"});
    browser.expect.cookie("asd").equals("asd");
    browser.deleteCookie("asd");
    browser.expect.cookie("asd").not.equals("asd");
    
    }
    "Test name": function(browser){
    browser.useCss();
    browser.init();
    browser.url("https://the-internet.herokuapp.com/javascript_alerts");
    browser.css().click();
    
    }
    }