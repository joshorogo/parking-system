import "bootstrap/dist/css/bootstrap.min.css";
import "@/assets/css/global.css";

export const metadata = {
  title: "Parking System",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="main-header d-flex justify-content-center">
          <label style={{ color: "white", fontSize: 20 }}>
            Welcome to OO Parking Lot
          </label>
        </header>
        {children}
      </body>
    </html>
  );
}
