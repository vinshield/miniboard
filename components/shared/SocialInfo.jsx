"use client";

import { useUser } from "@clerk/nextjs";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { z } from "zod";

import { toast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import { updateUserProfile } from "@/lib/actions/clerk.actions";
import { Input } from "../ui/input";
import { socialHandles } from "@/constants";

const FormSchema = z.object({
  bio: z.string().max(160, {
    message: "Bio must not be longer than 30 characters.",
  }),
  displayName: z.string().min(1, {
    message: "Display name is required",
  }),
  instagram: z.string(),
  x: z.string(),
  snapchat: z.string(),
  tiktok: z.string(),
});

export function SocialInfo() {
  const { user } = useUser();
  const [uploadingData, setUploadingData] = useState(false);
  const [error, setError] = useState("");

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      bio: user?.publicMetadata?.bio || "",
      displayName: user?.publicMetadata?.displayName || "",
      instagram: user?.publicMetadata?.socialHandles?.instagram || "",
      x: user?.publicMetadata?.socialHandles?.x || "",
      snapchat: user?.publicMetadata?.socialHandles?.snapchat || "",
      tiktok: user?.publicMetadata?.socialHandles?.tiktok || "",
    },
  });

  // Update form when user data loads
  useEffect(() => {
    if (user?.publicMetadata) {
      form.reset({
        bio: user.publicMetadata.bio || "",
        displayName: user.publicMetadata.displayName || "",
        instagram: user.publicMetadata.socialHandles?.instagram || "",
        x: user.publicMetadata.socialHandles?.x || "",
        snapchat: user.publicMetadata.socialHandles?.snapchat || "",
        tiktok: user.publicMetadata.socialHandles?.tiktok || "",
      });
    }
  }, [user, form]);

  async function onSubmit(data) {
    setUploadingData(true);
    try {
      const result = await updateUserProfile({
        bio: data.bio || "",
        displayName: data.displayName,
        instagram: data.instagram || "",
        x: data.x || "",
        snapchat: data.snapchat || "",
        tiktok: data.tiktok || "",
      });

      if (result.success) {
        toast({
          title: "Success",
          description: "Your profile has been updated.",
        });
      } else {
        setError(result.error || "Failed to update profile");
        throw new Error(result.error || "Failed to update profile");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setUploadingData(false);
    }
  }

  return (
    <div>
      <h2 className="text-[17px] font-bold">About Me</h2>
      <hr className="my-5"></hr>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your display name"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="A short bio describing yourself or your organization"
                    className="h-32 resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <FormLabel>Social Links</FormLabel>
            {socialHandles.map((handle) => (
              <FormField
                key={handle.name}
                control={form.control}
                name={handle.name}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <i className={`ci ci-${handle.name} ci-1x mr-2`}></i>
                      <FormControl className="flex-1">
                        <div className="relative flex items-center">
                          <span className="pointer-events-none absolute left-3 select-none text-muted-foreground">
                            @
                          </span>
                          <Input
                            {...field}
                            maxLength={21}
                            className="w-full pl-7"
                            placeholder={`your-${handle.name}-handle`}
                            autoComplete="off"
                            onChange={(e) => {
                              const sanitizedValue = e.target.value.replace(
                                /[@\s]/g,
                                "",
                              );
                              field.onChange(sanitizedValue);
                            }}
                          />
                        </div>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button
            type="submit"
            variant="test"
            className="mt-4 w-full"
            disabled={uploadingData}
          >
            {uploadingData ? (
              <>
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              </>
            ) : (
              "Save"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
