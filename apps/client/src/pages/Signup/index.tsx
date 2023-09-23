// ref: https://ui.mantine.dev/category/authentication#authentication-title
import { useState } from "react";
import { TextInput, PasswordInput, Anchor, Paper, Title, Text, Container, Button, Stack, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link, useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { useAuth } from "@/auth/useAuth";
import { isDev } from "@/utils/env-control";
import { useTranslation } from "react-i18next";
import classes from "./index.module.css";

export function Signup() {
  const navgiate = useNavigate();
  const auth = useAuth();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      firstName: (value) => {
        const val = value.trim();
        return val.length < 1
          ? "Frist name must have at least 1 letter"
          : val.length > 35
          ? "First name must be less than 35 letters"
          : null;
      },
      lastName: (value) => {
        const val = value.trim();
        return val.length < 1
          ? "Last name must have at least 1 letter"
          : val.length > 35
          ? "Last name must be less than 35 letters"
          : null;
      },
      companyName: (value) => {
        const val = value.trim();
        return val.length < 1
          ? "Company name must have at least 1 letter"
          : val.length > 35
          ? "Company name must be less than 35 letters"
          : null;
      },
      password: (value) => {
        const val = value.trim();
        return val.length < 10
          ? "Password must be at least 10 characters"
          : val.length > 50
          ? "Password must be less than 50 characters"
          : null;
      },
      confirmPassword: (value, values) => {
        return values.password === value ? null : "Password and confirm password doesn't match";
      },
    },
    transformValues: (values) => ({
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      companyName: values.companyName.trim(),
      email: values.email.trim(),
      password: values.password.trim(),
      confirmPassword: values.confirmPassword.trim(),
    }),
  });

  return (
    <Container size={420}>
      <Title ta="center" className={classes.title}>
        {t("auth.signup.label")}
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        {t("auth.signup.already_have_account")}{" "}
        <Link to="/login">
          <Anchor size="sm" component="button">
            {t("auth.login.label")}
          </Anchor>
        </Link>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form
          onSubmit={form.onSubmit((values) => {
            setLoading(true);
            if (isDev()) {
              console.log(values);
            }
            const { confirmPassword: _, ...apiValues } = values;
            auth.signup(apiValues, (error) => {
              setLoading(false);
              if (error) {
                alert(error);
                return;
              }
              notifications.show({
                title: t("auth.signup.account_created.title"),
                message: t("auth.signup.account_created.message"),
                autoClose: 5000,
              });
              navgiate("/login");
            });
          })}
        >
          <Stack gap="md">
            <TextInput
              label={t("auth.signup.fields.company.label")}
              placeholder={t("auth.signup.fields.company.placeholder")}
              required
              {...form.getInputProps("companyName")}
            />
            <Flex gap="md">
              <TextInput
                label={t("auth.signup.fields.first_name.label")}
                placeholder={t("auth.signup.fields.first_name.placeholder")}
                required
                {...form.getInputProps("firstName")}
              />
              <TextInput
                label={t("auth.signup.fields.last_name.label")}
                placeholder={t("auth.signup.fields.last_name.placeholder")}
                required
                {...form.getInputProps("lastName")}
              />
            </Flex>
            <TextInput
              type="email"
              label={t("auth.signup.fields.email.label")}
              placeholder={t("auth.signup.fields.email.placeholder")}
              required
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label={t("auth.signup.fields.password.label")}
              placeholder={t("auth.signup.fields.password.placeholder")}
              required
              {...form.getInputProps("password")}
            />
            <PasswordInput
              label={t("auth.signup.fields.confirm_password.label")}
              placeholder={t("auth.signup.fields.confirm_password.placeholder")}
              required
              {...form.getInputProps("confirmPassword")}
            />
          </Stack>
          {/* need to add colored background class, maybe a result of adding tailwind? */}
          <Button loading={loading} fullWidth mt="xl" type="submit" className="bg-black">
            {t("auth.signup.create_account")}
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
