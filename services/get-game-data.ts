const apiKey = process.env.API_KEY

export async function getGameData() {
  const response = await fetch('http://localhost:3000/bootstrap')
return response.json()
};

