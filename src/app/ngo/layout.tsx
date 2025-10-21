import NgoGuard from "@/app/ngo/components/NgoGuard";

export default function NgoLayout({ children }: { children: React.ReactNode }) {
  return <NgoGuard>{children}</NgoGuard>;
}
