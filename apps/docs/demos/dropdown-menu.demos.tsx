"use client";

import { Copy, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@sagui/ui";


// #region Hero
export function Hero() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild><Button variant="secondary" trailingIcon={<MoreHorizontal />}>Actions</Button></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Vendor</DropdownMenuLabel>
        <DropdownMenuItem icon={<Pencil />}>Edit</DropdownMenuItem>
        <DropdownMenuItem icon={<Copy />} shortcut="⌘ D">Duplicate</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem icon={<Trash2 />} destructive>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
// #endregion
