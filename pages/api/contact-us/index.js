import { API_URL } from "../../../utils/data";

const myHeaders = new Headers({
  "Content-Type": "application/json",
  Authorization: "your-token",
});
const contactus = async (req, res) => {
  // requestMethod = req.
  if (req.method === "POST") {
    const body = req.body;

    try {
      const apiRes = await fetch(`${API_URL}/dashboard/contact-us/`, {
        method: "POST",
        headers: new Headers({
          Accept: "application/json",
          "content-type": "application/json",
        }),
        body: body,
      });

      const data = await apiRes.json();
      if (apiRes.status === 201) {
        return res.status(201).json({ data: data.data });
      } else {
        return res.status(apiRes.status).json({ error: data.error });
      }
    } catch {
      return res.status(500).json({ error: "something went wrong " });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
};
export default contactus;
