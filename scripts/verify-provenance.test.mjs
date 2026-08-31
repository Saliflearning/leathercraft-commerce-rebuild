import assert from 'node:assert/strict';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { scanRepository } from './verify-provenance.mjs';

test('accepts a clean, text-only public artifact', async () => {
  const root = await mkdtemp(join(tmpdir(), 'provenance-safe-'));
  try {
    await writeFile(join(root, 'README.md'), 'Clean-room reconstruction with fictional data.\n');
    assert.deepEqual(await scanRepository(root, { useGit: false }), []);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test('rejects private paths, restricted binaries, and unsupported affirmative claims', async () => {
  const root = await mkdtemp(join(tmpdir(), 'provenance-unsafe-'));
  try {
    const privatePath = ['C:', 'Users', 'student', 'Documents'].join('\\');
    const unsupportedClaim = ['I built the ', 'entire original application.'].join('');
    await writeFile(join(root, 'claim.md'), `${unsupportedClaim} ${privatePath}\n`);
    await writeFile(join(root, `submission${'.docx'}`), 'not a public artifact');
    const findings = await scanRepository(root, { useGit: false });
    assert.ok(findings.some(({ rule }) => rule === 'private-path'));
    assert.ok(findings.some(({ rule }) => rule === 'restricted-file-type'));
    assert.ok(findings.some(({ rule }) => rule === 'unsupported-claim'));
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
