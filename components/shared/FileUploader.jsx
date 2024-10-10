"use client";

import { useCallback, Dispatch, SetStateAction, useState } from "react";
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { extractPosterInfo } from "@/lib/actions/event.actions";

import { Button } from "@/components/ui/button";
import { convertFiletoBase64, convertFileToUrl } from "@/lib/utils";
import Image from "next/image";
import { resolve } from "styled-jsx/css";

import { PosterSkeleton } from "../ui/skeletons";

export function FileUploader({
  imageUrl,
  onFieldChange,
  setFiles,
  setExtractedDetails,
  showForm,
  gettingPosterInfo,
  setGettingPosterInfo,
}) {
  const onDrop = useCallback(async (acceptedFiles) => {
    setGettingPosterInfo(true);
    setFiles(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]));

    // convert file to base64 in order to send it to server function
    const posterInfo = await convertFiletoBase64(acceptedFiles[0]).then((val) =>
      extractPosterInfo(val),
    );
    setExtractedDetails(posterInfo);
    setGettingPosterInfo(false);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
    maxSize: 3 * 1024 * 1024,
  });

  return (
    <>
      <div
        {...getRootProps()}
        className={`${showForm ? "" : "mb-4"} flex-center borderfill-primary relative flex aspect-square w-full cursor-pointer flex-col overflow-hidden rounded-xl border-2 border-dashed`}
        id="file-input"
      >
        {gettingPosterInfo && <PosterSkeleton />}
        <input {...getInputProps()} className="cursor-pointer" />

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
            <h3 className="my-1 mt-2 text-sm">
              Click or drag poster here to upload
            </h3>
            <p className="mb-8 text-sm">SVG, PNG, JPG</p>
          </div>
        )}
      </div>
      <Button
        size="lg"
        className={`${showForm ? "hidden" : "block"} $ h-12 w-full shadow-md`}
        type="button"
        disabled={gettingPosterInfo}
        onClick={() => document.getElementById("file-input").click()}
      >
        Upload your event poster
      </Button>{" "}
    </>
  );
}
