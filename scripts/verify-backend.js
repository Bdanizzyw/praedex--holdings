#!/usr/bin/env node
// Backend health check script
// Run with: node scripts/verify-backend.js

const http = require('http');

const BASE_URL = 'http://localhost:5000';
const endpoints = [
  {
    path: '/api/health',
    method: 'GET',
    name: 'Health Check Endpoint',
  },
  {
    path: '/api/properties',
    method: 'GET',
    name: 'Get All Properties',
  },
  {
    path: '/api/properties/prop-1',
    method: 'GET',
    name: 'Get Property by ID (prop-1)',
  },
];

async function checkEndpoint(url) {
  return new Promise((resolve) => {
    const req = http.get(url, { timeout: 3000 }, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          success: res.statusCode >= 200 && res.statusCode < 300,
          body: data.substring(0, 200), // first 200 chars
        });
      });
    });

    req.on('error', (err) => {
      resolve({
        statusCode: null,
        success: false,
        error: err.message,
      });
    });
  });
}

async function main() {
  console.log(`\n🔍 Verifying backend server at ${BASE_URL}\n`);

  let allPassed = true;

  for (const endpoint of endpoints) {
    const url = BASE_URL + endpoint.path;
    console.log(`Testing: ${endpoint.name}`);
    console.log(`  URL: ${url}`);

    const result = await checkEndpoint(url);

    if (result.success) {
      console.log(`  ✅ Status: ${result.statusCode} OK`);
      if (result.body) {
        console.log(`  Response preview: ${result.body}...`);
      }
    } else {
      console.log(`  ❌ FAILED`);
      if (result.error) {
        console.log(`  Error: ${result.error}`);
      } else {
        console.log(`  Status: ${result.statusCode}`);
      }
      allPassed = false;
    }
    console.log();
  }

  if (allPassed) {
    console.log('✅ All backend endpoints verified successfully!');
    process.exit(0);
  } else {
    console.log('❌ Some endpoints failed. Make sure the backend is running:');
    console.log('   npm run dev:backend');
    process.exit(1);
  }
}

main();
