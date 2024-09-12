"use client";

import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TextareaAutosize from "react-textarea-autosize";

import { eventDefaultValues } from "@/constants";

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
import { Input } from "@/components/ui/input";
import { FileUploader } from "./FileUploader";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { eventFormSchema } from "@/lib/validator";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function EventForm({ userId, type, event, eventId }) {
  const [files, setFiles] = useState([]);

  const initialValues =
    event && type === "Update"
      ? {
          ...event,
          startDateTime: new Date(event.startDateTime),
          endDateTime: new Date(event.endDateTime),
        }
      : eventDefaultValues;

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  });

  // 2. Define a submit handler.
  function onSubmit(values) {
    console.log(values);
  }

  return (
    <div className="container overflow-hidden">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FileUploader
                  onFieldChange={field.onChange}
                  imageUrl={field.value}
                  setFiles={setFiles}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <TextareaAutosize
                    {...field}
                    placeholder="Event Name"
                    className="mt-2 w-full border-none bg-transparent p-0 text-3xl font-semibold shadow-none focus-visible:outline-none focus-visible:ring-0"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <div className="flex flex-col">
            <FormField
              control={form.control}
              name="startDateTime"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex h-[54px] overflow-hidden rounded-t-lg bg-secondary p-4">
                      <p className="w-1/6 whitespace-nowrap text-sm text-muted-foreground">
                        Start
                      </p>
                      <DatePicker
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        showTimeSelect
                        timeInputLabel="Time"
                        dateFormat={`MMM d, yyyy ${"|"} h:mm aa`}
                        wrapperClassName="datePicker text-sm"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDateTime"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex h-[54px] overflow-hidden rounded-b-lg bg-secondary p-4">
                      <p className="w-1/6 whitespace-nowrap text-sm text-muted-foreground">
                        End
                      </p>
                      <DatePicker
                        selected={field.value}
                        onChange={(date) => field.onChange(date)}
                        showTimeSelect
                        timeInputLabel="Time"
                        dateFormat={`MMM d, yyyy ${"|"} h:mm aa`}
                        wrapperClassName="datePicker text-sm"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div> */}

          <div>
            <FormField
              control={form.control}
              name="online-event"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2 rounded-t-lg bg-secondary pl-4 pt-4">
                    <FormLabel className="text-xs text-muted-foreground">
                      Online event
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex-center overflow-hidden rounded-b-lg bg-secondary p-2 pl-4">
                      <Image
                        src="/assets/icons/location-grey.svg"
                        alt="location"
                        width={18}
                        height={18}
                      />
                      <Input
                        placeholder="Add Event Location"
                        {...field}
                        className="input-field p-0 pl-1 text-sm"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Add Description"
                    className="input-field resize-none rounded-lg p-4"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
