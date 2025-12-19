import {
  Stepper,
  StepperList,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperSeparator,
  StepperTitle,
  StepperDescription,
  StepperContent,
  StepperPrev,
  StepperNext,
} from "@/components/ui/Stepper";

export const StepperDemo = () => {
  return (
    <Stepper defaultValue="step-1" className="w-full">
      <StepperList>
        <StepperItem value="step-1">
          <StepperTrigger>
            <StepperIndicator />
            <div className="flex flex-col">
              <StepperTitle>Step 1</StepperTitle>
              <StepperDescription>Complete your profile</StepperDescription>
            </div>
          </StepperTrigger>
          <StepperSeparator />
        </StepperItem>
        <StepperItem value="step-2">
          <StepperTrigger>
            <StepperIndicator />
            <div className="flex flex-col">
              <StepperTitle>Step 2</StepperTitle>
              <StepperDescription>Verify your email</StepperDescription>
            </div>
          </StepperTrigger>
          <StepperSeparator />
        </StepperItem>
        <StepperItem value="step-3">
          <StepperTrigger>
            <StepperIndicator />
            <div className="flex flex-col">
              <StepperTitle>Step 3</StepperTitle>
              <StepperDescription>Set up your preferences</StepperDescription>
            </div>
          </StepperTrigger>
          <StepperSeparator />
        </StepperItem>
        <StepperItem value="step-4">
          <StepperTrigger>
            <StepperIndicator />
            <div className="flex flex-col">
              <StepperTitle>Step 4</StepperTitle>
              <StepperDescription>Review and confirm</StepperDescription>
            </div>
          </StepperTrigger>
        </StepperItem>
      </StepperList>
      <StepperContent value="step-1">
        <div className="p-4">Content for step 1</div>
      </StepperContent>
      <StepperContent value="step-2">
        <div className="p-4">Content for step 2</div>
      </StepperContent>
      <StepperContent value="step-3">
        <div className="p-4">Content for step 3</div>
      </StepperContent>
      <StepperContent value="step-4">
        <div className="p-4">Content for step 4</div>
      </StepperContent>
    </Stepper>
  );
};