"use client";

import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

import { formatDateFromJSDate, formatDateTime } from "@/lib/utils";
import { createEvent } from "@/lib/actions/event.actions";

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
import { CaptionSkeleton } from "../ui/skeletons";

// TO-DO:
// Create caption
// Create form validation flow on front
// Save posts

export default function EventForm({ userId, type, event, eventId }) {
  const [files, setFiles] = useState([]);
  const [extractedDetails, setExtractedDetails] = useState(null);
  const [isOnline, setisOnline] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [allDayEvent, setAllDayEvent] = useState(false);
  const [endDateTimeProvided, setEndDateTimeProvided] = useState();
  const [showCaptionField, setShowCaptionField] = useState(false);
  const [copied, setCopied] = useState(false);
  const [gettingPosterInfo, setGettingPosterInfo] = useState(false);

  const captionRef = useRef(null);

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

  const {
    setValue,
    reset,
    getValues,
    formState: { isSubmitting },
  } = form;

  // 2. Define a submit handler.
  const onSubmit = async (values) => {
    try {
      const newEvent = await createEvent({
        event: { ...values },
        path: "/profile",
      });

      if (newEvent) {
        const { publicId: eventId } = newEvent;
        const { isAllDay: allDay } = values;
        const caption = extractedDetails.caption;
        const { startDateTime, endDateTime, location } = values;
        const captionDate = formatDateTime(startDateTime).dateOnly;

        const newCaption = `${caption}\n\n*_Set a reminder stress-free_* 👇🏽\nhttps://miniboard-flax.vercel.app/e/${eventId}/add\n\n📅 _${captionDate}_\n🕑 _${
          allDay
            ? "All day"
            : `${formatDateTime(startDateTime).timeOnly}${
                endDateTime ? ` - ${formatDateTime(endDateTime).timeOnly}` : ""
              }`
        }_\n📍 _${location}_`;

        setValue("caption", newCaption);
        setShowCaptionField(true);
      }
    } catch (error) {
      console.log(error);
    }
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

  const resetForm = () => {
    reset();
    const formText = document.getElementById("form-text");

    // Remove visible classes
    formText.classList.remove("opacity-100");
    formText.classList.add("opacity-0");

    setTimeout(() => {
      formText.classList.remove("h-full");
    }, 500);

    setTimeout(() => {
      formText.classList.add(
        "h-0",
        "transition-all",
        "duration-500",
        "hidden",
        "opacity-0",
      );
    }, 700);

    setShowForm(false);
    setShowCaptionField(false);
    setAllDayEvent(false);
  };

  const copyToClipboard = () => {
    if (captionRef.current) {
      const text = captionRef.current.value;
      navigator.clipboard.writeText(text);
      setCopied(true);
    }

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  useEffect(() => {
    // Put the details extracted from the poster into the input fields
    if (extractedDetails) {
      // Set endDateTime to startDateTime if full day event
      if (extractedDetails.isAllDay) {
        extractedDetails.endDateTime = extractedDetails.startDateTime;
      }

      // Add one hour to startDateTime if it is not a full day event and endDateTime was not provided
      if (!extractedDetails.isAllDay && !extractedDetails.endDateTime) {
        if (extractedDetails.startDateTime) {
          const date = new Date(extractedDetails.startDateTime);
          if (date instanceof Date) {
            date.setHours(date.getHours() + 1);
            extractedDetails.endDateTime = date.toISOString();
          }
        }
      }
      Object.entries(extractedDetails).forEach(([key, value]) => {
        if (key && (key === "startDateTime" || key === "endDateTime")) {
          if (value) {
            // Convert date to JSDate
            value = new Date(value);
          }
        }
        if (key === "endDateTime" && !value) {
          setEndDateTimeProvided(false);
        }
        if (key === "isOnline") {
          if (value && value === true) {
            setisOnline(true);
          }
        }
        if (key === "isAllDay") {
          if (value && value === true) {
            setAllDayEvent(true);
          }
        }
        setValue(key, value);
      });
      // scroll to the form and display it
      showFormAndScroll();
    }
  }, [extractedDetails]);

  useEffect(() => {
    if (allDayEvent) {
      let date = getValues("startDateTime");
      date.setHours(0, 0, 0, 0);
      setValue("startDateTime", date);
      setValue("endDateTime", date);
      setValue("isAllDay", allDayEvent);
    }
  }, [allDayEvent]);

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
                <div
                  onClick={() => {
                    field.value && resetForm();
                  }}
                >
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                    setExtractedDetails={setExtractedDetails}
                    showForm={showForm}
                    gettingPosterInfo={gettingPosterInfo}
                    setGettingPosterInfo={setGettingPosterInfo}
                  />
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button
            type="button"
            variant="ghost"
            className={`${showForm ? "hidden" : "visible"}`}
            disabled={gettingPosterInfo}
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
            <div>
              <FormField
                control={form.control}
                name="isAllDay"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between rounded-t-lg bg-secondary px-4 py-4">
                      <FormLabel className="text-xs text-muted-foreground">
                        All day event
                      </FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            setAllDayEvent(checked);
                            field.onChange(checked);
                          }}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <div className="divide flex flex-col divide-y-2 divide-dotted rounded-b-lg bg-secondary px-8">
                <FormField
                  control={form.control}
                  name="startDateTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex h-[54px] items-center justify-between overflow-hidden py-4">
                          <p className="w-1/6 whitespace-nowrap text-sm text-muted-foreground">
                            Start
                          </p>
                          <div>
                            <DatePicker
                              selected={field.value}
                              onChange={(date) => field.onChange(date)}
                              showTimeSelect={!allDayEvent}
                              timeInputLabel="Time"
                              dateFormat={`MMM d, yyyy${!allDayEvent ? " | h:mm aa" : ""}`}
                              wrapperClassName="datePicker text-[15px] margin-auto"
                              placeholderText="-- -- ----"
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
                              selected={
                                allDayEvent
                                  ? form.getValues("startDateTime")
                                  : field.value
                              } // Use startDateTime if isAllDay is true
                              disabled={allDayEvent}
                              onChange={(date) => field.onChange(date)}
                              showTimeSelect={!allDayEvent}
                              timeInputLabel="Time"
                              dateFormat={`MMM d, yyyy${!allDayEvent ? " | h:mm aa" : ""}`}
                              wrapperClassName="datePicker text-[15px]"
                              placeholderText="-- -- ----"
                            />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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

            {showCaptionField && (
              <div>
                {isSubmitting ? (
                  <CaptionSkeleton />
                ) : (
                  <FormField
                    control={form.control}
                    name="caption"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Caption</FormLabel>
                        <FormControl ref={captionRef}>
                          <TextareaAutosize
                            className="input-field flex min-h-[60px] w-full rounded-lg border border-none border-input bg-transparent p-4 px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Share this caption with your poster to promote your
                          event. It includes a link that allows users to easily
                          add the event to their calendar, along with a reminder
                          automatically set for 30 minutes before the event
                          starts.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            )}

            <Button
              size="lg"
              type="submit"
              className={`w-full ${showCaptionField ? "hidden" : ""}`}
            >
              Create caption
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="lg"
              onClick={resetForm}
              className={`w-full ${showCaptionField ? "hidden" : ""}`}
            >
              Start over 🔃
            </Button>

            <Button
              type="button"
              onClick={copyToClipboard}
              size="lg"
              className={`w-full ${!showCaptionField ? "hidden" : ""}`}
            >
              {copied ? "Copied!" : "Copy caption"}
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="lg"
              onClick={resetForm}
              className={`w-full shadow-lg ${!showCaptionField ? "hidden" : ""}`}
            >
              Create new event 📆
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
