import { createClient } from "@supabase/supabase-js";
import formidable from "formidable";
import fs from "fs";

const supabaseURL = process.env.VITE_SUPABASE_URL;
const supabaseSeviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseURL!, supabaseSeviceRole!);

const allowedOrigins = [
  "http://localhost:5173",
  "https://idoit-official.vercel.app",
];

export default async function handler(req, res) {
  const origin = req.headers.origin;

  // CORS 헤더 설정 - 모든 요청에 대해 설정
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    // 개발 환경에서 localhost 포트 변경에 대응
    if (origin && origin.startsWith("http://localhost:")) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }
  }

  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS, GET");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With, Accept, Origin"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "86400"); // 24시간 캐시

  // Preflight 요청 처리
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // POST 요청만 허용
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = formidable({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Form parsing error:", err);
      return res.status(500).json({ error: "Form parsing failed" });
    }

    try {
      const { user_id, title, duration, category } = fields;
      const story = [
        fields["story[0]"],
        fields["story[1]"],
        fields["story[2]"],
      ];

      const uploadedUrls: string[] = [];

      // files.images가 존재하는지 확인
      if (!files.images) {
        return res.status(400).json({ error: "No images provided" });
      }

      const imageFiles = Array.isArray(files.images)
        ? files.images
        : [files.images];

      for (const file of imageFiles) {
        if (!file || !file.filepath) {
          continue; // 빈 파일 건너뛰기
        }

        const filePath = `${user_id}/${Date.now()}-${file.originalFilename}`;
        const buffer = fs.readFileSync(file.filepath);

        const { error } = await supabase.storage
          .from("challengeimage")
          .upload(filePath, buffer, { contentType: file.mimetype });

        if (error) {
          console.error("Supabase upload error:", error);
          return res.status(500).json({ error: error.message });
        }

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
        cover_image: uploadedUrls,
        story,
      });

      if (insertError) {
        console.error("Database insert error:", insertError);
        return res.status(500).json({ error: insertError.message });
      }

      return res.status(200).json({
        success: true,
        message: "Challenge uploaded successfully",
        urls: uploadedUrls,
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
}
