import AuthGuard from "../components/AuthGuard";

export default function SinflarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}
