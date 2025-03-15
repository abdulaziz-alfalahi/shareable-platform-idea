
import React from "react";
import { cn } from "@/lib/utils";

type PatternType = "arabesque" | "geometric" | "mashrabiya" | "palm" | "dune";
type PatternSize = "sm" | "md" | "lg";
type PatternPosition = "corner" | "border" | "background" | "divider";

interface UaeGeometricPatternProps {
  type?: PatternType;
  size?: PatternSize;
  position?: PatternPosition;
  color?: string;
  className?: string;
  opacity?: number;
}

export const UaeGeometricPattern: React.FC<UaeGeometricPatternProps> = ({
  type = "geometric",
  size = "md",
  position = "corner",
  color,
  className,
  opacity = 0.1
}) => {
  // Size classes
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-36 h-36"
  };

  // Position classes
  const positionClasses = {
    corner: "absolute -z-10",
    border: "absolute inset-0 -z-10",
    background: "absolute inset-0 -z-10",
    divider: "w-full h-6 my-4 -z-10"
  };

  // Get pattern image based on type
  const getPatternStyle = () => {
    switch (type) {
      case "arabesque":
        return {
          backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"0 0 40 40\"><path d=\"M20 0C20 11.05 11.05 20 0 20C11.05 20 20 28.95 20 40C20 28.95 28.95 20 40 20C28.95 20 20 11.05 20 0Z\" fill=\"%23D4A373\" opacity=\"0.2\"/></svg>')",
        };
      case "geometric":
        return {
          backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\"><path d=\"M10 0L20 10L10 20L0 10L10 0Z\" fill=\"%232C4A2E\" opacity=\"0.15\"/></svg>')",
        };
      case "mashrabiya":
        return {
          backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\"><rect x=\"0\" y=\"0\" width=\"8\" height=\"8\" fill=\"%238B5E34\" opacity=\"0.1\"/><rect x=\"12\" y=\"0\" width=\"8\" height=\"8\" fill=\"%238B5E34\" opacity=\"0.1\"/><rect x=\"0\" y=\"12\" width=\"8\" height=\"8\" fill=\"%238B5E34\" opacity=\"0.1\"/><rect x=\"12\" y=\"12\" width=\"8\" height=\"8\" fill=\"%238B5E34\" opacity=\"0.1\"/></svg>')",
        };
      case "palm":
        return {
          backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"40\" height=\"40\" viewBox=\"0 0 40 40\"><path d=\"M20 0 L20 40 M10 5 L30 5 M5 15 L35 15 M10 25 L30 25 M15 35 L25 35\" stroke=\"%232C4A2E\" stroke-width=\"1\" opacity=\"0.15\"/></svg>')",
        };
      case "dune":
        return {
          backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"20\" viewBox=\"0 0 100 20\"><path d=\"M0 20 C20 0, 40 20, 60 0, 80 20, 100 0, 100 20, 0 20 Z\" fill=\"%23D4A373\" opacity=\"0.1\"/></svg>')",
        };
      default:
        return {
          backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\"><path d=\"M10 0L20 10L10 20L0 10L10 0Z\" fill=\"%232C4A2E\" opacity=\"0.15\"/></svg>')",
        };
    }
  };

  // Set corner positions
  const getCornerPositionClass = () => {
    if (position !== "corner") return "";
    
    return "top-0 left-0 before:content-[''] before:absolute before:top-0 before:right-0 " + 
           "before:w-full before:h-full before:transform before:rotate-90 before:opacity-50 " +
           "after:content-[''] after:absolute after:bottom-0 after:right-0 " + 
           "after:w-full after:h-full after:transform after:rotate-180 after:opacity-50";
  };

  return (
    <div 
      className={cn(
        "pattern-element bg-repeat pointer-events-none",
        sizeClasses[size],
        positionClasses[position],
        getCornerPositionClass(),
        className
      )}
      style={{
        ...getPatternStyle(),
        opacity
      }}
    ></div>
  );
};

export default UaeGeometricPattern;
