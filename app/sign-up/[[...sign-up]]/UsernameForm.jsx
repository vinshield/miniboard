"use client";

import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function UsernameForm({ onSubmit }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const placeholder = "your-username";
  const [inputWidth, setInputWidth] = useState(0);
  const spanRef = useRef();
  const inputRef = useRef(null);
  const measureRef = useRef(null);

  useEffect(() => {
    adjustInputWidth();
  }, []);

  useEffect(() => {
    adjustInputWidth();
  }, [username]);

  const adjustInputWidth = () => {
    if (measureRef.current && inputRef.current) {
      const textWidth = measureRef.current.offsetWidth;
      const minWidth = parseInt(
        measureRef.current.dataset.placeholderWidth || "0",
      );
      inputRef.current.style.width = `${Math.max(minWidth, textWidth)}px`;
    }
  };

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  useEffect(() => {
    if (spanRef.current) {
      setInputWidth(spanRef.current.offsetWidth);
    }
  }, [placeholder]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.length < 3) {
      setError("Username must be at least 3 characters long");
      return;
    }
    // Here you would typically check if the username is available
    // For this example, we'll just submit it
    onSubmit(username);
  };

  return (
    <div className="flex h-[60vh] flex-col justify-center">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Label
          htmlFor="username"
          className="leading-12 mb-14 block text-2xl font-semibold tracking-tighter md:text-4xl"
        >
          First, choose your unique link
        </Label>
        <div className="relative flex items-center overflow-hidden rounded-lg bg-secondary p-2 pl-4">
          <Input
            ref={inputRef}
            className="input-field m-0 min-w-[20px] p-0 text-base placeholder:text-[#a8a8a8]"
            id="username"
            type="text"
            placeholder="your-username"
            value={username}
            onChange={handleInputChange}
            autoFocus
          />
          <span
            ref={measureRef}
            className="pointer-events-none absolute left-4 inline-block text-base opacity-0"
            aria-hidden="true"
            data-placeholder-width="0"
          >
            {username || "your-username"}
          </span>

          <p className="ml-1 text-[#6b6b6b]">.miniboard.site</p>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" variant="outline" className="w-full">
          Continue
        </Button>
      </form>
    </div>
  );
}
