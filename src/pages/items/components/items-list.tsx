import { PenSquare } from "lucide-react";
import { Item } from "@/types/item";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export type ItemListProps = {
  data: Item[];
  onUpdateButtonClick: (itemId: number) => void;
}

const ItemList = ({ data, onUpdateButtonClick }: ItemListProps) => {
  if (0 === data.length) {
    return (
      <blockquote className="mt-6 border-l-2 pl-6 italic">
        "Items are empty!"
      </blockquote>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Code</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>BaseUnit</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row: Item, idx: number) => {
          return (
            <TableRow key={row.id}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell className="text-left">{row.code}</TableCell>
              <TableCell className="text-left">{row.name}</TableCell>
              <TableCell className="text-left">{row.base_unit}</TableCell>
              <TableCell className="text-right">{new Intl.NumberFormat('id-ID').format(row.price)}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>
                <Button variant="outline" size="icon" onClick={() => onUpdateButtonClick(row.id)}>
                  <PenSquare className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default ItemList;
