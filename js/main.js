(function (doc, win) {

  var app = {

    init: function () {
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
    }

  };

  win.onload = function () {
    app.init();
  };

}(window.document, window));
