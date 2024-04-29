exports.books = (app) => {

    const bookController = require('../controllers/bookController');
  
    app.get("/books", bookController.getBooksController);

    app.get("/book", bookController.getBookController);
  
    app.post("/book", bookController.postBookController);

    app.put("/book", bookController.putBookController);

    app.delete("/book", bookController.deleteBookController);

}
