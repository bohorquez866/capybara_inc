import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { AuthProvider } from "@/context/auth";
import { Providers } from "@/context/providers";
import { LogProvider } from "@/context/movementLog";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Providers>
        <LogProvider>
          <Component {...pageProps} />
        </LogProvider>
      </Providers>
    </AuthProvider>
  );
}
