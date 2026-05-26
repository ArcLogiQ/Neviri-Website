"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home } from "lucide-react";

// Matches both dashed and undashed 32-char hex UUIDs (Nova / Cinder / Neutron use these).
const UUID_RE =
  /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i;

// Convert "virtual-machines" → "Virtual machines" — capitalize first letter
// and replace dashes with spaces so segments read like prose.
const humanize = (segment) =>
  segment
    .replace(/-/g, " ")
    .replace(/^./, (c) => c.toUpperCase());

export default function Breadcrumb() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  // Hide raw UUID segments — the page itself displays the resource's name
  // in its header, so the breadcrumb doesn't need to repeat the opaque id.
  const visiblePaths = paths.filter((segment) => !UUID_RE.test(segment));

  return (
    <div className="text-sm text-gray-400 flex items-center space-x-2">
      {visiblePaths.map((segment, index) => {
        // Build href from the FULL path up to this visible segment
        const fullIndex = paths.indexOf(segment);
        const href = "/" + paths.slice(0, fullIndex + 1).join("/");
        const label = humanize(segment);
        const isLast = index === visiblePaths.length - 1;

        return (
          <div key={`${index}-${segment}`} className="flex items-center space-x-2">
            {isLast ? (
              <span className="text-gray-500 font-semibold">{label}</span>
            ) : (
              <>
                <Link href={href} className="hover:text-gray-600 font-medium">
                  {label}
                </Link>
                <span className="text-gray-500">{">"}</span>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
