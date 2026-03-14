"use client";

import Link from "next/link";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import Section from "@/components/Section";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/class-names";

type HomeDocSectionProps = {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  className?: string;
};

export default function HomeDocSection({
  title,
  description,
  href,
  icon,
  className,
}: HomeDocSectionProps) {
  return (
    <Section className={cn("border-t border-gray-6 bg-gray-2", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex items-start gap-2">
          <span className="text-gray-11 shrink-0 mt-0.5" aria-hidden>
            {icon}
          </span>
          <div>
            <h2 className="h4 font-bold text-gray-12">{title}</h2>
            <p className="p text-gray-11 mt-0.5">{description}</p>
          </div>
        </div>
        <Button variant="pill" size="default" asChild className="shrink-0">
          <Link href={href} className="inline-flex items-center gap-1">
            View
            <ArrowRightIcon className="icon" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
