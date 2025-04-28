"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("w-full overflow-hidden", className)}
    {...props}
  />
))
Carousel.displayName = "Carousel"

const CarouselViewport = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("w-full overflow-hidden", className)}
    {...props}
  />
))
CarouselViewport.displayName = "CarouselViewport"

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex will-change-transform",
      className
    )}
    {...props}
  />
))
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("w-full flex-[0_0_auto]", className)}
    {...props}
  />
))
CarouselItem.displayName = "CarouselItem"

const CarouselNext = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ className, ...props }, ref) => (
  <Button
    variant="ghost"
    size="sm"
    className={cn(
      "absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full",
      className
    )}
    {...props}
    ref={ref}
  >
    <ChevronRight className="h-4 w-4" />
    <span className="sr-only">Next</span>
  </Button>
))
CarouselNext.displayName = "CarouselNext"

const CarouselPrevious = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ className, ...props }, ref) => (
  <Button
    variant="ghost"
    size="sm"
    className={cn(
      "absolute left-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full",
      className
    )}
    {...props}
    ref={ref}
  >
    <ChevronLeft className="h-4 w-4" />
    <span className="sr-only">Previous</span>
  </Button>
))
CarouselPrevious.displayName = "CarouselPrevious"

export {
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Carousel,
  CarouselViewport,
}
