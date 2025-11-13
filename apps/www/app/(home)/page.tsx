import Link from "next/link";

import { Button } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <main>
      <h1>Welcome to my imagination</h1>
      <h3>Just another design system with my own taste.</h3>
      <Link href="/docs">
        <Button as="span">Get Started</Button>
      </Link>
    </main>
  );
}
