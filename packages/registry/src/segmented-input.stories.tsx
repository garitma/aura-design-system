"use client";

import * as React from "react";

import { Button } from "../registry/default/components/ui/Button";
import {
  SegmentedInput,
  SegmentedInputItem,
} from "../registry/default/components/ui/SegmentedInput";

export const Default = () => {
  const [values, setValues] = React.useState({
    first: "",
    second: "",
    third: "",
  });

  const onValueChange = React.useCallback(
    (field: keyof typeof values) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues((prev) => ({
          ...prev,
          [field]: event.target.value,
        }));
      },
    [],
  );

  return (
    <div className="flex w-full max-w-sm flex-col gap-1">
      <label className="text-sm font-medium text-gray-12">
        Enter your details
      </label>
      <SegmentedInput className="w-full" aria-label="Name segments">
        <SegmentedInputItem
          placeholder="First"
          value={values.first}
          onChange={onValueChange("first")}
          aria-label="First name"
        />
        <SegmentedInputItem
          placeholder="Second"
          value={values.second}
          onChange={onValueChange("second")}
          aria-label="Middle name"
        />
        <SegmentedInputItem
          placeholder="Third"
          value={values.third}
          onChange={onValueChange("third")}
          aria-label="Last name"
        />
      </SegmentedInput>
    </div>
  );
};

export const FormInput = () => {
  const [phoneNumber, setPhoneNumber] = React.useState({
    countryCode: "+1",
    areaCode: "",
    number: "",
  });

  const onSubmit = React.useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
    },
    [],
  );

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-sm flex-col gap-2">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-12">Phone Number</label>
        <SegmentedInput
          className="w-full"
          aria-label="Phone number input"
        >
          <SegmentedInputItem
            placeholder="+1"
            value={phoneNumber.countryCode}
            onChange={(event) =>
              setPhoneNumber((prev) => ({
                ...prev,
                countryCode: event.target.value,
              }))
            }
            className="w-5 flex-none"
            aria-label="Country code"
          />
          <SegmentedInputItem
            placeholder="555"
            value={phoneNumber.areaCode}
            onChange={(event) =>
              setPhoneNumber((prev) => ({
                ...prev,
                areaCode: event.target.value,
              }))
            }
            className="w-6 flex-none"
            maxLength={3}
            inputMode="numeric"
            pattern="[0-9]*"
            aria-label="Area code"
          />
          <SegmentedInputItem
            placeholder="1234567"
            value={phoneNumber.number}
            onChange={(event) =>
              setPhoneNumber((prev) => ({
                ...prev,
                number: event.target.value,
              }))
            }
            className="flex-1"
            maxLength={7}
            inputMode="numeric"
            pattern="[0-9]*"
            aria-label="Phone number"
          />
        </SegmentedInput>
      </div>
      <Button type="submit" size="sm">
        Submit
      </Button>
    </form>
  );
};

export const RgbColor = () => {
  const [rgb, setRgb] = React.useState({
    r: 255,
    g: 128,
    b: 0,
  });

  const onChannelChange = React.useCallback(
    (channel: keyof typeof rgb) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number.parseInt(event.target.value, 10);
        if (!Number.isNaN(value) && value >= 0 && value <= 255) {
          setRgb((prev) => ({
            ...prev,
            [channel]: value,
          }));
        }
      },
    [],
  );

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-12">RGB Color</label>
      <div className="flex items-center gap-1">
        <SegmentedInput className="w-fit" aria-label="RGB color input">
          <SegmentedInputItem
            placeholder="255"
            value={rgb.r}
            onChange={onChannelChange("r")}
            className="w-5 flex-none"
            inputMode="numeric"
            pattern="[0-9]*"
            min={0}
            max={255}
            aria-label="Red channel (0-255)"
          />
          <SegmentedInputItem
            placeholder="128"
            value={rgb.g}
            onChange={onChannelChange("g")}
            className="w-5 flex-none"
            inputMode="numeric"
            pattern="[0-9]*"
            min={0}
            max={255}
            aria-label="Green channel (0-255)"
          />
          <SegmentedInputItem
            placeholder="0"
            value={rgb.b}
            onChange={onChannelChange("b")}
            className="w-5 flex-none"
            inputMode="numeric"
            pattern="[0-9]*"
            min={0}
            max={255}
            aria-label="Blue channel (0-255)"
          />
        </SegmentedInput>
        <span
          className="size-3 rounded-sm border border-gray-6"
          style={{ backgroundColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` }}
          aria-hidden
        />
      </div>
    </div>
  );
};

export const Vertical = () => {
  const [address, setAddress] = React.useState({
    street: "",
    city: "",
    zipCode: "",
  });

  const onFieldChange = React.useCallback(
    (field: keyof typeof address) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress((prev) => ({
          ...prev,
          [field]: event.target.value,
        }));
      },
    [],
  );

  return (
    <div className="flex w-full max-w-sm flex-col gap-1">
      <label className="text-sm font-medium text-gray-12">
        Mailing Address
      </label>
      <SegmentedInput
        aria-label="Mailing address input"
        className="w-full"
        orientation="vertical"
      >
        <SegmentedInputItem
          aria-label="Street address"
          placeholder="Street Address"
          value={address.street}
          onChange={onFieldChange("street")}
        />
        <SegmentedInputItem
          aria-label="City"
          placeholder="City"
          value={address.city}
          onChange={onFieldChange("city")}
        />
        <SegmentedInputItem
          aria-label="ZIP code"
          placeholder="ZIP Code"
          value={address.zipCode}
          onChange={onFieldChange("zipCode")}
        />
      </SegmentedInput>
      <p className="text-xs text-gray-11">
        Tab between fields to move through the vertical segments.
      </p>
    </div>
  );
};

export const Sizes = () => (
  <div className="flex w-full max-w-sm flex-col gap-2">
    <SegmentedInput size="sm" className="w-full" aria-label="Small size">
      <SegmentedInputItem placeholder="Small" aria-label="Small first" />
      <SegmentedInputItem placeholder="Small" aria-label="Small second" />
    </SegmentedInput>
    <SegmentedInput size="default" className="w-full" aria-label="Default size">
      <SegmentedInputItem placeholder="Default" aria-label="Default first" />
      <SegmentedInputItem placeholder="Default" aria-label="Default second" />
    </SegmentedInput>
    <SegmentedInput size="lg" className="w-full" aria-label="Large size">
      <SegmentedInputItem placeholder="Large" aria-label="Large first" />
      <SegmentedInputItem placeholder="Large" aria-label="Large second" />
    </SegmentedInput>
  </div>
);

export const Invalid = () => (
  <div className="flex w-full max-w-sm flex-col gap-1">
    <label className="text-sm font-medium text-gray-12">Invalid state</label>
    <SegmentedInput invalid className="w-full" aria-label="Invalid segments">
      <SegmentedInputItem defaultValue="12" aria-label="Part one" />
      <SegmentedInputItem defaultValue="ab" aria-label="Part two" />
      <SegmentedInputItem defaultValue="" placeholder="Required" aria-label="Part three" />
    </SegmentedInput>
  </div>
);
