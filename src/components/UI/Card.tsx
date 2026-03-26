import type { PropsWithChildren } from "react";

type CardProps = PropsWithChildren<{
  className?: string;
}>;

export const Card = ({ children, className = "" }: CardProps) => {
  const classes = ["card", className].filter(Boolean).join(" ");
  return <section className={classes}>{children}</section>;
};
