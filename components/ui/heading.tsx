import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const headingVariants = cva(
    "text-foreground font-bold tracking-tight",
    {
        variants: {
            variant: {
                h1: "text-4xl lg:text-5xl",
                h2: "text-3xl lg:text-4xl",
                h3: "text-2xl lg:text-3xl",
                h4: "text-xl lg:text-2xl",
                h5: "text-lg lg:text-xl",
                h6: "text-base lg:text-lg",
            },
            weight: {
                default: "font-bold",
                medium: "font-medium",
                semibold: "font-semibold",
                extrabold: "font-extrabold",
            },
            align: {
                left: "text-left",
                center: "text-center",
                right: "text-right",
            }
        },
        defaultVariants: {
            variant: "h1",
            weight: "default",
            align: "left",
        },
    }
)

export interface HeadingProps
    extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
    asChild?: boolean
    as?: React.ElementType
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
    ({ className, variant, weight, align, as, ...props }, ref) => {
        const Component = as || variant || "h1"
        return (
            <Component
                ref={ref}
                className={cn(headingVariants({ variant, weight, align, className }))}
                {...props}
            />
        )
    }
)
Heading.displayName = "Heading"

export { Heading, headingVariants }
