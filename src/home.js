function compose(f, g) {
  return function(x) {
    return f(g(x));
  }
}

const getValue = function(el) {
  return el.target.value;
};

function Index() {
  this.inputField = document.getElementById('input');
  this.getBooksButton = document.getElementById('get-books');
  this.inputFieldEl = document.querySelector('.input__field');
  this.patternID = /\d+/g;
  this.extractID = this.extractID.bind(this);
  this.getBooks = this.getBooks.bind(this);
  this.getID = compose(this.extractID, getValue);
}

Index.prototype.extractID = function(val) {
  this.goodreadsID = val.match(this.patternID) ? val.match(this.patternID)[0] : null;
};

Index.prototype.getBooks = function(e) {
  if (this.goodreadsID) {
    window.location = '/reading/' + this.goodreadsID + '/currently-reading/';
  } else {
    this.inputFieldEl.focus();
  }
}

Index.prototype.init = function() {
  this.inputField.addEventListener('keyup', this.getID);
  this.getBooksButton.addEventListener('click', this.getBooks);

  setTimeout(() => this.inputFieldEl.focus(), 700);
};

const app = new Index();
app.init();
