import Head from "next/head";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ConfigProvider, theme } from "antd";
import MainLayout from "@/components/Layouts/MainLayout/MainLayout";
import styles from "../styles/Home.module.scss";
import { useAuth } from "@/context/auth";
import { Role, useHasPermissionHook } from "@/hooks/useRoleAccess";
import UserView from "@/components/UserView";
import { LogProvider } from "@/context/movementLog";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) router.push("/login");
  }, [isLoggedIn, router]);

  return (
    <>
      <Head>
        <title>Test Dashbaoard</title>
        <meta
          name="description"
          content="dashboard for managing users, admins and clients"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
        <MainLayout>
          <LogProvider>
            <main className={`${styles.main} ${inter.className}`}>
              <UserView />
            </main>
          </LogProvider>
        </MainLayout>
      </ConfigProvider>
    </>
  );
}
