// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const artist = require("./data.json");

export default function handler(req, res) {
  // console.log(artist);
  if (req.method === "GET") {
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
    res.status(200).json(sorted);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({
      message: `Request ${method} is not allowed`,
    });
  }
}
