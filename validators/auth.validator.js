const validateAuth = (req, res, next) => {
    let errors = "";
    if(req.body != undefined){
        const {email, password} = req.body;
        if(!(email && email.length > 0)){
            errors += "Email is required\n";
        }

        if(!(password && password.length > 0)) {
            errors += "Password is required\n";
        } else {
            // if(!(password.length > 8)) {
            //     errors += "Minimal password length is 8\n";
            // }
        }
        if(errors.length > 0){
            return res.status(400).send({message: errors});
        }
    } else {
        return res.status(400).send({message: "Empty request body\n"});
    }
    next();
}

module.exports = {
    validateAuth
}
