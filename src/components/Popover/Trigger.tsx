"use client";

import { usePopover } from "./Context";

function Trigger({ children }: { children: React.ReactNode }) {
  const { toggle } = usePopover();

  return (
    <button className="flex" type="button" onClick={toggle}>
      {children}
    </button>
  );
}

export default Trigger;