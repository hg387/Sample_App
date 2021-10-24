

export default async function handler (req, res) {
    var response = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
    var output = {data: response}
    res.status(200).send(output)
}