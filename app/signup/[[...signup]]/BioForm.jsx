"use client";

import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle, ArrowRight } from "lucide-react";
import { updateUserProfile } from "@/lib/actions/clerk.actions";

export function BioForm({ onSubmit, username }) {
  const { user, isLoaded } = useUser();
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const [uploadingBio, setUploadingBio] = useState(false);

  const handleSubmit = async (e) => {
    setUploadingBio(true);
    e.preventDefault();
    if (!isLoaded || !user) return;

    try {
      const result = await updateUserProfile({ bio });
      if (result.success) {
        onSubmit();
      } else {
        console.error("Failed to update profile:", result.error);
        setError("Bio upload failed. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.message || "An error occurred when uploading your bio.");
    } finally {
      setUploadingBio(false);
    }
  };

  return (
    <div className="mt-12 flex flex-col">
      <div className="mb-10">
        <h2 className="leading-12 block text-4xl font-semibold tracking-tighter md:text-4xl">
          You&apos;re in!
        </h2>
        <p className="mt-2 text-lg">
          Tell us a bit about yourself or your organization
        </p>
      </div>

      <form onSubmit={handleSubmit} className="">
        <div className="space-y-2">
          <p className="font-semibold">Enter a short bio</p>
          <Textarea
            id="bio"
            placeholder={`${username} is sooo cool`}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            autoFocus
            rows={5}
            className="input-field rounded-lg px-4 py-6 text-base placeholder:text-[#a8a8a8]"
          />
        </div>

        {error && <div className="mt-2 text-sm text-red-500">{error}</div>}

        <div className="mt-12 space-y-2">
          <Button
            type="submit"
            variant="test"
            size="lg"
            className="w-full font-bold"
            disabled={!bio || uploadingBio}
          >
            {uploadingBio ? (
              <>
                {" "}
                <LoaderCircle className="mr-1 animate-spin" /> 
              </>
            ) : (
              "Continue"
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full"
            onClick={onSubmit}
          >
            Skip <ArrowRight className="ml-1 size-6" />
          </Button>
        </div>
      </form>
    </div>
  );
}
