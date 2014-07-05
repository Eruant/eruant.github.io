/*globals requestAnimationFrame, mozRequestAnimationFrame, webkitRequestAnimationFrame, msRequestAnimationFrame*/

(function (doc, win) {

  var app = {

    init: function () {
      this.loadCSS();
      this.setExternalLinks();

      doc.getElementById('menuToggle').onmousedown = this.toggleMenu;
    },

    setExternalLinks: function () {
      if (!doc.getElementsByTagName) {
        return;
      }

      var items, item, href, i, il;

      items = doc.getElementsByTagName('a');
      for (i = 0, il = items.length; i < il; i++) {
        item = items[i];
        href = item.getAttribute("href");

        if (href && href.search(/^(https?:\/\/)/) === 0) {
          //item.onclick = this.openInNewWindow;
          item.target = "_blank";
        }
      }
    },

    toggleMenu: function () {
      var nav = doc.getElementById('nav');

      if (nav.className.match(/(?:^|\s)active(?!\S)/)) {
        // remove class
        nav.className = nav.className.replace(/(?:^|\s)active(?!\S)/g, '');
      } else {
        // add class
        nav.className += " active";
      }
    },

    linkCallBack: function (urlArray) {

      return function () {

        var i, il, link, head;

        il = urlArray.length;
        head = doc.getElementsByTagName('head')[0];
        for (i = 0; i < il; i++) {
          link = doc.createElement('link');
          link.rel = 'stylesheet';
          link.href = urlArray[i];
          head.parentNode.insertBefore(link, head);
        }
      };
    },

    loadCSS: function () {

      var syntax = this.linkCallBack([
        '/css/main.css',
        '/css/syntax.css',
        'http://fonts.googleapis.com/css?family=Acme|Open+Sans'
      ]),
        raf = requestAnimationFrame || mozRequestAnimationFrame || webkitRequestAnimationFrame || msRequestAnimationFrame;

      if (raf) {
        raf(syntax);
      } else {
        win.addEventListener('load', syntax);
      }
    }

  };

  win.onload = function () {
    app.init();
  };

}(window.document, window));
