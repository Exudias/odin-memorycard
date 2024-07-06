export const handler = async () => {
  const value = Netlify.env.get("RIOT_API_KEY");

  return {
    statusCode: 200,
    body: JSON.stringify({ message: value }),
  };  
};