import Link from "next/link";
import Section from "@/components/Section";
import { GithubIcon } from "@/components/icon";

export default function Footer() {
  return (
    <footer className="border-t border-gray-6 bg-gray-1">
      <Section className="py-3.5 md:py-5">
        <div className="grid md:grid-cols-4 gap-2.5 mb-3.5">
          <div className="md:col-span-2 space-y-1">
            <p className="text-gray-11 max-w-xs text-sm leading-relaxed">
              Beautiful components, full control. The design system that
              installs as source code.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-12 text-sm">Project</h4>
            <ul className="space-y-1 text-sm text-gray-11">
              <li>
                <Link
                  href="/docs"
                  className="hover:text-gray-12 transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/components"
                  className="hover:text-gray-12 transition-colors"
                >
                  Components
                </Link>
              </li>
              <li>
                <Link
                  href="/docs/theming"
                  className="hover:text-gray-12 transition-colors"
                >
                  Theming
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-12 text-sm">Community</h4>
            <ul className="space-y-3 text-sm text-gray-11">
              <li>
                <Link
                  href="https://github.com/garitma/aura-design-system"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-12 transition-colors"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="https://twitter.com/garitma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-12 transition-colors"
                >
                  Twitter
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-2.5 border-t border-gray-6 flex flex-col md:flex-row justify-between items-center gap-1 text-sm text-gray-11">
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
              <GithubIcon />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>
      </Section>
    </footer>
  );
}
