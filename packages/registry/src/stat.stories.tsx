import {
  ArrowDownIcon,
  ArrowUpIcon,
  Cross2Icon,
  DotsHorizontalIcon,
  EnvelopeClosedIcon,
  PersonIcon,
  ReaderIcon,
} from "@radix-ui/react-icons";

import {
  Stat,
  StatDescription,
  StatIndicator,
  StatLabel,
  StatSeparator,
  StatTrend,
  StatValue,
} from "../registry/default/components/ui/Stat";

export const Default = () => (
  <Stat className="max-w-xs">
    <StatLabel>Total Revenue</StatLabel>
    <StatIndicator variant="icon" color="success">
      <ReaderIcon className="icon" aria-hidden />
    </StatIndicator>
    <StatValue>$45,231</StatValue>
    <StatTrend trend="up">
      <ArrowUpIcon className="icon" aria-hidden />
      +20.1% from last month
    </StatTrend>
    <StatSeparator />
    <StatDescription>
      Total revenue generated in the current billing period
    </StatDescription>
  </Stat>
);

export const IndicatorVariants = () => (
  <div className="flex flex-wrap gap-1">
    <Stat className="max-w-xs">
      <StatLabel>Default</StatLabel>
      <StatIndicator>
        <PersonIcon className="icon" aria-hidden />
      </StatIndicator>
      <StatValue>1,204</StatValue>
    </Stat>
    <Stat className="max-w-xs">
      <StatLabel>Icon</StatLabel>
      <StatIndicator variant="icon" color="info">
        <EnvelopeClosedIcon className="icon" aria-hidden />
      </StatIndicator>
      <StatValue>892</StatValue>
    </Stat>
    <Stat className="max-w-xs">
      <StatLabel>Badge</StatLabel>
      <StatIndicator variant="badge" color="warning">
        New
      </StatIndicator>
      <StatValue>64</StatValue>
    </Stat>
    <Stat className="max-w-xs">
      <StatLabel>Action</StatLabel>
      <StatIndicator variant="action" color="default" role="button" tabIndex={0}>
        <DotsHorizontalIcon className="icon" aria-hidden />
      </StatIndicator>
      <StatValue>318</StatValue>
    </Stat>
  </div>
);

export const Trends = () => (
  <div className="flex flex-wrap gap-1">
    <Stat className="max-w-xs">
      <StatLabel>Active users</StatLabel>
      <StatValue>12,480</StatValue>
      <StatTrend trend="up">
        <ArrowUpIcon className="icon" aria-hidden />
        +4.2%
      </StatTrend>
    </Stat>
    <Stat className="max-w-xs">
      <StatLabel>Churn</StatLabel>
      <StatValue>2.1%</StatValue>
      <StatTrend trend="down">
        <ArrowDownIcon className="icon" aria-hidden />
        -0.4%
      </StatTrend>
    </Stat>
    <Stat className="max-w-xs">
      <StatLabel>Open tickets</StatLabel>
      <StatIndicator variant="icon" color="error">
        <Cross2Icon className="icon" aria-hidden />
      </StatIndicator>
      <StatValue>37</StatValue>
      <StatTrend trend="neutral">No change</StatTrend>
    </Stat>
  </div>
);

export const WithDescription = () => (
  <Stat className="max-w-sm">
    <StatLabel>Conversion rate</StatLabel>
    <StatIndicator variant="badge" color="success">
      Live
    </StatIndicator>
    <StatValue>3.24%</StatValue>
    <StatTrend trend="up">
      <ArrowUpIcon className="icon" aria-hidden />
      +0.3% vs prior week
    </StatTrend>
    <StatSeparator />
    <StatDescription>
      Share of sessions that completed checkout in the last 7 days.
    </StatDescription>
  </Stat>
);
