"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";
import {
  fadeInUp,
  fadeInUpStagger,
  fadeIn,
  slideInFromLeft,
  slideInFromRight,
  scaleIn,
} from "@/lib/motion";

type MotionWrapperProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  variant?:
    | "fadeInUp"
    | "fadeInUpStagger"
    | "fadeIn"
    | "slideInFromLeft"
    | "slideInFromRight"
    | "scaleIn";
  delay?: number;
};

const variants = {
  fadeInUp,
  fadeInUpStagger,
  fadeIn,
  slideInFromLeft,
  slideInFromRight,
  scaleIn,
};

export function MotionWrapper({
  children,
  variant = "fadeInUp",
  delay = 0,
  ...props
}: MotionWrapperProps) {
  return (
    <motion.div
      variants={variants[variant]}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
