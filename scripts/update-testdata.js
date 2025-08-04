const fs = require('fs');
const path = require('path');

// Percorso assoluto al file README.md partendo dalla root del progetto
const readmePath = path.resolve(process.cwd(), 'README.md');

// Funzione per leggere i dati di coverage da un microservizio
function readCoverage(microservizio) {
  const coveragePath = path.resolve(
    process.cwd(),
    `microservizi/magazzino/${microservizio}/coverage/coverage-summary.json`
  );

  console.warn(`📂 File path: ${coveragePath}`);

  if (!fs.existsSync(coveragePath)) {
    console.warn(`⚠️  File coverage non trovato per "${microservizio}", verrà impostato a 0`);
    return {
      total: { lines: { total: 0, covered: 0 } }
    };
  }

  return JSON.parse(fs.readFileSync(coveragePath, 'utf8'));
}

// Microservizi da analizzare
const report = {
  inventario: readCoverage('inventario'),
  ordini: readCoverage('ordini'),
};

const rows = Object.entries(report).map(([name, data]) => {
  const total = data?.total?.lines?.total ?? 0;
  const covered = data?.total?.lines?.covered ?? 0;
  const failed = total - covered;
  const coverage = total > 0 ? ((covered / total) * 100).toFixed(1) + '%' : 'N/A';

  return `| ${name.charAt(0).toUpperCase() + name.slice(1)} | ${total} | ${covered} | ${failed} | ${coverage} |`;
});

// Intestazione della tabella + badge
const tableHeader = `
## 📊 Test Coverage & Status

| Microservizio | Tests Totali | Passati | Falliti | Coverage |
|---------------|--------------|---------|---------|----------|
`;

const codecovBadge = `\nBadge Codecov: [![codecov](https://codecov.io/gh/teamcodealchemists/PoC/branch/main/graph/badge.svg)](https://codecov.io/gh/teamcodealchemists/PoC)`;

const newContent = tableHeader + rows.join('\n') + codecovBadge;

// Verifica se README.md esiste
if (!fs.existsSync(readmePath)) {
  console.error(`❌ README.md non trovato in ${readmePath}`);
  process.exit(1);
}

// Aggiorna il contenuto della sezione coverage nel README
const readme = fs.readFileSync(readmePath, 'utf8');

const updated = readme.replace(
  /## 📊 Test Coverage & Status[\s\S]*?(?=##|$)/,
  newContent + '\n\n'
);

fs.writeFileSync(readmePath, updated);
console.log('✅ README aggiornato!');
