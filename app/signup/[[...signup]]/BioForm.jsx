"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function BioForm({ onSubmit }) {
  const [bio, setBio] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically save the bio to your backend
    // For this example, we'll just call onSubmit
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="bio">Tell us about yourself</Label>
        <Textarea
          id="bio"
          placeholder="Enter a short bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
        />
      </div>
      <Button type="submit" className="w-full">
        Complete Sign Up
      </Button>
    </form>
  );
}
