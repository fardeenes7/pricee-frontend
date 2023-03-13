import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

const font = fetch(
  new URL("../../../assets/font/GTWalsheimPro.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler(req) {
  const fontData = await font;
  const { searchParams } = req.nextUrl;
  const title = searchParams.get("title");
  const image = searchParams.get("image");
  if (!title) {
    return new ImageResponse(<>Visit with &quot;?title=vercel&quot;</>, {
      width: 1200,
      height: 630,
    });
  }
  if (!image) {
    return new ImageResponse(<>Visit with &quot;?image=vercel&quot;</>, {
      width: 1200,
      height: 630,
    });
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          fontSize: 50,
          color: "black",
          background: "#ffffff",
          width: "100%",
          height: "100%",
          paddingTop: 50,
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          overflow: "hidden",
          fontFamily: '"GTWalsheim Pro"',
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
          tw="p-8 w-full overflow-clip"
        >
          <p tw="text-gray-500 mr-8">
            Product/<span tw="font-bold text-black">{title}</span>
          </p>
          <img
            width="256"
            height="256"
            src={image}
            tw="border-2 border-gray-800 rounded-3xl ml-4"
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{ display: "flex", justifyContent: "space-between" }}
            tw="mx-16"
          >
            <p tw="text-3xl font-bold text-black">Pricee</p>

            <p tw="text-3xl font-bold text-gray-700">pricee.com.bd</p>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ background: "#E86840" }} tw="h-6 w-4/5"></div>
            <div style={{ background: "#4CAF50" }} tw="h-6 w-1/5"></div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "GTWalsheim Pro",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}
