var fs = require("fs");
var cheerio = require("cheerio");
var request = require("request");

request("https://www.imdb.com/chart/moviemeter/?ref_=nv_mv_mpm", function(
  err,
  res,
  body
) {
  if (err) console.log("Error: " + err);

  var $ = cheerio.load(body);

  var lista = $(".lister-list tr").map(function() {
    var title = $(this)
      .find(".titleColumn a")
      .text();
    console.log("Título: " + title);
    return title;
  });
  console.log("LISTA:", lista);
  fs.writeFile(
    "./index.html",
    `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>Document</title>
    </head>
    <body>
      <ul>
        Títulos:
          ${lista.get().map(item => {
            return `<li>${item}</li>`;
          })}
      </ul>
    </body>
  </html>`,
    function(err, res) {
      console.log("Funcionou", err, res);
    }
  );
});
