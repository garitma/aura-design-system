'use client';
import { ReactNode, useRef } from 'react';
import {
  motion,
  useInView,
  Variant,
  Transition,
  UseInViewOptions,
} from 'framer-motion';

interface InViewProps {
  children: ReactNode;
  variants?: {
    hidden: Variant;
    visible: Variant;
  };
  transition?: Transition;
  viewOptions?: UseInViewOptions;
}

const defaultVariants = {
  hidden: { opacity: 0, filter: 'blur(9px)' }, // Added default variants
  visible: { opacity: 1, filter: 'blur(0px)' },
};

export function InView({
  children,
  variants = defaultVariants, // Use defaultVariants if no variants are provided
  transition = { duration: 0.3, ease: 'easeInOut' }, // Added default transition
  viewOptions = { margin: '0px 0px -50px 0px' }, // Added default viewOptions
}: InViewProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, viewOptions);

  return (
    <motion.div
      ref={ref}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
