import "./../styles/globals.css";

export const metadata = {
  title: "YamanPixel",
  description: "Cinematic visuals by Ömer Yaman",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}