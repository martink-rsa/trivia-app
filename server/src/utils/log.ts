import * as chalk from 'chalk';

const log = (() => {
  const info = (...params: any[]) => {
    console.log(chalk.blue.bold.inverse(' INFO '), ...params);
  };
  const error = (...params: any[]) => {
    console.log(chalk.red.bold.inverse(' ERROR '), ...params);
  };
  const success = (...params: any[]) => {
    console.log(chalk.green.bold.inverse(' SUCCESS '), ...params);
  };
  const warn = (...params: any[]) => {
    console.log(chalk.yellow.bold.inverse(' WARNING '), ...params);
  };

  return Object.assign(
    function (...params: any[]) {
      console.log.apply(console, arguments);
    },
    {
      info,
      i: info,
      error,
      e: error,
      success,
      s: success,
      warn,
      w: warn,
    },
  );
})();

export default log;
