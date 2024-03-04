//assistance by ChatGPT
const allowedRouteStep2 = ['/reset-password-step1'];

//only from navbar when logged in or by following the path
const allowedRoutePassword = ['/reset-password-step2', '/user-is-logged-in'];

exports.protectPasswordRoute= (req, res, next) => {
    
    if (allowedRoutePassword.includes(req.headers.referer)) {
        // If it is, allow the request to proceed
        next();
    } else {
        // If not, return an error response
        return res.status(401).json({ error: 'Unauthorized access' });
    }
    };

exports.protectStep2Route= (req, res, next) => {

        if (allowedRouteStep2.includes(req.headers.referer)) {
            // If it is, allow the request to proceed
            next();
        } else {
            // If not, return an error response
            return res.status(401).json({ error: 'Unauthorized access' });
        }
        };