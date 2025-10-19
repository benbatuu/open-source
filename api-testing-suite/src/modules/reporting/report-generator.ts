import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';
import { TestReport, TestResult } from '../../types';
import { logger } from '../../core/logger/logger';

export class ReportGenerator {
  private outputDir: string;

  constructor(outputDir = './test-results') {
    this.outputDir = outputDir;
    this.ensureOutputDir();
  }

  private ensureOutputDir(): void {
    if (!existsSync(this.outputDir)) {
      mkdirSync(this.outputDir, { recursive: true });
    }
  }

  generateJsonReport(report: TestReport, filename = 'test-report.json'): string {
    const filePath = join(this.outputDir, filename);
    
    try {
      const jsonReport = JSON.stringify(report, null, 2);
      writeFileSync(filePath, jsonReport);
      logger.info(`JSON report generated: ${filePath}`);
      return filePath;
    } catch (error) {
      logger.error('Failed to generate JSON report:', error);
      throw error;
    }
  }

  generateHtmlReport(report: TestReport, filename = 'test-report.html'): string {
    const filePath = join(this.outputDir, filename);
    
    try {
      const html = this.createHtmlReport(report);
      writeFileSync(filePath, html);
      logger.info(`HTML report generated: ${filePath}`);
      return filePath;
    } catch (error) {
      logger.error('Failed to generate HTML report:', error);
      throw error;
    }
  }

  generateXmlReport(report: TestReport, filename = 'test-report.xml'): string {
    const filePath = join(this.outputDir, filename);
    
    try {
      const xml = this.createXmlReport(report);
      writeFileSync(filePath, xml);
      logger.info(`XML report generated: ${filePath}`);
      return filePath;
    } catch (error) {
      logger.error('Failed to generate XML report:', error);
      throw error;
    }
  }

  generateJunitReport(report: TestReport, filename = 'junit-report.xml'): string {
    const filePath = join(this.outputDir, filename);
    
    try {
      const xml = this.createJunitReport(report);
      writeFileSync(filePath, xml);
      logger.info(`JUnit report generated: ${filePath}`);
      return filePath;
    } catch (error) {
      logger.error('Failed to generate JUnit report:', error);
      throw error;
    }
  }

  private createHtmlReport(report: TestReport): string {
    const passRate = report.summary.passRate.toFixed(2);
    const statusColor = report.summary.passRate >= 80 ? '#4caf50' : report.summary.passRate >= 50 ? '#ff9800' : '#f44336';

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>API Test Report - ${report.config.name}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: #f5f5f5; padding: 20px; }
    .container { max-width: 1200px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    h1 { color: #333; margin-bottom: 10px; }
    .meta { color: #666; margin-bottom: 30px; }
    .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
    .summary-card { padding: 20px; border-radius: 8px; background: #f9f9f9; border-left: 4px solid #2196f3; }
    .summary-card h3 { color: #666; font-size: 14px; text-transform: uppercase; margin-bottom: 10px; }
    .summary-card .value { font-size: 32px; font-weight: bold; color: #333; }
    .pass-rate { border-left-color: ${statusColor} !important; }
    .pass-rate .value { color: ${statusColor}; }
    .tests { margin-top: 30px; }
    .test-item { padding: 15px; margin-bottom: 10px; border-radius: 6px; border-left: 4px solid #ddd; background: #f9f9f9; }
    .test-item.passed { border-left-color: #4caf50; }
    .test-item.failed { border-left-color: #f44336; background: #ffebee; }
    .test-item.skipped { border-left-color: #ff9800; }
    .test-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; }
    .test-name { font-weight: bold; color: #333; }
    .test-duration { color: #666; font-size: 14px; }
    .test-status { display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold; }
    .status-passed { background: #4caf50; color: white; }
    .status-failed { background: #f44336; color: white; }
    .status-skipped { background: #ff9800; color: white; }
    .error-message { margin-top: 10px; padding: 10px; background: white; border-radius: 4px; color: #d32f2f; font-family: monospace; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>${report.config.name}</h1>
    <div class="meta">
      <p>Duration: ${report.duration}ms | Start: ${report.startTime.toISOString()} | End: ${report.endTime.toISOString()}</p>
    </div>

    <div class="summary">
      <div class="summary-card">
        <h3>Total Tests</h3>
        <div class="value">${report.summary.total}</div>
      </div>
      <div class="summary-card">
        <h3>Passed</h3>
        <div class="value" style="color: #4caf50;">${report.summary.passed}</div>
      </div>
      <div class="summary-card">
        <h3>Failed</h3>
        <div class="value" style="color: #f44336;">${report.summary.failed}</div>
      </div>
      <div class="summary-card pass-rate">
        <h3>Pass Rate</h3>
        <div class="value">${passRate}%</div>
      </div>
    </div>

    <div class="tests">
      <h2>Test Results</h2>
      ${report.results.map(test => this.createTestItemHtml(test)).join('\n')}
    </div>
  </div>
</body>
</html>`;
  }

  private createTestItemHtml(test: TestResult): string {
    return `
      <div class="test-item ${test.status}">
        <div class="test-header">
          <span class="test-name">${test.name}</span>
          <div>
            <span class="test-status status-${test.status}">${test.status.toUpperCase()}</span>
            <span class="test-duration">${test.duration}ms</span>
          </div>
        </div>
        ${test.error ? `<div class="error-message">${test.error.message}</div>` : ''}
      </div>
    `;
  }

  private createXmlReport(report: TestReport): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<testReport>
  <config>
    <name>${this.escapeXml(report.config.name)}</name>
    <baseUrl>${this.escapeXml(report.config.baseUrl)}</baseUrl>
  </config>
  <summary>
    <total>${report.summary.total}</total>
    <passed>${report.summary.passed}</passed>
    <failed>${report.summary.failed}</failed>
    <skipped>${report.summary.skipped}</skipped>
    <error>${report.summary.error}</error>
    <passRate>${report.summary.passRate.toFixed(2)}</passRate>
  </summary>
  <duration>${report.duration}</duration>
  <startTime>${report.startTime.toISOString()}</startTime>
  <endTime>${report.endTime.toISOString()}</endTime>
  <tests>
${report.results.map(test => this.createTestXml(test)).join('\n')}
  </tests>
</testReport>`;
  }

  private createTestXml(test: TestResult): string {
    return `    <test>
      <id>${this.escapeXml(test.id)}</id>
      <name>${this.escapeXml(test.name)}</name>
      <status>${test.status}</status>
      <duration>${test.duration}</duration>
      <startTime>${test.startTime.toISOString()}</startTime>
      <endTime>${test.endTime.toISOString()}</endTime>
      ${test.error ? `<error>${this.escapeXml(test.error.message)}</error>` : ''}
    </test>`;
  }

  private createJunitReport(report: TestReport): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<testsuites name="${this.escapeXml(report.config.name)}" tests="${report.summary.total}" failures="${report.summary.failed}" errors="${report.summary.error}" skipped="${report.summary.skipped}" time="${(report.duration / 1000).toFixed(3)}">
  <testsuite name="${this.escapeXml(report.config.name)}" tests="${report.summary.total}" failures="${report.summary.failed}" errors="${report.summary.error}" skipped="${report.summary.skipped}" time="${(report.duration / 1000).toFixed(3)}" timestamp="${report.startTime.toISOString()}">
${report.results.map(test => this.createJunitTestCase(test)).join('\n')}
  </testsuite>
</testsuites>`;
  }

  private createJunitTestCase(test: TestResult): string {
    const time = (test.duration / 1000).toFixed(3);
    let caseContent = `    <testcase name="${this.escapeXml(test.name)}" classname="${this.escapeXml(test.id)}" time="${time}">`;
    
    if (test.status === 'failed' && test.error) {
      caseContent += `
      <failure message="${this.escapeXml(test.error.message)}">${this.escapeXml(test.error.stack || test.error.message)}</failure>`;
    } else if (test.status === 'error' && test.error) {
      caseContent += `
      <error message="${this.escapeXml(test.error.message)}">${this.escapeXml(test.error.stack || test.error.message)}</error>`;
    } else if (test.status === 'skipped') {
      caseContent += `
      <skipped />`;
    }
    
    caseContent += `
    </testcase>`;
    return caseContent;
  }

  private escapeXml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  generateAllReports(report: TestReport, baseName = 'test-report'): Record<string, string> {
    return {
      json: this.generateJsonReport(report, `${baseName}.json`),
      html: this.generateHtmlReport(report, `${baseName}.html`),
      xml: this.generateXmlReport(report, `${baseName}.xml`),
      junit: this.generateJunitReport(report, `${baseName}-junit.xml`),
    };
  }
}
