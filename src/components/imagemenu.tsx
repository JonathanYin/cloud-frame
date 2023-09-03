import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "./icons/menu";
import { AddToAlbum } from "./addtoalbum";
import { SearchResult } from "@/app/gallery/page";
import { useState } from "react";
import Link from "next/link";
import { Pencil } from "lucide-react";

export function ImageMenu({ image }: { image: SearchResult }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute top-2 left-2">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="w-8 h-8 p-0">
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-36">
          <DropdownMenuGroup>
            <DropdownMenuItem asChild className="my-1">
              <AddToAlbum image={image} onClose={() => setOpen(false)} />
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="my-1">
              <Button
                asChild
                variant="ghost"
                className="cursor-pointer flex justify-start items-center"
              >
                <Link
                  href={`/edit?publicId=${encodeURIComponent(image.public_id)}`}
                >
                  <div className="flex items-center justify-start">
                    <div className="w-6 mr-4 ml-2">
                      <Pencil className="mr-2 h-6 w-6" />
                    </div>
                    <span>Edit</span>
                  </div>
                </Link>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
