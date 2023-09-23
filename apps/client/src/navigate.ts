import { useNavigate } from "react-router-dom";

// ref: https://stackoverflow.com/questions/68399876/how-to-navigate-outside-of-react-component-using-react-router-6

export const his: { navigate: ReturnType<typeof useNavigate> } = {
  navigate: () => { },
};

export const NavigateSetter = () => {
  his.navigate = useNavigate();
  return null;
};
