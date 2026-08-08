import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const WECHAT_APPID = Deno.env.get("WECHAT_APPID")!;
const WECHAT_SECRET = Deno.env.get("WECHAT_SECRET")!;

serve(async (req: Request) => {
  const { code } = await req.json();
  if (!code) return new Response(JSON.stringify({ error: "no code" }), { status: 400 });

  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${WECHAT_APPID}&secret=${WECHAT_SECRET}&js_code=${code}&grant_type=authorization_code`;
  const resp = await fetch(url);
  const data = await resp.json();

  if (data.errcode) {
    return new Response(JSON.stringify({ error: data.errmsg }), { status: 400 });
  }

  return new Response(JSON.stringify({ openid: data.openid }), {
    headers: { "Content-Type": "application/json" }
  });
});