"use client";

import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

import { formatDate, formatTime } from "@/lib/utils";

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
import { text } from "body-parser";
import { Captions } from "lucide-react";

// TO-DO:
// Create caption
// Create form validation flow on front
// Save posts

export default function EventForm({ userId, type, event, eventId }) {
  const [files, setFiles] = useState([]);
  const [extractedDetails, setExtractedDetails] = useState(null);
  const [isOnline, setisOnline] = useState(false);
  const [showForm, setShowForm] = useState(false);

  let initialValues =
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
  const onSubmit = async (values) => {
    // console.log(values.title);
    console.log("submit button clicked");
  };

  const showFormAndScroll = () => {
    setShowForm(true);

    const formText = document.getElementById("form-text");

    formText.classList.remove("h-0", "hidden");
    formText.classList.add("h-full");
    formText.scrollIntoView({ behavior: "smooth", block: "nearest" });
    setTimeout(() => {
      formText.classList.remove("opacity-0");
      formText.classList.add("opacity-100");
    }, 500);
  };

  const { setValue, reset } = form;

  const generateCaption = (val) => {
    const { caption, startDateTime, endDateTime, location } = val;
    const captionDate = formatDate(startDateTime);
    console.log(captionDate);

    const newCaption = `${caption}\n\n_Stressless reminder link_ 👇🏽👇🏽\n${"https://miniboard-flax.vercel.app/add"}\n\n📅 *${captionDate}*\n📍 *${location}*`;

    return newCaption;
  };

  useEffect(() => {
    // Put the details extracted from the poster into the input fields
    if (extractedDetails) {
      // console.log(extractedDetails);
      Object.entries(extractedDetails).forEach(([key, value]) => {
        if (key === "startDateTime" || key === "endDateTime") {
          if (value) {
            let myDate = new Date(value);
            console.log(value instanceof Date);
            console.log(myDate instanceof Date);
            value = myDate;
          } else {
            value = new Date();
          }
        }
        if (key === "isOnline") {
          if (value && value === true) {
            setisOnline(true);
          }
        }
        if (key === "caption") {
          value = generateCaption(extractedDetails);
        }
        setValue(key, value);
      });
      // scroll to the form and display it
      showFormAndScroll();
    }
  }, [extractedDetails]);

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
                  setExtractedDetails={setExtractedDetails}
                  showForm={showForm}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="button"
            variant="ghost"
            className={`${showForm ? "hidden" : "visible"}`}
            onClick={() => showFormAndScroll()}
          >
            Enter details manually
          </Button>

          <div
            className={`hidden h-0 space-y-4 opacity-0 transition-opacity duration-1000 ease-in`}
            id="form-text"
          >
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

            <div className="divide flex flex-col divide-y-2 divide-dotted rounded-lg bg-secondary px-8">
              <FormField
                control={form.control}
                name="startDateTime"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex h-[54px] items-center justify-between overflow-hidden rounded-t-lg py-4">
                        <p className="w-1/6 whitespace-nowrap text-sm text-muted-foreground">
                          Start
                        </p>
                        <div>
                          <DatePicker
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            showTimeSelect
                            timeInputLabel="Time"
                            dateFormat={`MMM d, yyyy ${"|"} h:mm aa`}
                            wrapperClassName="datePicker text-[15px] margin-auto"
                          />
                        </div>
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
                      <div className="flex h-[54px] items-center justify-between overflow-hidden rounded-t-lg py-4">
                        <p className="w-1/6 whitespace-nowrap text-sm text-muted-foreground">
                          End
                        </p>
                        <div>
                          <DatePicker
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                            showTimeSelect
                            timeInputLabel="Time"
                            dateFormat={`MMM d, yyyy ${"|"} h:mm aa`}
                            wrapperClassName="datePicker text-[15px]"
                          />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="isOnline"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between space-x-2 rounded-t-lg bg-secondary px-4 pt-4">
                      <FormLabel className="text-xs text-muted-foreground">
                        Online event
                      </FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            setisOnline(checked);
                            field.onChange(checked);
                          }}
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
                        {isOnline ? (
                          <Image
                            src="/assets/icons/link.svg"
                            alt="location"
                            width={18}
                            height={18}
                          />
                        ) : (
                          <Image
                            src="/assets/icons/location-grey.svg"
                            alt="location"
                            width={18}
                            height={18}
                          />
                        )}

                        <Input
                          placeholder={`Add ${isOnline ? "Meeting URL" : "Event Location"}`}
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
                    <TextareaAutosize
                      placeholder="Add Description"
                      className="input-field flex min-h-[60px] w-full rounded-lg border border-none border-input bg-transparent p-4 px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      {...field}
                    />
                    {/* <Textarea
                      placeholder="Add Description"
                      className="input-field resize-none rounded-lg p-4"
                      {...field}
                    /> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="caption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Caption</FormLabel>
                  <FormControl>
                    <TextareaAutosize
                      placeholder="Add Description"
                      className="input-field flex min-h-[60px] w-full rounded-lg border border-none border-input bg-transparent p-4 px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      {...field}
                    />
                    {/* <Textarea
                      placeholder="Add Description"
                      className="input-field resize-none rounded-lg p-4"
                      {...field}
                    /> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button size="lg" type="submit" className="w-full">
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
