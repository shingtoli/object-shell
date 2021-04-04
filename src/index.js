import ObjectEngine, { ArgWord } from './object-engine/ObjectEngine';

export const commandify = ObjectEngine;
export * from './object-engine/ObjectEngine';

const main = () => {
  // Test
  const definition = {
    echo: 'hello',
    node: ArgWord('--version'),
    yarn: {
      add: { '-D': ['@babel/core', 'jest'] },
    },
    npm: { config: ArgWord('list') },
  };

  const raw = ObjectEngine(definition);
  console.log(raw);
};
main();
