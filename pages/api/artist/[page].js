const artist = require("./data.json");

export default function handler(req, res) {
  if (req.method === "GET") {
    const { page } = req.query;
    let noofitems = 10;

    //pagination
    const trimstart = (page - 1) * noofitems;
    const trimend = trimstart + noofitems;

    const trimedData = artist.slice(trimstart, trimend);
    const pages = Math.ceil(artist.length / noofitems);

    res.status(200).json({
      pages: pages,
      queryset: trimedData,
    });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({
      message: `Request ${method} is not allowed`,
    });
  }
}
