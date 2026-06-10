"use client";

import { useState } from "react";

import { Rocker, type RockerSide } from "@/components/console";

export const LabRockerDemo = () => {
  const [filter, setFilter] = useState<RockerSide>("a");
  const [units, setUnits] = useState<RockerSide>("b");

  return (
    <>
      <Rocker
        labelA="All"
        labelB="Active"
        value={filter}
        onChange={setFilter}
        ariaLabel="Filter projects"
      />
      <Rocker
        labelA="°C"
        labelB="°F"
        value={units}
        onChange={setUnits}
        ariaLabel="Temperature units"
      />
    </>
  );
};
