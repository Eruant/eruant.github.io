(function (doc, win) {

  var app = {

    init: function () {
      this.setExternalLinks();
    },

    setExternalLinks: function () {
      if (!doc.getElementsByTagName) {
        return;
      }

      var items, item, href, i, il;

      items = doc.getElementsByTagName('a');
      for (i = 0, iL = items.length; i < iL; i++) {
        item = items[i];
        href = item.getAttribute("href");

        if (href && href.search(/^(https?:\/\/)/) === 0) {
          item.onclick = this.openInNewWindow;
        }
      }
    },

    openInNewWindow: function (event) {
      event.preventDefault();
      window.open(event.target.getAttribute("href"));
    }
  };

  win.onload = function () {
    app.init();
  };

}(window.document, window));
