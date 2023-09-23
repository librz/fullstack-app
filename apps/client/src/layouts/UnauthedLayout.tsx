import { FC } from "react";
import { UnauthedHeader } from "@/components/UnauthedHeader";

const UnauthedLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col">
      <UnauthedHeader />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export { UnauthedLayout };
