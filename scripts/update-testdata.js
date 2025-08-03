const fs = require('fs');
const path = require('path');

// Percorsi assoluti ai file coverage JSON
const inventarioPath = path.resolve(__dirname, '../microservizi/magazzino/inventario/coverage/coverage-summary.json');
const ordiniPath = path.resolve(__dirname, '../microservizi/magazzino/ordini/coverage/coverage-summary.json');

const report = {
  inventario: require(inventarioPath),
  ordini: require(ordiniPath)
};

const rows = Object.entries(report).map(([name, data]) => {
  const total = data.total.lines.total;
  const covered = data.total.lines.covered;
  const coverage = ((covered / total) * 100).toFixed(1) + '%';

  return `| ${name.charAt(0).toUpperCase() + name.slice(1)} | ${total} | ${covered} | ${total - covered} | ${coverage} |`;
});

const tableHeader = `
## 📊 Test Coverage & Status

| Microservizio | Tests Totali | Passati | Falliti | Coverage |
|---------------|--------------|---------|---------|----------|
`;

const codecovBadge = `\nBadge Codecov: [![codecov](https://codecov.io/gh/teamcodealchemists/PoC/branch/main/graph/badge.svg)](https://codecov.io/gh/teamcodealchemists/PoC)`;

const newContent = tableHeader + rows.join('\n') + codecovBadge;

const readmePath = path.resolve(__dirname, '../README.md');
const readme = fs.readFileSync(readmePath, 'utf8');

const updated = readme.replace(
  /## 📊 Test Coverage & Status[\s\S]*?(?=##|$)/,
  newContent + '\n\n'
);

fs.writeFileSync(readmePath, updated);
console.log('✅ README aggiornato!');
