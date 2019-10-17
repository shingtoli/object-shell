import childProc from 'child_process';

const opts = {
  shell: '/bin/bash',
};

const exec = (command, options) => new Promise((resolve, reject) => {
  childProc.exec(command, options, (error, stdout, stderr) => {
    if (error) {
      console.error(error);
      console.error(stderr);
      reject(stderr);
    }
    resolve(stdout);
  })
});

const escapeQuotes = qstr => qstr.replace(/[\'|\"]/g, '\\$&');

const objectify = (command) => {
  const { base, flags = '', args } = command;

  const stringedArgs = args.map(arg => `$'${escapeQuotes(arg)}'`).join(' ');

  return String.raw`${[base, flags, args].join(' ')}`;
};

(async () => {
  const someCommand = {
    base: 'echo',
    args: ['HELLO \'mister\' UNIVERSE', `Isn't it wonderful today?`, '; && which bash', '$PWD'],
  };

  const command = objectify(someCommand);
  console.log(`$ ${command}`);
  const stdout = await exec(command, opts);
  console.log(stdout);
})();
