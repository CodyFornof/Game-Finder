const apiKey = process.env.API_KEY

export async function getNBAGames() {
  const response = await fetch('http://localhost:3000')
return response.json()
};

