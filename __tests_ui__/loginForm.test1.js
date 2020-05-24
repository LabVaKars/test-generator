module.exports = {
    LoginFormTest: function (browser) { 
        browser.init()
        browser.url('http://localhost:5555/login')
        browser.setValue('css selector','[name=email]','a')
        browser.setValue('css selector','[name=password]','a')
        browser.click('button.btn-success')
        browser.expect.element('.alert.alert-danger').present
        browser.expect.element('.alert.alert-danger').text.equals('Username or password is incorrect')
    }
};