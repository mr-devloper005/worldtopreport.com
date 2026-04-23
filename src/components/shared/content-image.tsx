"use client";

import { useMemo, type CSSProperties, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/** Non-photographic surface only (no `<img>`). Props mirror the old image API for drop-in compatibility. */
type ContentImageProps = Omit<HTMLAttributes<HTMLDivElement>, "src" | "alt"> & {
  src?: string;
  alt: string;
  fill?: boolean;
  quality?: number;
  priority?: boolean;
  intrinsicWidth?: number;
  intrinsicHeight?: number;
};

export function ContentImage({
  src: _src,
  alt: _alt,
  fill,
  quality: _quality,
  priority: _priority,
  intrinsicWidth: _intrinsicWidth,
  intrinsicHeight: _intrinsicHeight,
  className,
  style,
  ...props
}: ContentImageProps) {
  const resolvedStyle = useMemo<CSSProperties>(() => {
    if (!fill) return style || {};
    return {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      ...style,
    };
  }, [fill, style]);

  return (
    <div
      role="presentation"
      aria-hidden
      className={cn(
        "bg-gradient-to-br from-muted via-muted/90 to-muted/70",
        className
      )}
      style={resolvedStyle}
      {...props}
    />
  );
}
