/* eslint-disable react/prop-types */
import { cn } from "@/lib/utils"

export const Card2 = ({className, ...props}) => {
  return <div className={cn("flex flex-col gap-4 bg-white border rounded-xl shadow-sm p-5", className)} {...props}></div>
}