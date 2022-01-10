function getBaseAuditConfig() {
  return {
    /**
     * @logLevel
     * Setting `info` means only information about the performance
     * should be reported
     */
    logLevel: 'info',
    /**
     * @output
     * Audit report should be saved in HTML format
     */
    output: 'html',
  }
}

module.exports = getBaseAuditConfig;
