// graphql-backend/updateSchema.js
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const schemaServiceUrl = 'http://localhost:3001'; // URL of schema-service
const schemaFilePath = path.join(__dirname, 'schema.graphql'); // Path to GraphQL schema file

async function fetchAndSaveSchema() {
  try {
    const response = await fetch(`${schemaServiceUrl}/schema`);
    const schema = await response.text();
    fs.writeFileSync(schemaFilePath, schema);
    // eslint-disable-next-line no-console
    console.log('GraphQL schema updated successfully.');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to update GraphQL schema:', error);
  }
}

fetchAndSaveSchema();
