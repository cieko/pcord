"use client";

import { FileIcon, X } from "lucide-react";
import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";

import "@uploadthing/react/styles.css";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

export const FileUpload = ({ onChange, value, endpoint }: FileUploadProps) => {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image fill src={value} alt="Upload" className="rounded-full" />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  // if (value && fileType === "pdf") {
  //   return (
  //     <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
  //       <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
  //       <a
  //         href={value}
  //         target="_blank"
  //         rel="noopener noreferrer"
  //         className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
  //       >
  //         {value}
  //       </a>
  //       <button
  //         onClick={() => onChange("")}
  //         className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
  //         type="button"
  //       >
  //         <X className="h-4 w-4" />
  //       </button>
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-col items-start justify-center w-[28.5rem]">
      {/* IMAGE RENDER */}
      <div className="w-full flex items-center justify-center pb-10">
        <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10 border-2 =">
          <FileIcon className="h-16 w-16 fill-gray-200 stroke-black" />
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
          >
            {value}
          </a>
          {value && (
            <button
              onClick={() => onChange("")}
              className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* SERVER IMAGE UPLOADER 👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇🏻👇 */}
      <div className="flex items-center justify-start gap-16">
      <div className="text-xs whitespace-nowrap font-bold text-gray-500 tracking-normal uppercase">
        Server Image :
      </div>
      {/* <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {
          console.log(error);
        }}
        className="w-full"
      /> */}
      <UploadButton<OurFileRouter>
        className="mt-4 w-full ut-button:bg-red-500 ut-button:ut-readying:bg-red-500/50"
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {
          console.log(error);
        }}
        onBeforeUploadBegin={(files) => {
          return files.map(
            (f) => new File([f], "renamed-" + f.name, { type: f.type })
          );
        }}
        onUploadBegin={(name) => {
          console.log("Uploading: ", name);
        }}
      />
      </div>
    </div>
  );
};
