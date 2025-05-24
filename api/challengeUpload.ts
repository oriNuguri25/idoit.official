import { createClient } from "@supabase/supabase-js";
import formidable from "formidable";
import fs from "fs";

const supabaseURL = process.env.VITE_SUPABASE_URL;
const supabaseSeviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseURL!, supabaseSeviceRole!);

export const config = {
  api: {
    bodyParser: false,
  },
};

const allowedOrigins = [
  "http://localhost:5173",
  "https://idoit-official.vercel.app",
];

export default async function handler(req, res) {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const form = formidable({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: "Form parsing failed" });

    const { user_id, title, duration, category } = fields;
    const story = [fields["story[0]"], fields["story[1]"], fields["story[2]"]];

    const uploadedUrls: string[] = [];
    const imageFiles = Array.isArray(files.images)
      ? files.images
      : [files.images];

    for (const file of imageFiles) {
      const filePath = `${user_id}/${Date.now()}-${file.originalFilename}`;
      const buffer = fs.readFileSync(file.filepath);

      const { error } = await supabase.storage
        .from("challengeimages")
        .upload(filePath, buffer, { contentType: file.mimetype });

      if (error) return res.status(500).json({ error });

      const { data } = supabase.storage
        .from("challengeimage")
        .getPublicUrl(filePath);
      uploadedUrls.push(data.publicUrl);
    }

    const { error: insertError } = await supabase.from("challenges").insert({
      user_id,
      title,
      duration,
      category,
      cover_images: uploadedUrls,
      story,
    });

    if (insertError) return res.status(500).json({ error: insertError });

    return res.status(200).json({ success: true });
  });
}
