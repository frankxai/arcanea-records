import test from 'node:test';
import assert from 'node:assert/strict';
import { formatPrompt, parsePrompt } from '../../../lib/apl/format.ts';

test('formatPrompt formats basic APL correctly', () => {
  const apl = {
    spark: 'A glowing cat',
    prompt: 'Draw a cat.'
  };
  const result = formatPrompt(apl);
  assert.equal(result, 'SPARK: A glowing cat\n\nDraw a cat.');
});

test('formatPrompt formats full APL correctly', () => {
  const apl = {
    spark: 'A glowing cat',
    shape: {
      palette: 'neon',
      secondaryPalette: 'dark',
      description: 'high contrast'
    },
    sharpen: ['dog', 'mouse'],
    prompt: 'Draw a cat.'
  };
  const result = formatPrompt(apl);
  assert.match(result, /SPARK: A glowing cat/);
  assert.match(result, /SHAPE: NEON \+ DARK — high contrast/);
  assert.match(result, /SHARPEN: NOT dog\. NOT mouse\./);
  assert.match(result, /Draw a cat\./);
});

test('parsePrompt parses basic APL correctly', () => {
  const text = 'SPARK: A glowing cat\n\nDraw a cat.';
  const result = parsePrompt(text);
  assert.equal(result.spark, 'A glowing cat');
  assert.equal(result.prompt, 'Draw a cat.');
});

test('parsePrompt parses full APL correctly', () => {
  const text = 'SPARK: A glowing cat\nSHAPE: neon — high contrast\nSHARPEN: NOT dog. NOT mouse.\n\nDraw a cat.';
  const result = parsePrompt(text);
  assert.equal(result.spark, 'A glowing cat');
  assert.equal(result.shape.palette, 'neon');
  assert.equal(result.shape.description, 'high contrast');
  assert.deepEqual(result.sharpen, ['dog', 'mouse']);
  assert.equal(result.prompt, 'Draw a cat.');
});
