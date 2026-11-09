import { ImageResponse } from "next/og";

// /pwa-icon/192, /pwa-icon/512, /pwa-icon/maskable manzillarida ikonka beradi.
export async function GET(req: Request, { params }: { params: Promise<{ size: string }> }) {
  const { size } = await params;
  const origin = new URL(req.url).origin;
  const maskable = size === "maskable";
  const px = size === "192" ? 192 : 512;
  const inner = Math.round(px * (maskable ? 0.8 : 1));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#08287d",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${origin}/apple-icon.png`} width={inner} height={inner} alt="" />
      </div>
    ),
    { width: px, height: px }
  );
}
