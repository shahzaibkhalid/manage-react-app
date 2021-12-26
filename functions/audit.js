const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const serve = require('./serve')
const { resolvePath, PROJECT_VARS, FOLDER_NAMES, FILE_NAMES } = require('../utils')

async function generateAndOpenAuditReport() {
  const { PROTOCOL, HOST, SERVER_PORT } = PROJECT_VARS;
  const finalAuditConfig = require(resolvePath(
    FOLDER_NAMES.config,
    FOLDER_NAMES.codeQuality,
    FILE_NAMES.auditConfig
  ));

  const url = PROTOCOL + HOST + ':' + SERVER_PORT;

  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const runnerResult = await lighthouse(url, {...finalAuditConfig, port: chrome.port});

  const reportHtml = runnerResult.report;
  const reportPath = resolvePath(FOLDER_NAMES.dist, FOLDER_NAMES.report, FILE_NAMES.auditReport);
  fs.writeFileSync(
    reportPath,
    reportHtml
  );

  console.log('Report is done for', runnerResult.lhr.finalUrl);

  //TODO: in case of CI, kill the process here if audit does not have adequate score

  await chromeLauncher.launch({startingUrl: reportPath});

  await chrome.kill();
};

function audit() {
  serve();
  generateAndOpenAuditReport();
}
module.exports = audit
