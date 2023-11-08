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
import SuperuserView from "@/components/SuperuserView";
import { UserProvider } from "@/context/Users";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const isUser = useHasPermissionHook(Role.USER);
  const isAdmin = useHasPermissionHook(Role.ADMIN);
  const isSuperUser = useHasPermissionHook(Role.SUPERUSER);

  useEffect(() => {
    if (!isLoggedIn) router.push("/login");
  }, [isLoggedIn, router]);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm }}>
        <MainLayout>
          <UserProvider>
            <main className={`${styles.main} ${inter.className}`}>
              {isSuperUser && <SuperuserView />}
              {isUser && !isAdmin && <UserView />}
            </main>
          </UserProvider>
        </MainLayout>
      </ConfigProvider>
    </>
  );
}
