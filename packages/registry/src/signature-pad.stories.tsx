import { useRef, useState } from "react";
import type { ComponentRef } from "react";
import SignaturePad from "../registry/default/components/ui/SignaturePad";
import { Button } from "../registry/default/components/ui/Button";
import { CheckIcon, SymbolIcon } from "@radix-ui/react-icons";

export const Default = () => <SignaturePad />;

export const WithoutButtons = () => <SignaturePad showButtons={false} />;

export const Variants = () => (
  <div className="flex flex-col gap-4">
    <div>
      <p className="text-sm font-medium mb-2">Default</p>
      <SignaturePad variant="default" />
    </div>
    <div>
      <p className="text-sm font-medium mb-2">Ghost</p>
      <SignaturePad variant="ghost" />
    </div>
    <div>
      <p className="text-sm font-medium mb-2">Outline</p>
      <SignaturePad variant="pill"  />
    </div>
  </div>
);

export const Sizes = () => (
  <div className="flex flex-col gap-4">
    <div>
      <p className="text-sm font-medium mb-2">Small</p>
      <SignaturePad size="sm" />
    </div>
    <div>
      <p className="text-sm font-medium mb-2">Default</p>
      <SignaturePad size="default" />
    </div>
    <div>
      <p className="text-sm font-medium mb-2">Medium</p>
      <SignaturePad size="md" />
    </div>
    <div>
      <p className="text-sm font-medium mb-2">Large</p>
      <SignaturePad size="lg" />
    </div>
  </div>
);

export const CustomPenColor = () => (
  <div className="flex flex-col gap-4">
    <div>
      <p className="text-sm font-medium mb-2">Gray 9</p>
      <SignaturePad penColor="var(--gray-9)" />
    </div>
    <div>
      <p className="text-sm font-medium mb-2">Accent 9</p>
      <SignaturePad penColor="var(--accent-9)" />
    </div>

  </div>
);

export const CustomLineWidth = () => (
  <div className="flex flex-col gap-4">
    <div>
      <p className="text-sm font-medium mb-2">Thin (2px)</p>
      <SignaturePad lineWidth={2} />
    </div>
    <div>
      <p className="text-sm font-medium mb-2">Default (4px)</p>
      <SignaturePad lineWidth={4} />
    </div>
    <div>
      <p className="text-sm font-medium mb-2">Thick (6px)</p>
      <SignaturePad lineWidth={6} />
    </div>
    <div>
      <p className="text-sm font-medium mb-2">Very Thick (8px)</p>
      <SignaturePad lineWidth={8} />
    </div>
  </div>
);

export const WithCustomIcons = () => (
  <SignaturePad
    saveButtonIcon={<CheckIcon />}
    clearButtonIcon={<SymbolIcon />}
  />
);

export const WithOnSave = () => {
  const [savedSignature, setSavedSignature] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4">
      <SignaturePad
        onSave={(signature) => {
          setSavedSignature(signature);
          console.log("Signature saved:", signature);
        }}
      />
      {savedSignature && (
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Saved Signature:</p>
          <img
            src={savedSignature}
            alt="Saved signature"
            className="border border-gray-6 rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export const WithOnChange = () => {
  const [hasSignature, setHasSignature] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <SignaturePad
        onChange={(signature) => {
          setHasSignature(signature !== null);
          console.log("Signature changed:", signature ? "Has signature" : "Empty");
        }}
      />
      <div className="text-sm">
        Status: {hasSignature ? "✓ Has signature" : "Empty"}
      </div>
    </div>
  );
};

export const WithRefMethods = () => {
  const signaturePadRef = useRef<ComponentRef<typeof SignaturePad>>(null);
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [isEmpty, setIsEmpty] = useState(true);

  const handleClear = () => {
    signaturePadRef.current?.clear();
    setSignatureData(null);
    setIsEmpty(true);
  };

  const handleSave = () => {
    signaturePadRef.current?.save();
    const dataURL = signaturePadRef.current?.toDataURL();
    if (dataURL) {
      setSignatureData(dataURL);
    }
  };

  const handleCheckEmpty = () => {
    const empty = signaturePadRef.current?.isEmpty() ?? true;
    setIsEmpty(empty);
  };

  return (
    <div className="flex flex-col gap-4">
      <SignaturePad ref={signaturePadRef} showButtons={false} />
      <div className="flex gap-2">
        <Button onClick={handleClear} variant="pill"  size="sm">
          Clear (via ref)
        </Button>
        <Button onClick={handleSave} variant="pill"  size="sm">
          Save (via ref)
        </Button>
        <Button onClick={handleCheckEmpty} variant="pill"  size="sm">
          Check Empty
        </Button>
      </div>
      <div className="text-sm">
        Is Empty: {isEmpty ? "Yes" : "No"}
      </div>
      {signatureData && (
        <div>
          <p className="text-sm font-medium mb-2">Saved Signature:</p>
          <img
            src={signatureData}
            alt="Saved signature"
            className="border border-gray-6 rounded-lg max-w-xs"
          />
        </div>
      )}
    </div>
  );
};

export const CombinedExample = () => {
  const [signature, setSignature] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4 max-w-md">
      <div>
        <p className="text-sm font-medium mb-2">Sign below:</p>
        <SignaturePad
          variant="pill" 
          size="md"
          penColor="hsl(var(--foreground))"
          lineWidth={3}
          onSave={(dataURL) => {
            setSignature(dataURL);
            alert("Signature saved!");
          }}
          onChange={(dataURL) => {
            console.log("Signature changed");
          }}
        />
      </div>
      {signature && (
        <div>
          <p className="text-sm font-medium mb-2">Your signature:</p>
          <img
            src={signature}
            alt="Your signature"
            className="border border-gray-6 rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

