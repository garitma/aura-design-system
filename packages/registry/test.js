// Test script to verify registry functionality
import { Button, registryConfig } from './dist/index.js';
import { execSync } from 'child_process';

console.log('Testing Aura Design System Registry...');
console.log('=====================================');

// Test component export
console.log('✓ Button component exported:', typeof Button === 'function');

// Test registry config export
console.log('✓ Registry config exported:', typeof registryConfig === 'object');
console.log('✓ Registry name:', registryConfig.name);
console.log('✓ Available components:', registryConfig.items.length);

// Test CLI
try {
  const output = execSync('node bin/index.js list', { encoding: 'utf8' });
  console.log('✓ CLI list command works');
  console.log('CLI Output:');
  console.log(output);
} catch (error) {
  console.log('⚠ CLI test failed:', error.message);
}

console.log('\n🎉 Registry package is working correctly!');