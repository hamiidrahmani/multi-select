import classnames from "classnames";
import type { InputHTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import styles from "./input.module.scss";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { startIcon, endIcon, className, ...restProps },
  ref
) {
  return (
    <div className={styles.container}>
      {startIcon && <div className={styles.adornment}>{startIcon}</div>}
      <input
        ref={ref}
        className={classnames(styles.input, className, {
          ["pl-0"]: !!startIcon,
          ["pr-0"]: !!endIcon,
        })}
        {...restProps}
      />
      <fieldset className={styles.fieldset} />
      {endIcon && <div className={styles.adornment}>{endIcon}</div>}
    </div>
  );
});
