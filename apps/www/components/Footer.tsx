import Link from "next/link";
import Section from "@/components/Section";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function Footer() {
  return (
    <footer className="border-t border-gray-6 bg-gray-1">
      <Section className="p-1">
        <div className="flex flex-col md:flex-row justify-between items-center gap-1 text-sm text-gray-11">
          <p>
            © {new Date().getFullYear()} Aura Design System. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/garitma/aura-design-system"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-12 transition-colors"
            >
              <GitHubLogoIcon />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>
      </Section>
    </footer>
  );
}
