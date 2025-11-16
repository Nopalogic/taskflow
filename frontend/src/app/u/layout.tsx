import Wrapper from "@/components/sidebar/wrapper";

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Wrapper>{children}</Wrapper>;
}
