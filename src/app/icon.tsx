import { ImageResponse } from "next/og";

export const size = {
  width: 192,
  height: 192,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f0f23, #1a1a3e)",
          borderRadius: "32px",
        }}
      >
        <span
          style={{
            fontSize: "120px",
            fontWeight: 700,
            background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          H
        </span>
      </div>
    ),
    { ...size },
  );
}
