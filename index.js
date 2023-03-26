const axios = require('axios');
const core = require('@actions/core');

async function run() {
  try {
    const apiUrl = core.getInput('api-url');
    const apiKey = core.getInput('api-key');
    const data = JSON.parse(core.getInput('data'));

    const response = await axios.post(apiUrl, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    if (response.status === 200) {
      console.log('Data sent successfully');
    } else {
      core.setFailed(`Failed to send data: ${response.statusText}`);
    }
  } catch (error) {
    core.setFailed(`Error sending data: ${error.message}`);
  }
}

run();
