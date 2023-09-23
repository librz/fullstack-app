import { LanguageSelect } from "../LanguageSelect";

export function UnauthedHeader() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 justify-between">
        <div className="flex">
          <div className="flex flex-shrink-0 items-center">
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
          </div>
        </div>
        <div className="hidden sm:ml-6 sm:flex sm:items-center">
          <LanguageSelect />
        </div>
      </div>
    </div>
  );
}
