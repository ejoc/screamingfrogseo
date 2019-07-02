const express = require("express");
const serveIndex = require('serve-index');
const bodyParser = require("body-parser");
const saveReport = require("./utils/save-report");
const logger = require("./utils/logger");

const app = express();
app.use(bodyParser.json());

app.use('/reports', express.static('reports'), serveIndex('reports', { icons: true }));

app.post("/collect", async function(req, res) {
  const { body = {} } = req;
  const { url } = body;

  if (!url) {
    logger.info("/collect missing `url` data");
    return res.sendStatus(400);
  }

  try {
    const outputPath = await saveReport(url);

    const publicUrl = `${req.protocol}://${req.get("host")}/${outputPath}`;

    res.status(201).send({ report: publicUrl });
  } catch (err) {
    logger.error(`Failed to get or save data for ${url}`, err);
    res.sendStatus(500);
  }
});

app.listen(3000, function() {
  console.log("Application listening on port 3000!");
});
