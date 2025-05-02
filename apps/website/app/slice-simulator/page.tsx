import {
  SliceSimulator,
  SliceSimulatorParams,
  getSlices,
} from "@slicemachine/adapter-next/simulator";
import { SliceZone } from "@prismicio/react";

import UmamiDisable from "@/components/UmamiDisable";
import { components } from "../../slices";

export default async function SliceSimulatorPage({
  searchParams,
}: SliceSimulatorParams) {
  const { state } = await searchParams;
  const slices = getSlices(state);

  return (
    <UmamiDisable>
      <SliceSimulator>
        <SliceZone slices={slices} components={components} />
      </SliceSimulator>
    </UmamiDisable>
  );
}
