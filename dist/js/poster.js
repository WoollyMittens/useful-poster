/*
	Source:
	van Creij, Maurice (2019). "formposter.js: Submit a form cross domain", http://www.woollymittens.nl/.

	License:
	This work is licensed under a Creative Commons Attribution 3.0 Unported License.
*/

// establish the class
var Poster = function (cfg) {

	// PROPERTIES

  this.cfg = cfg;

	// METHODS

  this.onSubmit = function(evt) {
    evt.preventDefault();
    var form = this.cfg.form;
    var fields = form.querySelectorAll('input, select, textarea');
    var checkable, params = [];
    var request = new XMLHttpRequest();
    request.open("POST", form.getAttribute('action'), true);
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    for (var key in fields) {
      if (fields.hasOwnProperty(key)) {
        checkable = /radio|checkbox/i.test(fields[key].type);
        if (checkable && fields[key].checked || !checkable) params.push(fields[key].name + '=' + fields[key].value);
      }
    }
    console.log('params', params);
    request.send(params.join('&'));
    request.addEventListener('load', this.onSuccess.bind(this, request));
    request.addEventListener('error', this.onFallback.bind(this, request));
  }

  this.onSuccess = function(request, evt) {
    // only accept successful status
    if (request.status === 200) {
      // hide the form
      this.cfg.form.style.display = 'none';
      // show the thank you message
      this.cfg.response.innerHTML = request.responseText;
      this.cfg.response.style.display = 'block';
    }
    // or resort to desperation
    else {
      this.onFallback(request);
    }
  };

  this.onFallback = function(request, evt) {
    var form = this.cfg.form;
    // create an iframe
    var iframe = document.createElement('iframe');
    iframe.id = 'poster-iframe';
    document.body.appendChild(iframe);
    var iframeBody = iframe.contentWindow.document.body;
    // clone the form into the iframe
    this.clone = form.cloneNode(true);
    iframeBody.appendChild(this.clone);
    // submit the cloned form
    this.clone.submit();
    // hide the form
    this.cfg.form.style.display = 'none';
    // show the thank you message
    this.cfg.response.style.display = 'block';
  };

	// EVENTS

  this.cfg.form.addEventListener('submit', this.onSubmit.bind(this));

};

// return as a require.js module
if (typeof define != 'undefined') define([], function () { return Poster });
if (typeof module != 'undefined') module.exports = Poster;
