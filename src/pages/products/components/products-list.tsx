import { PenSquare } from "lucide-react";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export type ProductListProps = {
  data: Product[];
  onUpdateButtonClick: (productId: number) => void;
}

const ProductList = ({ data, onUpdateButtonClick }: ProductListProps) => {
  if (0 === data.length) {
    return (
      <blockquote className="mt-6 border-l-2 pl-6 italic">
        "Products are empty!"
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
          <TableHead>ShortDescription</TableHead>
          <TableHead className="text-right">MinLength</TableHead>
          <TableHead className="text-right">MaxLength</TableHead>
          <TableHead>Status</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row: Product, idx: number) => {
          return (
            <TableRow key={row.id}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell className="text-left">{row.code}</TableCell>
              <TableCell className="text-left">{row.name}</TableCell>
              <TableCell className="text-left">{row.short_description}</TableCell>
              <TableCell className="text-right">{new Intl.NumberFormat('id-ID').format(row.min_length)}</TableCell>
              <TableCell className="text-right">{new Intl.NumberFormat('id-ID').format(row.max_length)}</TableCell>
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

export default ProductList;
