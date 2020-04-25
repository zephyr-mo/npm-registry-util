const inquirer = require('inquirer');
const ora      = require('ora');
const shell    = require('shelljs');
const chalk    = require('chalk');

const questions = [
  {
    type: 'list',
    name: 'registry',
    message: '请选择你要设置的npm源',
    choices: [
      { name: '🦄 - npm源(https://registry.npmjs.org)', value: ['npm', 'https://registry.npmjs.org'] },
      { name: '🦋 - 淘宝源(https://registry.npm.taobao.org)', value: ['taobao', 'https://registry.npm.taobao.org'] }
    ],
    filter: function(val) {
      return val;
    }
  }
];
const select = () => {
    inquirer
      .prompt(questions)
      .then(({ registry }) => {
        const spinner = ora(`你选择了${registry[0]}源\n正在切换中\n`);
        spinner.start();
        shell.exec(`npm config set registry ${registry[1]}`, code => {
          if ( code !== 0 ) {
            console.log(code);
          }

          spinner.text = '切换成功\n';
          spinner.succeed();
          spinner.stop();

          spinner.start();
          spinner.color = 'green';
          spinner.text = `🌟${chalk.green('当前npm源地址:')} `;
          spinner.succeed();
          spinner.stop();
          shell.exec('npm config get registry');
        });
      })
      .catch(error => {
        if(error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
        } else {
          // Something else when wrong
        }
      });
}

module.exports = select;