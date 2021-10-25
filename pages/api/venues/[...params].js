export default async function handler(req, res) {
  const { params } = req.query;
  const [lat, lng, search] = params;

  let URL = `https://api.foursquare.com/v2/venues/search?ll=${lat},${lng}&query=${search}&client_id=${process.env.FOURSQUARE_CLIENT_ID}&client_secret=${process.env.FOURSQUARE_CLIENT_SECRET}&v=20210909`;

  if (!search) {
    URL = `https://api.foursquare.com/v2/venues/search?ll=${lat},${lng}&client_id=${process.env.FOURSQUARE_CLIENT_ID}&client_secret=${process.env.FOURSQUARE_CLIENT_SECRET}&v=20210909`;
  }

  const venuesSearch = await fetch(URL);

  const output = await venuesSearch.json();

  res.status(200).send(output);
}
