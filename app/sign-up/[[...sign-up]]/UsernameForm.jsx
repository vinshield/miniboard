"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function UsernameForm({ onSubmit }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Choose a username</Label>
        <Input
          id="username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
      <Button type="submit" className="w-full">
        Continue
      </Button>
    </form>
  );
}
