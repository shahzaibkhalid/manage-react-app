const deepmerge = require('deepmerge');
const getBaseAuditConfig = require('./getBaseAuditConfig');

function mergeAuditConfigWithBase(projectConfig = {}) {
  return deepmerge(getBaseAuditConfig(), projectConfig)
}

module.exports = {
  mergeAuditConfigWithBase
};
