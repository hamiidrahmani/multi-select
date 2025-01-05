import type { SVGProps } from "react";
export const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" {...props}>
    <path stroke="currentColor" strokeLinecap="round" strokeWidth={1.5} d="m18 6-6 6m0 0-6 6m6-6 6 6m-6-6L6 6" />
  </svg>
);
