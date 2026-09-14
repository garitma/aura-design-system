"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import {
  AccessibilityIcon,
  BookmarkIcon,
  BoxIcon,
  Component1Icon,
  CrumpledPaperIcon,
  DownloadIcon,
  FontFamilyIcon,
  FrameIcon,
  GitHubLogoIcon,
  HeartIcon,
  ImageIcon,
  InfoCircledIcon,
  LightningBoltIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  PersonIcon,
  PlusIcon,
  ScissorsIcon,
  Share2Icon,
  StarIcon,
  SunIcon,
  TextIcon,
  TokensIcon,
} from "@radix-ui/react-icons";

import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@/components/ui/Alert";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/HoverCard";
import { Input } from "@/components/ui/Input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/InputGroup";
import { Label } from "@/components/ui/Label";
import { Separator } from "@/components/ui/Separator";
import { Switch } from "@/components/ui/Switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import {
  toColorInputValue,
  useAuraThemeColors,
  type ThemeColors,
} from "@/hooks/use-aura-theme-colors";
import { cn } from "@/utils/class-names";

const USAGE_RANGES = [
  { label: "Backgrounds", start: 1, end: 2 },
  { label: "Interactive components", start: 3, end: 5 },
  { label: "Borders and separators", start: 6, end: 8 },
  { label: "Solid colors", start: 9, end: 10 },
  { label: "Accessible text", start: 11, end: 12 },
] as const;

const PEOPLE = [
  "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?w=128&h=128&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=128&h=128&fit=crop",
];

type ToDoItem = { id: string; completed: boolean };

const TODO_COPY: Record<string, ReactNode> = {
  a: (
    <>
      Respond to comment{" "}
      <a
        href="#comment-384"
        className="text-accent-11 underline underline-offset-2 hover:text-accent-12"
        onClick={(event) => event.preventDefault()}
      >
        #384
      </a>{" "}
      from Travis
    </>
  ),
  b: (
    <>
      Invite{" "}
      <a
        href="#acme"
        className="text-accent-11 underline underline-offset-2 hover:text-accent-12"
        onClick={(event) => event.preventDefault()}
      >
        Acme Co.
      </a>{" "}
      team to Slack
    </>
  ),
  c: (
    <>
      Create a report{" "}
      <a
        href="#report"
        className="text-accent-11 underline underline-offset-2 hover:text-accent-12"
        onClick={(event) => event.preventDefault()}
      >
        requested
      </a>{" "}
      by Danilo
    </>
  ),
  d: "Close Q2 finances",
  e: (
    <>
      Review invoice{" "}
      <a
        href="#invoice-3456"
        className="text-accent-11 underline underline-offset-2 hover:text-accent-12"
        onClick={(event) => event.preventDefault()}
      >
        #3456
      </a>
    </>
  ),
};

function ColorField({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [draft, setDraft] = useState(value);

  useEffect(() => {
    setDraft(value);
  }, [value]);

  return (
    <div className="flex w-full min-w-0 flex-col gap-1">
      <Label htmlFor={id} className="text-xs font-medium text-gray-11">
        {label}
      </Label>
      <div className="relative flex h-4 items-center">
        <Input
          id={id}
          type="text"
          value={draft}
          onChange={(event) => {
            setDraft(event.target.value);
            onChange(event.target.value);
          }}
          className="h-4 w-full rounded-md border border-gray-6 bg-gray-1 px-1 pr-3.5 font-mono text-sm text-gray-12"
          placeholder="#964CE1"
          spellCheck={false}
        />
        <Input
          type="color"
          aria-label={`${label} picker`}
          value={toColorInputValue(value)}
          onChange={(event) => {
            setDraft(event.target.value);
            onChange(event.target.value);
          }}
          className="absolute right-0.5 top-1/2 size-2 -translate-y-1/2 cursor-pointer rounded border border-gray-6 bg-transparent p-0"
        />
      </div>
    </div>
  );
}

function ColorUsageRange({ label }: { label: string }) {
  return (
    <div className="mb-1 hidden flex-col sm:flex">
      <p className="mb-1 text-center text-xs text-gray-11">{label}</p>
      <div
        className="h-px w-full"
        style={{
          backgroundImage:
            "linear-gradient(to right, transparent, var(--gray-a8) 30%, var(--gray-a8) 70%, transparent)",
        }}
      />
    </div>
  );
}

function ColorSwatch({
  scale,
  step,
}: {
  scale: "accent" | "gray";
  step: number;
}) {
  const varName = `--${scale}-${step}`;

  return (
    <button
      type="button"
      title={`${scale} ${step} (${varName})`}
      className={cn(
        "relative aspect-[4/3] w-full outline-none transition-transform",
        "hover:z-10 hover:scale-[1.04] focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-accent-8",
        "border border-gray-a4 first:rounded-l-md last:rounded-r-md"
      )}
      style={{ backgroundColor: `var(${varName})` }}
      onClick={async () => {
        try {
          const computed = getComputedStyle(document.documentElement)
            .getPropertyValue(varName)
            .trim();
          await navigator.clipboard.writeText(computed || varName);
        } catch {
          // clipboard may be unavailable
        }
      }}
    >
      <span className="sr-only">
        {scale} {step}
      </span>
    </button>
  );
}

function ScaleRow({ scale }: { scale: "accent" | "gray" }) {
  return (
    <div className="grid grid-cols-6 overflow-hidden rounded-md sm:grid-cols-12">
      {Array.from({ length: 12 }, (_, index) => (
        <ColorSwatch
          key={`${scale}-${index + 1}`}
          scale={scale}
          step={index + 1}
        />
      ))}
    </div>
  );
}

function LinksExample({ muted = false }: { muted?: boolean }) {
  return (
    <blockquote
      className={cn(
        "border-l-2 border-accent-9 pl-1.5 font-sans text-sm font-normal normal-case leading-relaxed",
        muted ? "text-gray-11" : "text-gray-12"
      )}
    >
      Susan Kare is an American{" "}
      <HoverCard>
        <HoverCardTrigger asChild>
          <a
            href="https://en.wikipedia.org/wiki/Graphic_design"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 hover:text-accent-11"
          >
            graphic designer
          </a>
        </HoverCardTrigger>
        <HoverCardContent className="w-auto max-w-[280px] p-1">
          <div className="flex gap-1">
            <img
              src="https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&h=480&auto=format&fit=crop"
              alt="Graphic design"
              className="size-10 shrink-0 rounded-sm bg-gray-5 object-cover"
            />
            <p className="text-sm text-gray-12">
              <strong>Graphic design</strong> is a profession and applied art
              whose activity consists in projecting visual communications.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>{" "}
      and artist, who contributed{" "}
      <HoverCard>
        <HoverCardTrigger asChild>
          <a
            href="https://en.wikipedia.org/wiki/User_interface"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-2 hover:text-accent-11"
          >
            interface
          </a>
        </HoverCardTrigger>
        <HoverCardContent className="w-auto max-w-[280px] p-1">
          <div className="flex gap-1">
            <img
              src="https://images.unsplash.com/photo-1602576666092-bf6447a729fc?q=80&h=480&auto=format&fit=crop"
              alt="User interface"
              className="size-10 shrink-0 rounded-sm bg-gray-5 object-cover"
            />
            <p className="text-sm text-gray-12">
              A <strong>user interface</strong> is the space where interactions
              between humans and machines occur.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>{" "}
      elements and typefaces for the first Apple Macintosh.
    </blockquote>
  );
}

function ToDoList({
  items,
  onItemsChange,
}: {
  items: ToDoItem[];
  onItemsChange: (items: ToDoItem[]) => void;
}) {
  return (
    <ul className="flex flex-col gap-1">
      {items.map((item) => (
        <li key={item.id} className="flex items-start gap-1">
          <Checkbox
            id={`todo-${item.id}`}
            checked={item.completed}
            onCheckedChange={(checked) => {
              onItemsChange(
                items.map((candidate) =>
                  candidate.id === item.id
                    ? { ...candidate, completed: !!checked }
                    : candidate
                )
              );
            }}
            className="mt-0.5"
          />
          <label
            htmlFor={`todo-${item.id}`}
            className={cn(
              "cursor-pointer text-sm leading-snug",
              item.completed ? "text-gray-11 line-through" : "text-gray-12"
            )}
          >
            {TODO_COPY[item.id]}
          </label>
        </li>
      ))}
    </ul>
  );
}

function ComponentsShowcase() {
  const [todos, setTodos] = useState<ToDoItem[]>([
    { id: "a", completed: false },
    { id: "b", completed: false },
    { id: "c", completed: false },
    { id: "d", completed: true },
    { id: "e", completed: true },
  ]);

  const toolbarItems = [
    [PlusIcon, "Add element"],
    [FrameIcon, "Frame"],
    [BoxIcon, "Rectangle"],
    [Component1Icon, "Components"],
    [TokensIcon, "Tokens"],
    [TextIcon, "Text"],
    [FontFamilyIcon, "Typography"],
    [LightningBoltIcon, "Fill with AI"],
    [ScissorsIcon, "Scissors"],
    [CrumpledPaperIcon, "Archive"],
  ] as const;

  return (
    <div className="grid w-full grid-cols-1 items-start gap-2 lg:grid-cols-3 lg:gap-2.5">
      {/* Left */}
      <div className="flex min-w-0 flex-col gap-1.5">
        <div className="flex min-w-0 items-center gap-1">
          <InputGroup className="min-w-0 flex-1">
            <InputGroupAddon>
              <MagnifyingGlassIcon className="icon" />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search" name="showcase-search" />
          </InputGroup>
          <Button type="button" className="shrink-0">
            Submit
          </Button>
        </div>

        <Alert variant="info">
          <AlertIcon>
            <InfoCircledIcon className="icon" />
          </AlertIcon>
          <AlertContent>
            <AlertTitle>Update available</AlertTitle>
            <AlertDescription>
              Please upgrade to the new version.
            </AlertDescription>
          </AlertContent>
        </Alert>

        <div className="overflow-hidden rounded-md border border-gray-6 bg-gray-1">
          {[
            { icon: BoxIcon, label: "Box", indent: false },
            { icon: TokensIcon, label: "Grid", indent: false },
            { icon: ImageIcon, label: "Image", indent: true },
            { icon: ImageIcon, label: "Image", indent: true },
            { icon: TextIcon, label: "Text", indent: true },
          ].map((layer, index) => (
            <div
              key={`${layer.label}-${index}`}
              className={cn(
                "flex items-center gap-1 border-b border-gray-6 px-1 py-0.5 last:border-b-0 hover:bg-gray-3",
                layer.indent && "pl-3"
              )}
            >
              <layer.icon className="icon text-gray-11" />
              <span className="text-sm text-gray-12">{layer.label}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-1">
          <Badge variant="secondary">Fully-featured</Badge>
          <Badge variant="outline">Built with Aura</Badge>
          <Badge>Open source</Badge>
        </div>

        <div className="flex flex-wrap items-center gap-1">
          <Button type="button" size="icon" variant="fill" aria-label="Star">
            <StarIcon className="icon" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="fill"
            aria-label="Bookmark"
          >
            <BookmarkIcon className="icon" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="pill"
            aria-label="Accessibility"
          >
            <AccessibilityIcon className="icon" />
          </Button>
          <Button type="button" size="icon" variant="pill" aria-label="Heart">
            <HeartIcon className="icon" />
          </Button>
          <Button type="button" size="icon" variant="pill" aria-label="Share">
            <Share2Icon className="icon" />
          </Button>
          <Switch aria-label="Notifications off" />
          <Switch defaultChecked aria-label="Notifications on" />
        </div>

        <div className="flex flex-col gap-1">
          {[false, true].map((surface) => (
            <a
              key={String(surface)}
              href="#profile"
              onClick={(event) => event.preventDefault()}
              className={cn(
                "flex items-center gap-1 rounded-md border p-1 transition-colors hover:bg-gray-3",
                surface
                  ? "border-gray-6 bg-accent-surface"
                  : "border-gray-6 bg-gray-1"
              )}
            >
              <Avatar className="size-3 shrink-0">
                <AvatarImage src={PEOPLE[0]} alt="Emily Adams" />
                <AvatarFallback>EA</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-gray-12">
                  Emily Adams
                </p>
                <p className="truncate text-xs text-gray-11">
                  emily.adams@example.com
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Center */}
      <div className="flex min-w-0 flex-col gap-1.5">
        <div className="hidden min-w-0 items-center gap-1 md:flex">
          <div className="flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto rounded-md border border-gray-6 bg-gray-1 p-0.5">
            {toolbarItems.map(([Icon, label], index) => (
              <div key={label} className="flex shrink-0 items-center">
                {(index === 1 || index === 5 || index === 8) && (
                  <Separator
                    orientation="vertical"
                    className="mx-0.5 !h-2 !w-px shrink-0 self-center"
                  />
                )}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      size="icon"
                      variant="pill"
                      className="border-transparent bg-transparent hover:bg-gray-3"
                      aria-label={label}
                    >
                      <Icon className="icon" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{label}</TooltipContent>
                </Tooltip>
              </div>
            ))}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="button" variant="pill" className="shrink-0">
                Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[200px]">
              <DropdownMenuGroup>
                <DropdownMenuItem>Copy</DropdownMenuItem>
                <DropdownMenuItem>Paste</DropdownMenuItem>
                <DropdownMenuItem>Paste to replace</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Layers</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Move to top</DropdownMenuItem>
                  <DropdownMenuItem>Move up</DropdownMenuItem>
                  <DropdownMenuItem>Move down</DropdownMenuItem>
                  <DropdownMenuItem>Move to bottom</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Boolean groups</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Union</DropdownMenuItem>
                  <DropdownMenuItem>Subtract</DropdownMenuItem>
                  <DropdownMenuItem>Intersect</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Merge</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-gray-6 bg-gray-2 px-1.5 py-2.5">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                "radial-gradient(circle at 15% 10%, var(--accent-a4), transparent 42%), radial-gradient(circle at 85% 0%, var(--accent-a3), transparent 38%), linear-gradient(160deg, var(--gray-2), var(--gray-3))",
            }}
          />
          <div className="relative mx-auto w-full max-w-[360px]">
            <p className="mb-1.5 text-center text-sm font-semibold text-gray-12">
              Sign up
            </p>
            <Card className="border-gray-6 bg-gray-1 shadow-sm">
              <CardHeader className="pb-1">
                <CardTitle className="text-sm font-semibold text-gray-12">
                  Create account
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-1.5">
                <div className="flex flex-col gap-0.5">
                  <Label htmlFor="example-name" className="text-sm">
                    Full name
                  </Label>
                  <Input
                    id="example-name"
                    placeholder="Enter your name"
                    className="h-3 rounded-md border border-gray-6 bg-gray-1 px-1 text-gray-12"
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <Label htmlFor="example-email" className="text-sm">
                    Email
                  </Label>
                  <Input
                    id="example-email"
                    type="email"
                    placeholder="Enter your email address"
                    className="h-3 rounded-md border border-gray-6 bg-gray-1 px-1 text-gray-12"
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <Label htmlFor="example-password" className="text-sm">
                    Password
                  </Label>
                  <Input
                    id="example-password"
                    type="password"
                    placeholder="Enter your password"
                    className="h-3 rounded-md border border-gray-6 bg-gray-1 px-1 text-gray-12"
                  />
                </div>
                <div className="mt-0.5 flex flex-col gap-1">
                  <Button type="button" size="sm">
                    Create account
                  </Button>
                  <div className="flex items-center gap-1">
                    <Separator className="flex-1" />
                    <span className="text-xs text-gray-11">OR</span>
                    <Separator className="flex-1" />
                  </div>
                  <Button type="button" size="sm" variant="pill" className="gap-0.5">
                    <GitHubLogoIcon className="icon" />
                    Continue with GitHub
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex min-w-0 flex-col gap-1.5">
        <Tabs defaultValue="colors">
          <TabsList className="flex w-full justify-start overflow-x-auto">
            <TabsTrigger value="themes">Themes</TabsTrigger>
            <TabsTrigger value="primitives">Primitives</TabsTrigger>
            <TabsTrigger value="icons">Icons</TabsTrigger>
            <TabsTrigger value="colors">Colors</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap gap-1">
            {[
              { src: PEOPLE[2], solid: true },
              { src: PEOPLE[1], solid: true },
              { fallback: "V", solid: true },
              { fallback: "BG", solid: true },
              { icon: true, solid: true },
              { icon: true, solid: true, contrast: true },
            ].map((avatar, index) => (
              <Avatar
                key={`solid-${index}`}
                className={cn(
                  "size-3",
                  avatar.contrast
                    ? "bg-accent-12 text-accent-1"
                    : "bg-accent-9 text-accent-contrast"
                )}
              >
                {"src" in avatar && avatar.src ? (
                  <AvatarImage src={avatar.src} alt="User" />
                ) : null}
                <AvatarFallback>
                  {"icon" in avatar && avatar.icon ? (
                    <PersonIcon className="icon" />
                  ) : (
                    ("fallback" in avatar && avatar.fallback) || "V"
                  )}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          <div className="flex flex-wrap gap-1">
            {[
              { src: PEOPLE[0] },
              { src: PEOPLE[3] },
              { fallback: "V" },
              { fallback: "BG" },
              { icon: true },
              { icon: true, soft: true },
            ].map((avatar, index) => (
              <Avatar
                key={`soft-${index}`}
                className={cn(
                  "size-3",
                  avatar.soft
                    ? "bg-accent-4 text-accent-12"
                    : "bg-accent-3 text-accent-11"
                )}
              >
                {"src" in avatar && avatar.src ? (
                  <AvatarImage src={avatar.src} alt="User" />
                ) : null}
                <AvatarFallback>
                  {"icon" in avatar && avatar.icon ? (
                    <PersonIcon className="icon" />
                  ) : (
                    ("fallback" in avatar && avatar.fallback) || "V"
                  )}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-1">
          <LinksExample />
          <LinksExample muted />
        </div>

        <div className="rounded-lg border border-gray-6 bg-gray-1 p-1.5">
          <ToDoList items={todos} onItemsChange={setTodos} />
        </div>
      </div>
    </div>
  );
}

export default function AuraAesthetic() {
  const {
    appearance,
    currentColors,
    setTheme,
    setColor,
    resetDefaults,
    downloadCSS,
  } = useAuraThemeColors();

  const handleFieldChange =
    (field: keyof ThemeColors) => (value: string) => {
      setColor(field, value);
    };

  return (
    <section className="overflow-x-clip border-t border-gray-6 bg-gray-2">
      <div className="smesh pad flex flex-col gap-2.5 py-3">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-1 text-center">
          <h2 className="font-bold text-gray-12">Create a custom palette</h2>
          <p className="text-balance text-gray-11">
            Same live preview as the header color mixer: pick accent, gray, and
            background, then download CSS for your app.
          </p>

          <div
            className="mt-0.5 inline-flex rounded-md border border-gray-6 bg-gray-3 p-0.5"
            role="group"
            aria-label="Color appearance"
          >
            <button
              type="button"
              onClick={() => setTheme("light")}
              className={cn(
                "inline-flex cursor-pointer items-center gap-0.5 rounded border-none px-1 py-0.5 text-xs font-medium transition-colors",
                appearance === "light"
                  ? "bg-gray-1 text-gray-12 shadow-sm"
                  : "bg-transparent text-gray-11 hover:text-gray-12"
              )}
            >
              <SunIcon className="icon" />
              Light
            </button>
            <button
              type="button"
              onClick={() => setTheme("dark")}
              className={cn(
                "inline-flex cursor-pointer items-center gap-0.5 rounded border-none px-1 py-0.5 text-xs font-medium transition-colors",
                appearance === "dark"
                  ? "bg-gray-1 text-gray-12 shadow-sm"
                  : "bg-transparent text-gray-11 hover:text-gray-12"
              )}
            >
              <MoonIcon className="icon" />
              Dark
            </button>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-4xl flex-col items-stretch gap-1 rounded-xl border border-gray-6 bg-gray-1 p-1.5 sm:flex-row sm:items-end sm:gap-1.5">
          <div className="grid flex-1 grid-cols-1 gap-1 sm:grid-cols-3">
            <ColorField
              id="custom-accent"
              label="Accent"
              value={currentColors.accent}
              onChange={handleFieldChange("accent")}
            />
            <ColorField
              id="custom-gray"
              label="Gray"
              value={currentColors.gray}
              onChange={handleFieldChange("gray")}
            />
            <ColorField
              id="custom-background"
              label="Background"
              value={currentColors.background}
              onChange={handleFieldChange("background")}
            />
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-1">
            <Button type="button" variant="pill" onClick={resetDefaults}>
              Reset
            </Button>
            <Button type="button" className="gap-0.5" onClick={downloadCSS}>
              <DownloadIcon className="icon" />
              Download CSS
            </Button>
          </div>
        </div>

        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-1 hidden grid-cols-12 gap-0 sm:grid">
            {USAGE_RANGES.map((range) => (
              <div
                key={range.label}
                style={{ gridColumn: `${range.start} / ${range.end + 1}` }}
              >
                <ColorUsageRange label={range.label} />
              </div>
            ))}
          </div>

          <div className="mb-0.5 hidden grid-cols-12 sm:grid">
            {Array.from({ length: 12 }, (_, index) => (
              <p
                key={`step-${index + 1}`}
                className="text-center text-xs tabular-nums text-gray-11"
              >
                {index + 1}
              </p>
            ))}
          </div>

          <div className="flex flex-col gap-1">
            <ScaleRow scale="accent" />
            <ScaleRow scale="gray" />
          </div>
          <div className="mt-1 flex flex-wrap gap-1.5 text-xs text-gray-11">
            <span className="inline-flex items-center gap-0.5">
              <span className="size-1 rounded-sm bg-accent-9" /> Accent
            </span>
            <span className="inline-flex items-center gap-0.5">
              <span className="size-1 rounded-sm bg-gray-9" /> Gray
            </span>
          </div>
        </div>

        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-1">
            <h3 className="text-sm font-semibold text-gray-12">
              Component preview
            </h3>
            <p className="text-xs text-gray-11">
              Aura components using your live palette.
            </p>
          </div>
          <div className="rounded-xl border border-gray-6 bg-gray-1 p-1.5 md:p-2">
            <ComponentsShowcase />
          </div>
        </div>

        <div className="mx-auto flex max-w-xl flex-col items-center gap-1 pb-1 text-center">
          <p className="text-gray-11">
            Start with great taste, finish with{" "}
            <span className="text-gray-12">your own flavor</span>.
          </p>
          <Button asChild size="lg">
            <Link href="/docs">Get Started</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
