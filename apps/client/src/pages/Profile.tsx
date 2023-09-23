import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "@/services";
import { Flex, Loader } from "@mantine/core";
import { useTranslation } from "react-i18next";

function Profile() {
  const { isLoading: loadingUser, data: user } = useQuery({
    queryKey: ["user_profile"],
    queryFn: fetchProfile,
  });

  const { t } = useTranslation();

  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-6 sm:px-6">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          {t("profile.user_profile")}
        </h3>
      </div>
      <div className="border-t border-gray-100">
        {loadingUser ? (
          <Flex align="center" justify="center" className="h-20">
            <Loader />
          </Flex>
        ) : user ? (
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">
                {t("profile.full_name")}
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {`${user.firstName} ${user.lastName}`}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">
                {t("profile.email_address")}
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {user.email}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-900">
                {t("profile.company_name")}
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {user.companyName}
              </dd>
            </div>
          </dl>
        ) : null}
      </div>
    </div>
  );
}

export { Profile };
