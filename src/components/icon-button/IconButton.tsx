import classNames from "classnames";
import type { ButtonHTMLAttributes } from "react";
import styles from "./icon-button.module.scss";

export function IconButton({
  className,
  ...restProps
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={classNames(styles.iconButton, className)}
      {...restProps}
    />
  );
}
