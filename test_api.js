import axios from 'axios';

const baseUrl = 'http://localhost:3001/api';

const testEndpoints = async () => {
  const endpoints = [
    'status',
    'dns-server',
    'firewall',
    'tls',
    'robots-txt',
    'tech-stack',
    'headers',
    'ssl',
    'whois'
  ];

  console.log('Testing API endpoints...\n');

  for (const endpoint of endpoints) {
    try {
      const response = await axios.get(`${baseUrl}/${endpoint}?url=https://google.com`, {
        timeout: 10000 // 10 second timeout
      });
      console.log(`✓ ${endpoint}: ${response.status} - Success`);
    } catch (error) {
      console.log(`✗ ${endpoint}: ${error.response?.status || 'ERROR'} - ${error.message}`);
    }
  }
};

testEndpoints();