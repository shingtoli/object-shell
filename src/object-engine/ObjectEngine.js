import { objectTypeAnnotation } from "@babel/types";

const escapeQuotes = qstr => qstr.replace(/[\'|\"]/g, '\\$&');

const churn = (definition, isTop = false) => {
  const inputType = typeof definition;
  switch(inputType) {
    case 'object':
      if (definition instanceof Array) {
        const joinVal = isTop ? ' && ' : ' ';
        return definition.map(item => churn(item)).join(joinVal);
      }

      // Object
      const { __join, ...pureDef } = definition;
      const cmdlist = Object.entries(pureDef)
        .map(([key, child]) => {
          if (!child) {
            return key;
          }
          return [key, churn(child)].join(' ')
        });

      if(__join) {
        return cmdlist.join(` ${__join} `);
      }
      
      if (!isTop) {
        return cmdlist.join(' ');
      }
      return cmdlist.join(' && ');
    case 'string':
      // Wrap in template literal to sanitise input
      return `'${escapeQuotes(definition)}'`;
    default:
      return `'${definition.toString()}'`;
  }
}

export const Param = (parameter) => {
  const __obj = {};
  __obj[parameter] = null;
  return __obj;
};

export default (definition) => churn(definition, true);
