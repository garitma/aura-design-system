import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../registry/default/components/ui/Table"

export function Default() {
  return (
    <Table>
      <TableCaption>Recent Aura component reviews.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Component</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Checks</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Badge</TableCell>
          <TableCell>Ready</TableCell>
          <TableCell className="text-right">12</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Input</TableCell>
          <TableCell>In review</TableCell>
          <TableCell className="text-right">8</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Textarea</TableCell>
          <TableCell>Ready</TableCell>
          <TableCell className="text-right">10</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
