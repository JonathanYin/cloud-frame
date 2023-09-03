"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchForm({
  initialSearch,
}: {
  initialSearch: string;
}) {
  const [tagName, setTagName] = useState(initialSearch ?? "");
  const router = useRouter();

  useEffect(() => {
    setTagName(initialSearch);
  }, [initialSearch]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.replace(`/gallery?search=${encodeURIComponent(tagName)}`);
        router.refresh();
      }}
    >
      <div className="pb-2">
        <Label htmlFor="tag-name" className="text-right">
          Search by Tag
        </Label>
      </div>
      <div className="flex gap-2">
        <Input
          onChange={(e) => setTagName(e.currentTarget.value)}
          id="tag-name"
          value={tagName}
          className="col-span-3"
        />
        <Button>Search</Button>
      </div>
    </form>
  );
}
