"use client";

import { useTRPC } from "@/trpc/client";

import { useSuspenseQuery } from "@tanstack/react-query";

export const Client =  () => {

console.log("Client COMPONENT");

  const trpc= useTRPC();
  const { data } = useSuspenseQuery(trpc.createAI.queryOptions({ text: "Zahir Prefetch" }));

  return (
    <div>
      {JSON.stringify(data)}
    </div>
  );
}
