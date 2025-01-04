import { useState } from "react";
import Image from "next/image";

const BrandLogo = ({ domain, width = 100, height = 100 }) => {
  const [error, setError] = useState(false);
  const clientId = process.env.NEXT_PUBLIC_BRANDFETCH_CLIENT_ID;
  const logoUrl = `https://cdn.brandfetch.io/${domain}?c=${clientId}&w=${width}&h=${height}`;

  const handleError = () => {
    setError(true);
  };

  return (
    <div style={{ width, height, position: "relative" }}>
      {error ? (
        <p>Logo not found</p>
      ) : (
        <Image
          src={logoUrl}
          alt={`${domain} logo`}
          width={width}
          height={height}
          onError={handleError} // Handles broken image links
        />
      )}
    </div>
  );
};

export default BrandLogo;
