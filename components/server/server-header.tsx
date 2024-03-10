"use client";

import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

export const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const { onOpen } = useModal();
  // const [isDarkBackground, setIsDarkBackground] = useState(false);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // const calculateAverageBrightness = (image: HTMLImageElement) => {
  //   const canvas = document.createElement("canvas");
  //   const context = canvas.getContext("2d");

  //   if (!context) {
  //     console.warn("Canvas context is not supported.");
  //     return 0;
  //   }

  //   canvas.width = image.width;
  //   canvas.height = image.height;

  //   context.drawImage(image, 0, 0, image.width, image.height);

  //   const imageData = context.getImageData(
  //     0,
  //     0,
  //     image.width,
  //     image.height
  //   ).data;

  //   let sumBrightness = 0;

  //   for (let i = 0; i < imageData.length; i += 4) {
  //     const brightness =
  //       (imageData[i] + imageData[i + 1] + imageData[i + 2]) / 3;
  //     sumBrightness += brightness;
  //   }

  //   const averageBrightness = sumBrightness / (imageData.length / 4);
  //   return averageBrightness;
  // };

  // useEffect(() => {
  //   const image = new Image();
  //   image.src = server?.imageUrl;

  //   image.onload = () => {
  //     setIsDarkBackground(calculateAverageBrightness(image) < 128);
  //   };
  // }, [server]);

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  if (!isMounted) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none rounded-md" asChild>
        <button
          className={cn(
            "w-full text-md font-semibold px-3 flex items-end h-32 border-neutral-800 border-b-[1px] hover:bg-zinc-700/50 hover:shadow-lg transition",
            "bg-cover"
          )}
          style={{
            backgroundImage: `url('${server?.imageUrl}')`,
          }}
        >
          <div
            // className={`flex items-center w-full bg-gray-400/15 px-5 rounded-md
            // ${ isDarkBackground ? "text-white" : "text-black" }
            // `}
            className={`flex items-center w-full bg-gray-400/15 px-5 rounded-md `}
          >
            {server.name}
            <ChevronDown className="h-5 w-5 ml-auto" />
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs font-medium text-neutral-400 bg-black/85 space-y-[2px] border-none">
        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen("invite", { server })}
            className="text-amber-700 px-3 py-2 text-sm cursor-pointer"
          >
            Invite People
            <UserPlus className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("editServer", { server })}
            className="px-3 py-2 text-sm cursor-pointer"
          >
            Server Settings
            <Settings className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("members", { server })}
            className="px-3 py-2 text-sm cursor-pointer"
          >
            Manage Members
            <Users className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen("createChannel")}
            className="px-3 py-2 text-sm cursor-pointer"
          >
            Create Channel
            <PlusCircle className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && <DropdownMenuSeparator className="bg-gray-500" />}
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("deleteServer", { server })}
            className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
          >
            Delete Server
            <Trash className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen("leaveServer", { server })}
            className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
          >
            Leave Server
            <LogOut className="h-4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
