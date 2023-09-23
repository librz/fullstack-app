// ref: https://ui.mantine.dev/category/navbars#navbar-simple
import { useState } from "react";
import {
  Image,
  Group,
  Code,
  Loader,
  Flex,
} from "@mantine/core";
import {
  IconBellRinging,
  IconSettings,
  IconReceipt2,
  IconLogout,
  IconUser,
} from "@tabler/icons-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/auth/useAuth";
import { fetchProfile } from "@/services";
import { isDev } from "@/utils/env-control";
import { useTranslation } from "react-i18next";
import classes from './index.module.css';

export function NavbarSimple() {
  const { pathname } = useLocation();
  const auth = useAuth();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const data = [
    { link: "/dashboard", label: t("menus.dashboard"), icon: IconBellRinging },
    { link: "/billing", label: t("menus.billing"), icon: IconReceipt2 },
    { link: "/settings", label: t("menus.settings"), icon: IconSettings },
  ];

  const { isLoading: loadingUser, data: user } = useQuery({
    queryKey: ["user_profile"],
    queryFn: fetchProfile,
  });

  const [loggingOut, setLoggingOut] = useState(false);

  const links = data.map((item) => (
    <NavLink
      className={classes.link}
      to={item.link}
      key={item.label}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </NavLink>
  ));

  return (
    // have to set w-fit, maybe a result of using tailwind
    <nav className={classes.navbar}>
      <div>
        <NavLink to="/">
          <Group className={classes.header} justify="space-between">
            <div className="flex gap-2 items-center">
              <Image src="/react.svg" height={28} />
              <span className="text-xl font-semibold">Odysseus</span>
            </div>
            <Code fw={700}>v1.0.0</Code>
          </Group>
        </NavLink>
        {links}
      </div>

      {loadingUser ? (
        <div className={classes.footer}>
          <Flex justify="center" align="center" className="h-20">
            <Loader />
          </Flex>
        </div>
      ) : user ? (
        <div className={classes.footer}>
          <NavLink to="/profile" className={classes.link}>
            <IconUser className={classes.linkIcon} stroke={1.5} />
            <span>{`${user.firstName} ${user.lastName}`}</span>
          </NavLink>
          <div
            className={classes.link}
            onClick={() => {
              if (loggingOut) return;
              setLoggingOut(true);
              auth.signout((error) => {
                if (isDev()) {
                  console.log("Logged out at", new Date().toLocaleString());
                }
                setLoggingOut(false);
                if (error) {
                  alert(error);
                  return;
                }
                navigate("/login");
              });
            }}
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            {loggingOut ? (
              <Loader size="sm" />
            ) : (
              <span>{t("auth.logout.label")}</span>
            )}
          </div>
        </div>
      ) : null}
    </nav>
  );
}
