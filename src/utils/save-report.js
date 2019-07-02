const path = require("path");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const logger = require("./logger");

async function screamingfrog(url, outputPath) {
  return exec(`./seo.sh ${url} ${outputPath}`)
}

function pad2(n) { return n < 10 ? '0' + n : n }

function dateFormat(date) {
  return `${date.getFullYear().toString()}${pad2(date.getMonth() + 1)}${pad2(date.getDate())}_${pad2(date.getHours())}${pad2( date.getMinutes())}${pad2(date.getSeconds())}`
}

module.exports = async (url) => {
  try {
    const date = new Date();
    const outputPath = path.join(
      __dirname,
      "../../reports",
      url.replace(/(^\w+:|^)\/\//, ""),
      `${dateFormat(date)}`
    );
    const { stdout, stderr } = await screamingfrog(url, outputPath);
    if (stderr) throw new Error(stderr)
    return outputPath.substring(outputPath.indexOf("reports"), outputPath.length)
  } catch (err) {
    logger.error(`Failed to generate report for ${url}`, err);
    return Promise.reject("Failed to generate report");
  }
};
