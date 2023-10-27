import "@/styles/global.css";
import type { AppProps } from "next/app";

import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { ApolloWrapper } from "lib/apollo-provider";
import { Suspense, useEffect } from "react";
import { useRouter } from "next/router";
import { Loader } from "app/components/Loader";

loadDevMessages();
loadErrorMessages();

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <ApolloWrapper>
      <Suspense fallback={<Loader />}>
        <Component {...pageProps} />
      </Suspense>
    </ApolloWrapper>
  );
}
