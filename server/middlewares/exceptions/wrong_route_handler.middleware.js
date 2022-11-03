export default function wrongRouteHandler(req,res,next){
    res.status(404).json(`Cannot find route method ${req.method} route: ${req.originalUrl}`)
}