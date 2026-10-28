import "./globals.css";

export const metadata = {
  title: "Minhas cartas favoritas",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <footer className="rodape">
          <p>Thiago Dias Gomes  - RM 569675</p>
          <p>Matheus Nogueira Quintas - RM 572542</p>
          <p>João Arthur Maia - RM 573458</p>
        </footer>
      </body>
    </html>
  );
}
