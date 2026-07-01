"use client"

import React from "react"
import { useFormStatus } from "react-dom"

export function SubmitButton({
  children,
  variant = "primary",
  className = "",
  "data-testid": dataTestId,
}: {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "transparent" | "danger" | null
  className?: string
  "data-testid"?: string
}) {
  const { pending } = useFormStatus()

  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "bg-[#9865e8] text-white hover:bg-[#7d4fd1] hover:shadow-lg hover:scale-105"
      case "secondary":
        return "bg-gray-200 text-gray-800 hover:bg-gray-300 hover:shadow-md hover:scale-105"
      case "transparent":
        return "bg-transparent text-[#9865e8] border border-[#9865e8] hover:bg-[#9865e8] hover:text-white hover:scale-105"
      case "danger":
        return "bg-red-600 text-white hover:bg-red-700 hover:shadow-lg hover:scale-105"
      default:
        return "bg-[#9865e8] text-white hover:bg-[#7d4fd1] hover:shadow-lg hover:scale-105"
    }
  }

  return (
    <button
      type="submit"
      disabled={pending}
      className={`px-6 py-3 font-semibold rounded-lg transition-all duration-300 ease-in-out
                 ${getVariantClasses()}
                 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
                 disabled:hover:scale-100 ${className}`}
      data-testid={dataTestId}
    >
      {pending ? "İşleniyor..." : children}
    </button>
  )
}
