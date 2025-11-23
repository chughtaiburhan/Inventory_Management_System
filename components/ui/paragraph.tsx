import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const paragraphVariants = cva(
    "text-foreground",
    {
        variants: {
            variant: {
                default: "text-base",
                muted: "text-muted-foreground",
                lead: "text-xl text-muted-foreground",
                large: "text-lg font-semibold",
                small: "text-sm font-medium leading-none",
                error: "text-destructive font-medium",
            },
            size: {
                default: "",
                sm: "text-sm",
                lg: "text-lg",
            },
            weight: {
                default: "font-normal",
                medium: "font-medium",
                semibold: "font-semibold",
                bold: "font-bold",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
            weight: "default",
        },
    }
)

export interface ParagraphProps
    extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants> {
    asChild?: boolean
    as?: React.ElementType
}

const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
    ({ className, variant, size, weight, as: Component = "p", ...props }, ref) => {
        return (
            <Component
                ref={ref}
                className={cn(paragraphVariants({ variant, size, weight, className }))}
                {...props}
            />
        )
    }
)
Paragraph.displayName = "Paragraph"

export { Paragraph, paragraphVariants }
