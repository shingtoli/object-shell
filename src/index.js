import ObjectEngine, { Param } from './object-engine/ObjectEngine';

export const commandify = ObjectEngine;
export * from './object-engine/ObjectEngine';

const main = () => {
  // Test
  const definition = {
    echo: 'hello',
    node: Param('--version'),
    yarn: {
      add: { '-D': ['@babel/core', 'jest'] },
    },
    npm: { config: Param('list') },
  };

  const raw = ObjectEngine(definition);
  console.log(raw);
};
main();
