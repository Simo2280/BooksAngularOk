exports.routes = (app) => {

    //includo le routes

    const bookRoutes = require('./routes/books');

    //inizializzo le routes

    bookRoutes.books(app);

}
