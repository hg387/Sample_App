export default async function handler(req, res) {
  const testForsquare = await fetch(
    `https://api.foursquare.com/v2/venues/trending?ll=39.95,-75.16&client_id=${process.env.FOURSQUARE_CLIENT_ID}&client_secret=${process.env.FOURSQUARE_CLIENT_SECRET}&v=20210909`
  );
  const output = await testForsquare.json();
  res.status(200).send(output);
}
