import {
  CodeIcon,
  TextIcon,
  QuoteIcon,
  ListBulletIcon,
  CheckboxIcon,
} from "@radix-ui/react-icons"

export const blockTypeToBlockName: Record<
  string,
  { label: string; icon: React.ReactNode }
> = {
  paragraph: {
    label: "Párrafo",
    icon: <TextIcon className="icon" />,
  },
  h1: {
    label: "Título 1",
    icon: <TextIcon className="icon h1" />,
  },
  h2: {
    label: "Título 2",
    icon: <TextIcon className="icon h2" />,
  },
  h3: {
    label: "Título 3",
    icon: <TextIcon className="icon h3" />,
  },
  number: {
    label: "Lista numerada",
    icon: <ListBulletIcon className="icon" />,
  },
  bullet: {
    label: "Lista con viñetas",
    icon: <ListBulletIcon className="icon" />,
  },
  check: {
    label: "Lista de tareas",
    icon: <CheckboxIcon className="icon" />,
  },
  code: {
    label: "Bloque de código",
    icon: <CodeIcon className="icon" />,
  },
  quote: {
    label: "Cita",
    icon: <QuoteIcon className="icon" />,
  },
}
