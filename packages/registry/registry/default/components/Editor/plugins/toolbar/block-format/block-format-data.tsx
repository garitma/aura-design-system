import {
  CodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ListIcon,
  ListOrderedIcon,
  ListTodoIcon,
  QuoteIcon,
  TextIcon,
} from "lucide-react"

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
    icon: <Heading1Icon className="icon" />,
  },
  h2: {
    label: "Título 2",
    icon: <Heading2Icon className="icon" />,
  },
  h3: {
    label: "Título 3",
    icon: <Heading3Icon className="icon" />,
  },
  number: {
    label: "Lista numerada",
    icon: <ListOrderedIcon className="icon" />,
  },
  bullet: {
    label: "Lista con viñetas",
    icon: <ListIcon className="icon" />,
  },
  check: {
    label: "Lista de tareas",
    icon: <ListTodoIcon className="icon" />,
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
