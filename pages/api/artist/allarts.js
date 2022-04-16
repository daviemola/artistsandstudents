// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const artist = require("./data.json");

export default function handler(req, res) {
  // console.log(artist);
  if (req.method === "GET") {
    res.status(200).json(artist);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({
      message: `Request ${method} is not allowed`,
    });
  }
}
