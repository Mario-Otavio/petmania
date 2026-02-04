"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-gray-900 group-[.toaster]:border-gray-200 group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-zinc-950 dark:group-[.toaster]:text-zinc-50 dark:group-[.toaster]:border-zinc-800 data-[type=success]:!bg-[#4CAF50] data-[type=success]:!text-white data-[type=success]:!border-[#4CAF50] data-[type=error]:!bg-[#F44336] data-[type=error]:!text-white data-[type=error]:!border-[#F44336] data-[type=info]:!bg-[#2196F3] data-[type=info]:!text-white data-[type=info]:!border-[#2196F3] data-[type=warning]:!bg-[#FB8C00] data-[type=warning]:!text-white data-[type=warning]:!border-[#FB8C00]",
          description: "group-[.toast]:text-gray-500 dark:group-[.toast]:text-zinc-400 group-data-[type=success]:!text-white/90 group-data-[type=error]:!text-white/90 group-data-[type=info]:!text-white/90 group-data-[type=warning]:!text-white/90",
          actionButton:
            "group-[.toast]:bg-indigo-600 group-[.toast]:text-white dark:group-[.toast]:bg-indigo-600 dark:group-[.toast]:text-white group-data-[type=success]:!bg-white group-data-[type=success]:!text-[#4CAF50] group-data-[type=error]:!bg-white group-data-[type=error]:!text-[#F44336] group-data-[type=info]:!bg-white group-data-[type=info]:!text-[#2196F3] group-data-[type=warning]:!bg-white group-data-[type=warning]:!text-[#FB8C00]",
          cancelButton:
            "group-[.toast]:bg-gray-100 group-[.toast]:text-gray-500 dark:group-[.toast]:bg-zinc-800 dark:group-[.toast]:text-zinc-400 group-data-[type=success]:!bg-[#388E3C] group-data-[type=success]:!text-white group-data-[type=error]:!bg-[#D32F2F] group-data-[type=error]:!text-white group-data-[type=info]:!bg-[#1976D2] group-data-[type=info]:!text-white group-data-[type=warning]:!bg-[#F57C00] group-data-[type=warning]:!text-white",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
