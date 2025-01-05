"use client";
import type { ItemType } from "@/components";
import { MultiSelect } from "@/components";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./home.module.scss";

const DEFAULT_OPTIONS_VALUES = [
  { label: "Education 🎓", id: uuidv4() },
  { label: "Yeah Science!", id: uuidv4() },
  { label: "Art 🎭", id: uuidv4() },
  { label: "Sport ⚽️", id: uuidv4() },
  { label: "Games 🎮", id: uuidv4() },
  { label: "Health 🏥", id: uuidv4() },
];

export default function Home() {
  const [value, setValue] = useState<ItemType[]>([]);

  return (
    <div className={styles.container}>
      <MultiSelect
        className={styles.multiSelect}
        value={value}
        onChange={(options) => setValue(options)}
        options={DEFAULT_OPTIONS_VALUES}
      />
    </div>
  );
}
