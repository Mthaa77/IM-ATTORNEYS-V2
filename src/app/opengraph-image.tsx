import { ImageResponse } from "next/og";

export const alt =
  "IM Attorneys Inc — Strategic legal counsel in Menlyn Maine, Pretoria";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "#0b1725",
          color: "#f8f4e8",
          display: "flex",
          fontFamily: "Georgia, serif",
          height: "100%",
          padding: "48px",
          position: "relative",
          width: "100%",
        }}
      >
        <div
          style={{
            background:
              "radial-gradient(circle at 76% 20%, rgba(198, 168, 75, 0.22), transparent 34%)",
            display: "flex",
            inset: 0,
            position: "absolute",
          }}
        />
        <div
          style={{
            border: "1px solid rgba(198, 168, 75, 0.5)",
            borderRadius: "34px",
            boxShadow: "0 28px 80px rgba(0, 0, 0, 0.32)",
            display: "flex",
            flex: 1,
            overflow: "hidden",
            padding: "50px 58px",
            position: "relative",
          }}
        >
          <div
            style={{
              background: "#c6a84b",
              display: "flex",
              height: "5px",
              left: "58px",
              position: "absolute",
              top: 0,
              width: "116px",
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div style={{ alignItems: "center", display: "flex" }}>
                <div
                  style={{
                    alignItems: "center",
                    border: "2px solid #c6a84b",
                    borderRadius: "50%",
                    color: "#c6a84b",
                    display: "flex",
                    fontSize: "30px",
                    height: "76px",
                    justifyContent: "center",
                    letterSpacing: "-2px",
                    marginRight: "22px",
                    width: "76px",
                  }}
                >
                  IM
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      fontSize: "29px",
                      fontWeight: 700,
                      letterSpacing: "0.5px",
                    }}
                  >
                    IM ATTORNEYS INC
                  </div>
                  <div
                    style={{
                      color: "#c6a84b",
                      fontFamily: "Arial, sans-serif",
                      fontSize: "15px",
                      letterSpacing: "3px",
                      marginTop: "8px",
                    }}
                  >
                    MENLYN MAINE · PRETORIA
                  </div>
                </div>
              </div>

              <div
                style={{
                  border: "1px solid rgba(248, 244, 232, 0.18)",
                  borderRadius: "999px",
                  color: "#ddd4bb",
                  display: "flex",
                  fontFamily: "Arial, sans-serif",
                  fontSize: "15px",
                  letterSpacing: "1px",
                  padding: "12px 20px",
                }}
              >
                FEMALE-LED BOUTIQUE LAW FIRM
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", width: "88%" }}>
              <div
                style={{
                  color: "#c6a84b",
                  fontFamily: "Arial, sans-serif",
                  fontSize: "17px",
                  letterSpacing: "4px",
                  marginBottom: "18px",
                }}
              >
                STRATEGIC COUNSEL · HUMAN-CENTRED REPRESENTATION
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  fontSize: "60px",
                  fontWeight: 700,
                  letterSpacing: "-2px",
                  lineHeight: 1.05,
                }}
              >
                <div style={{ display: "flex" }}>Defending your rights.</div>
                <div style={{ display: "flex" }}>Championing your future.</div>
              </div>
            </div>

            <div
              style={{
                alignItems: "center",
                borderTop: "1px solid rgba(248, 244, 232, 0.14)",
                color: "#ddd4bb",
                display: "flex",
                fontFamily: "Arial, sans-serif",
                fontSize: "17px",
                justifyContent: "space-between",
                paddingTop: "22px",
              }}
            >
              <div style={{ display: "flex" }}>
                Family · Criminal · Commercial · Estates
              </div>
              <div
                style={{
                  color: "#f8f4e8",
                  display: "flex",
                  fontWeight: 700,
                  letterSpacing: "1px",
                }}
              >
                iminc.co.za
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
