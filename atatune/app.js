var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const multer  = require('multer');
const fs = require('fs');
var app = express();

const folder = './uploads';
const storage = multer.diskStorage({
  destination: folder,
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.mp3')
  }
});
const upload = multer({  storage: storage });
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/upload', upload.single('audioFile'),(req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.json({});
});

app.get('/list', (req, res) => {
  fs.readdir(folder, (err, files) => {
    res.json(files.map(file => '/uploads/' + file));
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
