import "@/styles/global.css";
import type { AppProps } from "next/app";

import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { ApolloWrapper } from "lib/apollo-provider";

loadDevMessages();
loadErrorMessages();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloWrapper>
      <Component {...pageProps} />
    </ApolloWrapper>
  );
}
