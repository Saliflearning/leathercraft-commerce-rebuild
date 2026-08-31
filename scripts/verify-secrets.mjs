import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve('.');
const files = execFileSync(
  'git',
  ['ls-files', '--cached', '--others', '--exclude-standard', '-z'],
  {
    cwd: root,
    encoding: 'utf8',
  },
)
  .split('\0')
  .filter(Boolean)
  .filter((file) => file !== 'scripts/verify-secrets.mjs');

const patterns = [
  ['private-key', /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/u],
  ['github-token', /gh[oprsu]_[A-Za-z0-9_]{30,}/u],
  ['aws-access-key', /AKIA[0-9A-Z]{16}/u],
  ['jwt', /eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/u],
  [
    'credential-assignment',
    /(?:password|passwd|secret|api[_-]?key)\s*[:=]\s*['"][^'"\r\n]{8,}['"]/iu,
  ],
];

const findings = [];
for (const file of files) {
  if (file === 'package-lock.json') continue;
  let content;
  try {
    content = await readFile(resolve(root, file), 'utf8');
  } catch {
    continue;
  }
  for (const [rule, pattern] of patterns) {
    if (pattern.test(content)) findings.push({ file, rule });
  }
}

if (findings.length) {
  console.error(JSON.stringify({ status: 'failed', findings }, null, 2));
  process.exitCode = 1;
} else {
  console.log(`Secret scan passed: ${files.length} tracked or pending public files checked.`);
}
