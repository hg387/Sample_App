export default async function handler(req, res) {
  const { id } = req.query;

  const URL = `https://api.foursquare.com/v2/venues/${id}?client_id=${process.env.FOURSQUARE_CLIENT_ID}&client_secret=${process.env.FOURSQUARE_CLIENT_SECRET}&v=20210909`;

  const venuesSearch = await fetch(URL);

  const output = await venuesSearch.json();

  res.status(200).send(output);
}
