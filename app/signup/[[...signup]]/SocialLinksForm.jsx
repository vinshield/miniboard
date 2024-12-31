"use client";

import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoaderCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { socialHandles } from "@/constants";
import { updateUserProfile } from "@/lib/actions/clerk.actions";

export function SocialLinksForm({ onSubmit, changeBio }) {
  const { user, isLoaded } = useUser();
  const [uploadingInfo, setUploadingInfo] = useState(false);
  const [error, setError] = useState("");

  const [handles, setHandles] = useState({
    instagram: "",
    x: "",
    tiktok: "",
    snapchat: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Remove @ and spaces from the input value
    const sanitizedValue = value.replace(/[@\s]/g, "");
    setHandles((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));
  };

  const handleSubmit = async (e) => {
    setUploadingInfo(true);
    e.preventDefault();

    if (!isLoaded || !user) return;

    try {
      const result = await updateUserProfile(handles);
      if (result.success) {
        onSubmit();
      } else {
        console.error("Failed to update profile:", result.error);
        setError("Error saving social links. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.message || "An error occurred when saving your social links.");
    } finally {
      setUploadingInfo(false);
    }
  };

  return (
    <div className="mt-16 flex flex-col">
      <div className="mb-10">
        <h2 className="leading-12 block text-4xl font-semibold tracking-tighter md:text-4xl">
          You&apos;re in!
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="">
        <div className="space-y-2">
          <p className="font-semibold">Add your social links</p>

          {socialHandles.map((handle) => (
            <div key={handle.name} className="ml-2 flex items-center">
              <i className={`ci ci-${handle.name} ci-1x mr-2`}></i>
              <div className="flex w-full items-center justify-center overflow-hidden rounded-lg bg-secondary px-4 py-1">
                <p className="m-0 block p-0 text-[#6b6b6b]">@</p>
                <Input
                  maxLength={21}
                  className="input-field m-0 min-w-[20px] rounded-lg p-0 text-base placeholder:italic placeholder:text-[#a8a8a8]"
                  id={handle.name}
                  name={handle.name}
                  placeholder={`your-${handle.name}-handle`}
                  value={handles[handle.name] || ""}
                  autoComplete="off"
                  onChange={handleChange}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 space-y-2">
          <Button
            type="submit"
            variant="test"
            size="lg"
            className="w-full font-bold"
            disabled={uploadingInfo}
          >
            {uploadingInfo ? (
              <>
                {" "}
                <LoaderCircle className="mr-1 animate-spin" /> Saving
              </>
            ) : (
              "Complete"
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
