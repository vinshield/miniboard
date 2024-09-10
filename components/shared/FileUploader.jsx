"use client";

import { useCallback, Dispatch, SetStateAction } from "react";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { Button } from "@/components/ui/button";
import { convertFileToUrl } from "@/lib/utils";
import Image from "next/image";

export function FileUploader({ imageUrl, onFieldChange, setFiles }) {
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} className="cursor-pointer" />

      <div className="flex-center mb-8">
        <Button type="button" className="rounded-lg">
          Upload poster 🚀
        </Button>
      </div>

      <div className="flex-center flex aspect-square w-full cursor-pointer flex-col overflow-hidden rounded-xl border bg-secondary">
        {imageUrl ? (
          <div className="flex h-full w-full flex-1 justify-center">
            <Image
              src={imageUrl}
              alt="image"
              width={250}
              height={250}
              className="w-full object-cover object-center"
            />
          </div>
        ) : (
          <div className="flex-center flex-col py-5 text-grey-500">
            <Image
              src="/assets/icons/upload.svg"
              width={77}
              height={77}
              alt="file upload"
            />
            <h3 className="my-1 mt-2">Drag photo here</h3>
            <p className="p-medium-12 mb-8">SVG, PNG, JPG</p>
          </div>
        )}{" "}
      </div>
    </div>
  );
}
