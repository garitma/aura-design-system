import * as React from "react";
import { MaskInput, type MaskPattern } from "@/components/ui/MaskInput";

export const MaskInputDemo = () => {
  const [phone, setPhone] = React.useState("");

  return (
    <div className="flex w-full max-w-sm flex-col gap-1">
      <label htmlFor="mask-phone" className="text-sm font-medium text-gray-12">
        Phone number
      </label>
      <MaskInput
        id="mask-phone"
        mask="phone"
        placeholder="Enter phone number"
        maskPlaceholder="(___) ___-____"
        value={phone}
        onValueChange={(masked) => setPhone(masked)}
      />
      <p className="text-xs text-gray-11">Masked value: {phone || "—"}</p>
    </div>
  );
};

export const MaskInputDemoBuiltInPatterns = () => {
  const [values, setValues] = React.useState({
    phone: "",
    date: "",
    currency: "",
    euro: "",
    creditCard: "",
    percentage: "",
  });

  const setField = React.useCallback(
    (field: keyof typeof values) => (masked: string) => {
      setValues((prev) => ({ ...prev, [field]: masked }));
    },
    [],
  );

  return (
    <div className="grid w-full gap-2 md:grid-cols-2">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-12" htmlFor="pattern-phone">
          Phone
        </label>
        <MaskInput
          id="pattern-phone"
          mask="phone"
          placeholder="Enter phone number"
          value={values.phone}
          onValueChange={setField("phone")}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-12" htmlFor="pattern-date">
          Date
        </label>
        <MaskInput
          id="pattern-date"
          mask="date"
          placeholder="MM/DD/YYYY"
          value={values.date}
          onValueChange={setField("date")}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-12" htmlFor="pattern-usd">
          Currency (USD)
        </label>
        <MaskInput
          id="pattern-usd"
          mask="currency"
          placeholder="$0.00"
          value={values.currency}
          onValueChange={setField("currency")}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-12" htmlFor="pattern-eur">
          Currency (EUR)
        </label>
        <MaskInput
          id="pattern-eur"
          mask="currency"
          currency="EUR"
          locale="de-DE"
          placeholder="0,00 €"
          value={values.euro}
          onValueChange={setField("euro")}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-12" htmlFor="pattern-card">
          Credit card
        </label>
        <MaskInput
          id="pattern-card"
          mask="creditCard"
          placeholder="Card number"
          value={values.creditCard}
          onValueChange={setField("creditCard")}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-12" htmlFor="pattern-pct">
          Percentage
        </label>
        <MaskInput
          id="pattern-pct"
          mask="percentage"
          placeholder="0.00%"
          min={0}
          max={100}
          value={values.percentage}
          onValueChange={setField("percentage")}
        />
      </div>
    </div>
  );
};

export const MaskInputDemoCustomPattern = () => {
  const [value, setValue] = React.useState("");

  const licensePlate: MaskPattern = {
    pattern: "###-####",
    transform: (input) => input.replace(/[^A-Z0-9]/gi, "").toUpperCase(),
    validate: (input) => input.replace(/[^A-Z0-9]/gi, "").length === 7,
  };

  return (
    <div className="flex w-full max-w-sm flex-col gap-1">
      <label htmlFor="mask-plate" className="text-sm font-medium text-gray-12">
        License plate
      </label>
      <MaskInput
        id="mask-plate"
        mask={licensePlate}
        placeholder="Enter license plate"
        maskPlaceholder="ABC-1234"
        value={value}
        onValueChange={(masked) => setValue(masked)}
      />
      <p className="text-xs text-gray-11">Custom alphanumeric pattern</p>
    </div>
  );
};

export const MaskInputDemoValidationModes = () => {
  const [value, setValue] = React.useState("");
  const [valid, setValid] = React.useState<boolean | null>(null);

  return (
    <div className="flex w-full max-w-sm flex-col gap-1">
      <label htmlFor="mask-ssn" className="text-sm font-medium text-gray-12">
        SSN (validate on blur)
      </label>
      <MaskInput
        id="mask-ssn"
        mask="ssn"
        placeholder="Enter SSN"
        maskPlaceholder="___-__-____"
        validationMode="onBlur"
        value={value}
        onValueChange={(masked) => setValue(masked)}
        onValidate={(isValid) => setValid(isValid)}
        invalid={valid === false}
      />
      <p className="text-xs text-gray-11">
        {valid === null
          ? "Blur to validate"
          : valid
            ? "Valid SSN"
            : "Invalid SSN"}
      </p>
    </div>
  );
};

export const MaskInputDemoCardInformation = () => {
  const [card, setCard] = React.useState("");
  const [expiry, setExpiry] = React.useState("");

  return (
    <div className="grid w-full max-w-md gap-2">
      <div className="flex flex-col gap-1">
        <label htmlFor="card-number" className="text-sm font-medium text-gray-12">
          Card number
        </label>
        <MaskInput
          id="card-number"
          mask="creditCard"
          placeholder="Card number"
          value={card}
          onValueChange={(masked) => setCard(masked)}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="card-expiry" className="text-sm font-medium text-gray-12">
          Expiry
        </label>
        <MaskInput
          id="card-expiry"
          mask="creditCardExpiry"
          placeholder="MM/YY"
          value={expiry}
          onValueChange={(masked) => setExpiry(masked)}
        />
      </div>
    </div>
  );
};