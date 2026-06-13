const routerAtendimento = require('./object_Router')
module.exports = (app,express)=>{
    app.use(express.json());
    app.use(express.urlencoded({extended : true}));
    app.use(routerAtendimento);
}