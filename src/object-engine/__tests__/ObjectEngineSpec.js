import ObjectEngine, { Param } from '../ObjectEngine';

it('should convert tar definition to cli string', () => {
  const definition = {
    tar: {
      xf: [
        'source.tar',
        {
          '-C': 'somedir',
        },
      ],
    },
  };

  const raw = ObjectEngine(definition);

  expect(raw).toEqual('tar xf \'source.tar\' -C \'somedir\'');
});


it('should convert npm install definition to cli string', () => {
  const definition = {
    npm: {
      install: {
        '--dev': [ 'jest' , 'react-testing-library'],
      },
    },
  };

  const raw = ObjectEngine(definition);

  expect(raw).toEqual('npm install --dev \'jest\' \'react-testing-library\'');
});

it('should join top level commands with &&', () => {
  const definition = {
    yarn: {
      test: null,
    },
    git: {
      add: '.',
    },
  };

  const raw = ObjectEngine(definition);

  expect(raw).toEqual('yarn test && git add \'.\'');
});


it('should pipe commands to cli string', () => {
  const definition = {
    npm: {
      config: Param('list'),
    },
    grep: 'user-agent',
    tr: ['.', ','],
    __join: '|'
  };

  const raw = ObjectEngine(definition);

  expect(raw).toEqual('npm config list | grep \'user-agent\' | tr \'.\' \',\'');
});

it ('should string array with &&', () => {
  const definition = [
    { yarn: { add: { '-D': [ 'jest'] }}},
    { yarn: Param('test') },
    { yarn: Param('build') },
  ];

  const raw = ObjectEngine(definition);

  expect(raw).toEqual('yarn add -D \'jest\' && yarn test && yarn build');
});

it('should convert arbitrarily complex definition to string', () => {
  const definition = {
    main: [
      Param('--fit'),
      {
        swing: {
          start: '0',
          end: '50',
        },
        jump: ['-3', '-6', 'skip']
      },
      {
        '-o': './data'
      }
    ]
  };
  const raw = ObjectEngine(definition);

  expect(raw).toEqual('main --fit swing start \'0\' end \'50\' jump \'-3\' \'-6\' \'skip\' -o \'./data\'');
});