import classNames from "classnames";
import type { HTMLAttributes, ReactNode } from "react";
import styles from "./chip.module.scss";

interface ChipProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export function Chip({
  label,
  startIcon,
  endIcon,
  className,
  ...restProps
}: ChipProps) {
  return (
    <div className={classNames(styles.chip, className)} {...restProps}>
      {startIcon}
      <span>{label}</span>
      {endIcon}
    </div>
  );
}
