import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Compass } from "lucide-react";

interface ExploreButtonProps {
  variant?: "default" | "outline" | "glow";
  size?: "default" | "sm" | "lg" | "icon";
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const ExploreButton = ({
  variant = "default",
  size = "default",
  children = "Commencer l'exploration",
  className,
  onClick,
}: ExploreButtonProps) => {
  const baseStyles =
    "relative overflow-hidden group transition-all duration-300";

  const variantStyles = {
    default: cn(
      "bg-gradient-explore hover:bg-gradient-explore-hover",
      "text-primary-foreground font-semibold",
      "shadow-explore hover:shadow-explore-hover",
      "hover:scale-105 active:scale-95",
      "border-0",
      "cursor-pointer"
    ),
    outline: cn(
      "border-2 border-primary bg-background/50 backdrop-blur-sm",
      "text-primary hover:bg-primary hover:text-primary-foreground",
      "hover:shadow-explore hover:scale-105 active:scale-95",
      "font-semibold "
    ),
  };

  return (
    <Button
      size={size}
      onClick={onClick}
      className={cn(baseStyles, variantStyles[variant], className)}
    >
      <span className="relative z-10 flex items-center gap-2">
        {variant === "default" || variant === "glow" ? (
          <Compass className="w-4 h-4 transition-transform group-hover:rotate-90 duration-500" />
        ) : null}
        {children}
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-300" />
      </span>
    </Button>
  );
};
