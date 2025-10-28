module.exports = {
  default: {
    require: ["./e2e/steps/**/*.ts", "./e2e/support/**/*.ts"],
    requireModule: ["ts-node/register/transpile-only"],
    format: ["progress", "json:reports/cucumber-report.json"],
    paths: ["./e2e/features/**/*.feature"],
    publishQuiet: true
  }
};