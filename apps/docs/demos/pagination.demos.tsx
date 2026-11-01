"use client";

import { useState } from "react";
import { Pagination } from "@sagui/ui";


// #region Hero
export function Hero() {
  const [page, setPage] = useState(1);
  return (
    <Pagination page={page} pageCount={24} onPageChange={setPage} summary={`Showing ${(page - 1) * 20 + 1}–${page * 20} of 468`} className="w-full" />
  );
}
// #endregion

// #region Compact
export function Compact() {
  const [page, setPage] = useState(1);
  return (
    <Pagination page={page} pageCount={24} onPageChange={setPage} layout="compact" />
  );
}
// #endregion
