const artist = require("./data.json");

export default function handler(req, res) {
  if (req.method === "GET") {
    const { page } = req.query;
    let noofitems = 10;

    const sorted = artist.sort((a, b) => {
      let aNum = Number(a.art.from);
      let bNum = Number(b.art.from);
      if (isNaN(aNum)) {
        return 1;
      } else if (isNaN(bNum)) {
        return -1;
      }
      return aNum - bNum;
    });

    //pagination
    const trimstart = (page - 1) * noofitems;
    const trimend = trimstart + noofitems;

    const trimedData = sorted.slice(trimstart, trimend);
    const pages = Math.ceil(sorted.length / noofitems);

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
