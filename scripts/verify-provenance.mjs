import { execFileSync } from 'node:child_process';
import { readdir, readFile, stat } from 'node:fs/promises';
import { extname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const restrictedExtensions = new Set([
  '.doc',
  '.docx',
  '.eot',
  '.gif',
  '.jpeg',
  '.jpg',
  '.pdf',
  '.png',
  '.ppt',
  '.pptx',
  '.sql',
  '.ttf',
  '.woff',
  '.woff2',
  '.xls',
  '.xlsx',
  '.zip',
]);

const textExtensions = new Set([
  '',
  '.css',
  '.d.ts',
  '.html',
  '.js',
  '.json',
  '.jsx',
  '.map',
  '.md',
  '.mjs',
  '.ps1',
  '.sh',
  '.svg',
  '.ts',
  '.tsx',
  '.txt',
  '.yaml',
  '.yml',
]);

const ignoredDirectories = new Set([
  '.git',
  '.agents',
  '.claude',
  '00_context',
  '02_assets',
  '03_exports',
  'coverage',
  'graphify-out',
  'node_modules',
  'playwright-report',
  'test-results',
]);

const contentRules = [
  {
    rule: 'private-path',
    pattern:
      /(?:^|[^A-Za-z])[A-Za-z]:[\\/](?:Users|Documents|Desktop|Downloads|OneDrive|04_Career|02_Projects)(?:[\\/]|$)/imu,
  },
  {
    rule: 'private-project-marker',
    pattern: new RegExp(['academic-portfolio', '-audit'].join(''), 'iu'),
  },
  {
    rule: 'original-brand-marker',
    pattern: new RegExp(['cc', 'pb'].join(''), 'iu'),
  },
  {
    rule: 'restricted-filename',
    pattern: new RegExp(
      [
        ['Final project ', 'cc', 'pb.zip'].join(''),
        ['Peer ', 'evaluation.docx'].join(''),
        ['grading ', 'rubric.docx'].join(''),
      ].join('|'),
      'iu',
    ),
  },
  {
    rule: 'unsupported-claim',
    pattern:
      /\bI (?:solely )?(?:built|created|owned) (?:the )?(?:entire|original|whole)\b|\bserved real customers\b|\bgenerated (?:real )?revenue\b/iu,
  },
];

async function walk(root, directory = root) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(root, path)));
    else if (entry.isFile()) files.push(path);
  }
  return files;
}

function gitFiles(root) {
  const output = execFileSync(
    'git',
    ['ls-files', '--cached', '--others', '--exclude-standard', '-z'],
    {
      cwd: root,
      encoding: 'utf8',
    },
  );
  return output
    .split('\0')
    .filter(Boolean)
    .map((path) => resolve(root, path));
}

export async function scanRepository(rootInput, options = {}) {
  const root = resolve(rootInput);
  const useGit = options.useGit ?? true;
  const files = useGit ? gitFiles(root) : await walk(root);
  const findings = [];

  for (const path of files) {
    const info = await stat(path);
    if (!info.isFile()) continue;
    const file = relative(root, path).replaceAll('\\', '/');
    const extension = extname(file).toLowerCase();

    if (restrictedExtensions.has(extension)) {
      findings.push({ file, rule: 'restricted-file-type', detail: extension });
      continue;
    }
    if (!textExtensions.has(extension) && !file.endsWith('.d.ts')) {
      findings.push({ file, rule: 'unexpected-file-type', detail: extension || 'no extension' });
      continue;
    }

    const content = await readFile(path, 'utf8');
    if (file === 'scripts/verify-provenance.mjs' || file === 'scripts/verify-provenance.test.mjs') {
      continue;
    }
    for (const { rule, pattern } of contentRules) {
      if (pattern.test(content))
        findings.push({ file, rule, detail: 'content matched release boundary' });
    }
  }

  return findings;
}

async function main() {
  const root = process.argv[2] ?? '.';
  const buildMode = process.argv.includes('--build');
  const findings = await scanRepository(root, { useGit: !buildMode });
  if (findings.length) {
    console.error(JSON.stringify({ status: 'failed', findings }, null, 2));
    process.exitCode = 1;
    return;
  }
  console.log(`Provenance scan passed: ${resolve(root)}`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  await main();
}
