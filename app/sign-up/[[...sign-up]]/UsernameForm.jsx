"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle, Check, X } from "lucide-react";

import { checkUsernameAvailability } from "@/lib/actions/clerk.actions";

export function UsernameForm({ onSubmit }) {
  const [isChecking, setIsChecking] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const placeholder = "your-username";
  const inputRef = useRef(null);
  const measureRef = useRef(null);

  useEffect(() => {
    adjustInputWidth();
  }, [username]);

  const adjustInputWidth = () => {
    if (measureRef.current && inputRef.current) {
      const textWidth = measureRef.current.offsetWidth;
      const minWidth = parseInt(
        getComputedStyle(measureRef.current).minWidth || "0",
      );
      inputRef.current.style.width = `${Math.max(minWidth, textWidth)}px`;
    }
  };

  const handleInputChange = (e) => {
    const newUsername = e.target.value
      .toLowerCase()
      .replace(/[^a-z0-9\s-_]/g, "")
      .replace(/\s+/g, "-")
      .trim();
    setUsername(newUsername);
    setError("");
    setUsernameAvailable(null);

    if (newUsername.length >= 3) {
      debounceCheckUsername(newUsername);
    } else {
      setIsChecking(false);
    }
  };

  const checkUsername = useCallback(async (username) => {
    if (username.length < 3) {
      setUsernameAvailable(null);
      setIsChecking(false);
      return;
    }

    setIsChecking(true);
    try {
      const isAvailable = await checkUsernameAvailability(username);
      setUsernameAvailable(isAvailable);
    } catch (error) {
      console.error("Error checking username:", error);
      setError(
        "An error occurred while checking username availability. Please check your network connection",
      );

      setUsernameAvailable(null);
    } finally {
      setIsChecking(false);
    }
  }, []);

  const debounceCheckUsername = useCallback(
    debounce((username) => checkUsername(username), 300),
    [checkUsername],
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.length < 3) {
      setError("Username must be at least 3 characters long");
      return;
    }

    if (usernameAvailable) {
      onSubmit(username);
    } else {
      setError("Please choose an available username");
    }
  };

  return (
    <div className="flex h-[60vh] flex-col justify-center">
      <form onSubmit={handleSubmit} className="space-y-3">
        <Label
          htmlFor="username"
          className="leading-12 mb-20 block text-3xl font-semibold tracking-tighter md:text-4xl"
        >
          First, create your unique link
        </Label>
        <div className="relative flex items-center justify-between overflow-hidden rounded-lg bg-secondary px-4 py-2">
          <div className="flex items-center">
            <Input
              ref={inputRef}
              className="input-field m-0 min-w-[20px] p-0 text-base placeholder:text-[#a8a8a8]"
              id="username"
              type="text"
              placeholder={placeholder}
              value={username}
              onChange={handleInputChange}
              autoFocus
            />
            <span
              ref={measureRef}
              className="pointer-events-none absolute left-4 inline-block text-base opacity-0"
              aria-hidden="true"
            >
              {username || placeholder}
            </span>
            <p className="ml-1 text-[#6b6b6b]">.miniboard.site</p>
          </div>
          {isChecking && (
            <LoaderCircle className="animate-spin text-blue-500" />
          )}
          {!isChecking &&
            username.length >= 3 &&
            usernameAvailable === true && <Check className="text-green-400" />}
          {!isChecking && usernameAvailable === false && (
            <X className="text-red-400" />
          )}
        </div>

        {error && (
          <div className="inline-block rounded-sm bg-red-100 p-3">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}

        {/* {!error && username.length >= 3 && usernameAvailable === true && (
          <p className="text-sm text-green-500">This username is available</p>
        )} */}
        {!error && username.length >= 3 && usernameAvailable === false && (
          <div className="inline-block rounded-sm bg-red-100 p-3">
            <p className="text-sm text-red-500">
              It seems this username is already taken. Try another one
            </p>
          </div>
        )}

        <div className="flex">
          <Button
            size="lg"
            type="submit"
            variant="outline"
            className="w-2/5 px-4"
            disabled={!usernameAvailable || isChecking || username.length < 3}
          >
            Claim my link!
          </Button>
        </div>
      </form>
    </div>
  );
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
