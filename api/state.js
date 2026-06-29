const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE
);

module.exports = async function handler(req, res) {
  const pin = req.headers["x-vendrix-pin"];

  if (process.env.APP_PIN && pin !== process.env.APP_PIN) {
    return res.status(401).json({ error: "PIN incorrecto" });
  }

  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("vendrix_state")
      .select("data")
      .eq("id", "main")
      .single();

    if (error) return res.status(500).json({ error: error.message });

    return res.status(200).json(data?.data || {});
  }

  if (req.method === "POST") {
    const payload = req.body || {};

    const { error } = await supabase
      .from("vendrix_state")
      .upsert({
        id: "main",
        data: payload,
        updated_at: new Date().toISOString()
      });

    if (error) return res.status(500).json({ error: error.message });

    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: "Metodo no permitido" });
};
