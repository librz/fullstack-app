// ref: https://ui.mantine.dev/category/authentication#authentication-title
import { useState } from "react";
import { TextInput, PasswordInput, Anchor, Paper, Title, Stack, Text, Container, Button } from "@mantine/core";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "@mantine/form";
import { useAuth } from "@/auth/useAuth";
import { isDev } from "@/utils/env-control";
import classes from "./index.module.css";

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const from = location.state?.from?.pathname || "/";
  return (
    <Container size={420}>
      <Title ta="center" className={classes.title}>
        {t("auth.login.welcome_back")}
      </Title>
      <Text color="dimmed" size="sm" ta="center" mt={5}>
        {t("auth.login.no_account")}{" "}
        <Link to="/signup">
          <Anchor size="sm" component="button">
            {t("auth.login.create_account")}
          </Anchor>
        </Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form
          onSubmit={form.onSubmit((values) => {
            if (isDev()) {
              console.log(values);
            }
            setLoading(true);
            auth.signin(values, (error) => {
              setLoading(false);
              if (error) {
                alert(error);
                return;
              }
              // Send them back to the page they tried to visit when they were
              // redirected to the login page. Use { replace: true } so we don't create
              // another entry in the history stack for the login page.  This means that
              // when they get to the protected page and click the back button, they
              // won't end up back on the login page, which is also really nice for the
              // user experience.
              navigate(from, { replace: true });
            });
          })}
        >
          <Stack gap="md">
            <TextInput
              type="email"
              label={t("auth.login.fields.email.label")}
              placeholder={t("auth.login.fields.email.placeholder")}
              required
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label={t("auth.login.fields.password.label")}
              placeholder={t("auth.login.fields.password.placeholder")}
              required
              {...form.getInputProps("password")}
            />
          </Stack>
          {/* need to add colored background class, maybe a result of adding tailwind? */}
          <Button loading={loading} fullWidth type="submit" className="bg-black" mt="lg">
            {t("auth.login.label")}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
