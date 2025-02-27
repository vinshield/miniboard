import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { TextShimmer } from "../ui/text-shimmer";

const CreateMiniboardBtn = () => {
  return (
    <Link href="/signup">
      <Button
        variant="test"
        className="border border-sky-400 text-sm shadow-md"
      >
        <TextShimmer
          className="font-bold [--base-color:#fafafa] [--base-gradient-color:#38bdf8]"
          duration={1.3}
        >
          Create your miniboard
        </TextShimmer>
      </Button>
    </Link>
  );
};

export default CreateMiniboardBtn;
