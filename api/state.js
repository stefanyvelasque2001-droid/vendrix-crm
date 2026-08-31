const { createClient } = require("@supabase/supabase-js");

const serviceClient = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE,
  { auth: { persistSession: false, autoRefreshToken: false } }
);

const publicClient = process.env.SUPABASE_ANON_KEY
  ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, { auth: { persistSession: false } })
  : null;

async function hasValidAccount(req) {
  if (!publicClient) return false;
  const authorization = String(req.headers.authorization || "");
  const token = authorization.startsWith("Bearer ") ? authorization.slice(7) : "";
  if (!token) return false;
  const { data, error } = await publicClient.auth.getUser(token);
  return Boolean(data?.user && !error);
}

module.exports = async function handler(req, res) {
  const accountEnabled = Boolean(process.env.SUPABASE_ANON_KEY);
  const allowedByAccount = accountEnabled && await hasValidAccount(req);
  const allowedByPin = !accountEnabled && (!process.env.APP_PIN || req.headers["x-vendrix-pin"] === process.env.APP_PIN);

  if (!allowedByAccount && !allowedByPin) {
    return res.status(401).json({ error: accountEnabled ? "Sesion no valida" : "PIN incorrecto" });
  }

  if (req.method === "GET") {
    const { data, error } = await serviceClient
      .from("vendrix_state")
      .select("data")
      .eq("id", "main")
      .single();

    if (error && error.code !== "PGRST116") return res.status(500).json({ error: error.message });
    return res.status(200).json(data?.data || {});
  }

  if (req.method === "POST") {
    const { error } = await serviceClient
      .from("vendrix_state")
      .upsert({
        id: "main",
        data: req.body || {},
        updated_at: new Date().toISOString()
      });

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: "Metodo no permitido" });
};

