export default async function handler(req, res) {
  const response = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
  const output = { data: response };
  res.status(200).send(output);
}
