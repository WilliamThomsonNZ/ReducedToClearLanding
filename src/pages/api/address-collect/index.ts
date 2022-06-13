import nc from "next-connect";
import type { NextApiRequest, NextApiResponse } from "next";
const cors = require("cors");
const { google } = require("googleapis");
const corsOptions = {
  methods: ["POST", "HEAD"],
  origin: "http://localhost:3000/*",
};
const handler = nc()
  .use(cors(corsOptions))
  .get((req: NextApiRequest, res: NextApiResponse) => {
    res.json("api running");
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    console.log(req.body);
    const { address, orderId } = req.body;
    const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = "1ro1dSd8wYsdKSAnj_rW348B5aTcHUg6D5NWZk6opfq0";

    try {
      await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: "Sheet1!A:B",
        valueInputOption: "USER_ENTERED",
        resource: {
          values: [[address, orderId]],
        },
      });
      res.json({ code: 200, message: "User address added" });
    } catch (error) {
      res.json({
        code: 400,
        message: "An issue occured when adding user address",
        error,
      });
    }
  });

export default handler;
