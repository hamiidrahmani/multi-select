import classnames from "classnames";
import type { ReactNode } from "react";
import { DoneIcon } from "../icons";
import styles from "./multi-select.module.scss";

export type ItemType = {
  label: string;
  id: string;
};
type ListProps = {
  options: ItemType[];
  selectedOptions: ItemType[];
  emptyState: ReactNode;
  onClick: (item: ItemType, selected: boolean) => void;
};
export function List({ options, selectedOptions, emptyState, onClick }: ListProps) {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {!!options.length
          ? options.map(({ id, label }) => {
              const selected = selectedOptions.some((item) => item.id === id);
              return (
                <li
                  role="button"
                  className={classnames(styles.itemContainer, {
                    [styles.selected]: selected,
                  })}
                  key={id}
                  onClick={() => onClick({ id, label }, selected)}
                >
                  {label}
                  {selected && <DoneIcon />}
                </li>
              );
            })
          : emptyState}
      </ul>
    </div>
  );
}
