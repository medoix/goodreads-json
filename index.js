const express = require('express');
const app = express();
const hbs = require('hbs');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const api = require('./api');

if (process.env.ENV === 'development') {
  const env = require('node-env-file');
  env(__dirname + '/.env');
};

hbs.registerHelper('hasLength', (ctx, opt) => ctx.length);

const apiClient = new api({
  key: process.env.key,
  secret: process.env.secret
});

app.set('views', './views');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
hbs.registerPartials(__dirname + '/views/partials');

app.get('/reading/:user/:shelf', (req, res) => {
  apiClient
    .getShelf(req.params.user, req.params.shelf)
    .then(b => { console.log(b[0].book[0].id[0]['_']); return b })
    .then(items => res.render('reading', { items }))
    .catch(error => res.render('reading', { error }));
});

app.get('/reading/:user/:shelf/json', (req, res) => {
  apiClient.getShelf(req.params.user, req.params.shelf)
    .then(items => res.json(items))
    .catch(error => renderError(res, error))
});

app.get('/book/:id/', (req, res) => {
  apiClient.getBookById(req.params.id)
    .then(book => res.render('book', { book }))
    .catch(error => res.render('book', { error }))
});

app.get('/book/:id/json', (req, res) => {
  apiClient.getBookById(req.params.id)
    .then(book => res.json(book))
    .catch(error => renderError(res, error));
})
app.get('/author/:id/', (req, res) => {
  apiClient.getAuthorById(req.params.id)
    .then(author => res.render('author', { author }))
    .catch(error => renderError(res, error));
});

app.get('/author/:id/json', (req, res) => {
  apiClient.getAuthorById(req.params.id)
    .then(author => res.json(author))
    .catch(error => res.renderError(res, error));
});

app.post('/search/book/', (req, res) => {
  apiClient.searchBook({
    title: req.body.title || '',
    author: req.body.author || '',
  })
    .then(data => res.json(data))
    .catch(err => renderError(res, error));
});

app.get('/', (req, res) => {
  res.render('index');
});


function renderError(res, error) {
  res.status(400).send({ error });
}

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
