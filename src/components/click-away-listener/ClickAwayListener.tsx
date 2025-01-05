import classNames from "classnames";
import type { PropsWithChildren } from "react";
import { useEffect, useRef } from "react";

type ClickAwayListenerProps = {
  onClickAway: () => void;
  className?: string;
};

export function ClickAwayListener({
  children,
  onClickAway,
  className,
}: PropsWithChildren<ClickAwayListenerProps>) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickAway();
      }
    }
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [onClickAway]);

  return (
    <div className={classNames("full-width", className)} ref={ref}>
      {children}
    </div>
  );
}
