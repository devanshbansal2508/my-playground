let profile = {};

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(profile);
  } else if (req.method === "POST") {
    profile = req.body;
    res.status(200).json({ status: "Profile saved successfully!" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
