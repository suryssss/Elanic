import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-12 w-full rounded-md px-3 py-2 text-base md:text-sm",
        "bg-[#5a4b6f] text-white placeholder:text-gray-400",
        "shadow-sm outline-none transition-colors",
        "focus-visible:ring-2 focus-visible:ring-[#6D54B5]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Input }
