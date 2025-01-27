import Input from "@/components/ui/Input";

export default async function DocsLayout({ children }) {
  return (
    <div className="md:flex flex-row gap-1 h-full">
      <aside className="md:w-[250px] h-full">
       
      </aside>
      <main className="w-full">{children}</main>
    </div>
  );
}
