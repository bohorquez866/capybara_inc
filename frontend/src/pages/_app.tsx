import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { AuthProvider } from "@/context/auth";
import { Providers } from "@/context/providers";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </AuthProvider>
  );
}
