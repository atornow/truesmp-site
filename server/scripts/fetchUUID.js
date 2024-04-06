const fetch = require('node-fetch');

async function fetchUUID(playername) {
  try {
    const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${playername}`);
    const data = await response.json();
    return data.id;
  } catch (error) {
    console.error('Error fetching UUID:', error);
    return null;
  }
}

module.exports = { fetchUUID };