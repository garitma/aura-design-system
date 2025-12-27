import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectIcon,
  SelectPortal,
  SelectContent,
  SelectViewport,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
  SelectArrow,
} from "../registry/default/components/ui/Select";
import { Label } from "../registry/default/components/ui/Label";

export const Default = () => {
  const [value, setValue] = useState("apple");

  return (
    <div className="space-y-1">
      <Label>Choose a fruit</Label>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select a fruit..." />
          <SelectIcon />
        </SelectTrigger>
        <SelectPortal>
          <SelectContent>
            <SelectScrollUpButton />
            <SelectViewport>
              <SelectItem value="apple">
                <SelectItemText>Apple</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
              <SelectItem value="banana">
                <SelectItemText>Banana</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
              <SelectItem value="orange">
                <SelectItemText>Orange</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
              <SelectItem value="grape">
                <SelectItemText>Grape</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
              <SelectItem value="mango">
                <SelectItemText>Mango</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
            </SelectViewport>
            <SelectScrollDownButton />
            <SelectArrow />
          </SelectContent>
        </SelectPortal>
      </Select>
    </div>
  );
};

export const WithDefaultValue = () => {
  return (
    <div className="space-y-1">
      <Label>Choose a fruit</Label>
      <Select defaultValue="banana">
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select a fruit..." />
          <SelectIcon />
        </SelectTrigger>
        <SelectPortal>
          <SelectContent>
            <SelectViewport>
              <SelectItem value="apple">
                <SelectItemText>Apple</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
              <SelectItem value="banana">
                <SelectItemText>Banana</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
              <SelectItem value="orange">
                <SelectItemText>Orange</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
              <SelectItem value="grape">
                <SelectItemText>Grape</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
            </SelectViewport>
          </SelectContent>
        </SelectPortal>
      </Select>
    </div>
  );
};

export const WithGroups = () => {
  const [value, setValue] = useState("us");

  return (
    <div className="space-y-1">
      <Label>Choose a country</Label>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select a country..." />
          <SelectIcon />
        </SelectTrigger>
        <SelectPortal>
          <SelectContent>
            <SelectViewport>
              <SelectGroup>
                <SelectLabel>Americas</SelectLabel>
                <SelectItem value="us">
                  <SelectItemText>United States</SelectItemText>
                  <SelectItemIndicator />
                </SelectItem>
                <SelectItem value="ca">
                  <SelectItemText>Canada</SelectItemText>
                  <SelectItemIndicator />
                </SelectItem>
                <SelectItem value="mx">
                  <SelectItemText>Mexico</SelectItemText>
                  <SelectItemIndicator />
                </SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Europe</SelectLabel>
                <SelectItem value="uk">
                  <SelectItemText>United Kingdom</SelectItemText>
                  <SelectItemIndicator />
                </SelectItem>
                <SelectItem value="fr">
                  <SelectItemText>France</SelectItemText>
                  <SelectItemIndicator />
                </SelectItem>
                <SelectItem value="de">
                  <SelectItemText>Germany</SelectItemText>
                  <SelectItemIndicator />
                </SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Asia</SelectLabel>
                <SelectItem value="jp">
                  <SelectItemText>Japan</SelectItemText>
                  <SelectItemIndicator />
                </SelectItem>
                <SelectItem value="cn">
                  <SelectItemText>China</SelectItemText>
                  <SelectItemIndicator />
                </SelectItem>
                <SelectItem value="kr">
                  <SelectItemText>South Korea</SelectItemText>
                  <SelectItemIndicator />
                </SelectItem>
              </SelectGroup>
            </SelectViewport>
          </SelectContent>
        </SelectPortal>
      </Select>
    </div>
  );
};

export const WithDisabledItems = () => {
  const [value, setValue] = useState("apple");

  return (
    <div className="space-y-1">
      <Label>Choose a fruit</Label>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select a fruit..." />
          <SelectIcon />
        </SelectTrigger>
        <SelectPortal>
          <SelectContent>
            <SelectViewport>
              <SelectItem value="apple">
                <SelectItemText>Apple</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
              <SelectItem value="banana" disabled>
                <SelectItemText>Banana (disabled)</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
              <SelectItem value="orange">
                <SelectItemText>Orange</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
              <SelectItem value="grape" disabled>
                <SelectItemText>Grape (disabled)</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
              <SelectItem value="mango">
                <SelectItemText>Mango</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
            </SelectViewport>
          </SelectContent>
        </SelectPortal>
      </Select>
    </div>
  );
};

export const Disabled = () => {
  return (
    <div className="space-y-1">
      <Label>Choose a fruit (disabled)</Label>
      <Select disabled>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select a fruit..." />
          <SelectIcon />
        </SelectTrigger>
        <SelectPortal>
          <SelectContent>
            <SelectViewport>
              <SelectItem value="apple">
                <SelectItemText>Apple</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
              <SelectItem value="banana">
                <SelectItemText>Banana</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
              <SelectItem value="orange">
                <SelectItemText>Orange</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
            </SelectViewport>
          </SelectContent>
        </SelectPortal>
      </Select>
    </div>
  );
};

export const WithLongList = () => {
  const [value, setValue] = useState("apple");

  const fruits = [
    "Apple",
    "Banana",
    "Orange",
    "Pineapple",
    "Grape",
    "Mango",
    "Strawberry",
    "Blueberry",
    "Raspberry",
    "Blackberry",
    "Cherry",
    "Peach",
    "Pear",
    "Plum",
    "Kiwi",
    "Watermelon",
    "Cantaloupe",
    "Honeydew",
    "Papaya",
    "Guava",
  ];

  return (
    <div className="space-y-1">
      <Label>Choose a fruit</Label>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select a fruit..." />
          <SelectIcon />
        </SelectTrigger>
        <SelectPortal>
          <SelectContent>
            <SelectScrollUpButton />
            <SelectViewport>
              {fruits.map((fruit) => (
                <SelectItem key={fruit} value={fruit.toLowerCase()}>
                  <SelectItemText>{fruit}</SelectItemText>
                  <SelectItemIndicator />
                </SelectItem>
              ))}
            </SelectViewport>
            <SelectScrollDownButton />
            <SelectArrow />
          </SelectContent>
        </SelectPortal>
      </Select>
    </div>
  );
};

export const Complex = () => {
  const [value, setValue] = useState("us");

  return (
    <div className="space-y-1">
      <Label>Choose a location</Label>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select a location..." />
          <SelectIcon />
        </SelectTrigger>
        <SelectPortal>
          <SelectContent>
            <SelectScrollUpButton />
            <SelectViewport>
              <SelectGroup>
                <SelectLabel>North America</SelectLabel>
                <SelectItem value="us">
                  <SelectItemText>United States</SelectItemText>
                  <SelectItemIndicator />
                </SelectItem>
                <SelectItem value="ca">
                  <SelectItemText>Canada</SelectItemText>
                  <SelectItemIndicator />
                </SelectItem>
                <SelectItem value="mx">
                  <SelectItemText>Mexico</SelectItemText>
                  <SelectItemIndicator />
                </SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Europe</SelectLabel>
                <SelectItem value="uk">
                  <SelectItemText>United Kingdom</SelectItemText>
                  <SelectItemIndicator />
                </SelectItem>
                <SelectItem value="fr">
                  <SelectItemText>France</SelectItemText>
                  <SelectItemIndicator />
                </SelectItem>
                <SelectItem value="de">
                  <SelectItemText>Germany</SelectItemText>
                  <SelectItemIndicator />
                </SelectItem>
                <SelectItem value="it">
                  <SelectItemText>Italy</SelectItemText>
                  <SelectItemIndicator />
                </SelectItem>
                <SelectItem value="es" disabled>
                  <SelectItemText>Spain (disabled)</SelectItemText>
                  <SelectItemIndicator />
                </SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Asia Pacific</SelectLabel>
                <SelectItem value="jp">
                  <SelectItemText>Japan</SelectItemText>
                  <SelectItemIndicator />
                </SelectItem>
                <SelectItem value="cn">
                  <SelectItemText>China</SelectItemText>
                  <SelectItemIndicator />
                </SelectItem>
                <SelectItem value="kr">
                  <SelectItemText>South Korea</SelectItemText>
                  <SelectItemIndicator />
                </SelectItem>
                <SelectItem value="in">
                  <SelectItemText>India</SelectItemText>
                  <SelectItemIndicator />
                </SelectItem>
                <SelectItem value="au">
                  <SelectItemText>Australia</SelectItemText>
                  <SelectItemIndicator />
                </SelectItem>
              </SelectGroup>
            </SelectViewport>
            <SelectScrollDownButton />
            <SelectArrow />
          </SelectContent>
        </SelectPortal>
      </Select>
    </div>
  );
};



