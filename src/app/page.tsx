
//Trpc Prefeactching in cleint Component

import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { Client } from "./client";
import { Suspense } from 'react';

const Page = async () => {

  console.log("Celient Prefeactching COMPONENT");

  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.createAI.queryOptions({ text: "Zahir Prefetch" }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<p>Loading...</p>}>
        <Client />
      </Suspense>
    </HydrationBoundary>
  );
}

export default Page;

//Server Component

/**import { caller } from '@/trpc/server';

const Page = async () => {

console.log("SERVER COMPONENT");

const data = await caller.createAI({text: "from server component"});

  return (
    <div>
      {JSON.stringify(data)}
    </div>
  );
}

export default Page;**/


//Client Component


/**"use client";

import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";

const Page =  () => {

console.log("Client COMPONENT");

  const trpc= useTRPC();
  const { data } = useQuery(trpc.createAI.queryOptions({ text: "from Zahir" }));

  return (
    <div>
      {JSON.stringify(data)}
    </div>
  );
}

export default Page;**/