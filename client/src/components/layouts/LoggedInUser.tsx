import Header from "../common/Header";
import useLoggedInUser from "../../hooks/useLoggedInUser";

const LoggedInUser = (): React.JSX.Element => {
  const decodedToken = useLoggedInUser();
  const welcomeString = decodedToken
    ? `Welcome back, ${decodedToken.username}`
    : "Welcome, Guest!";
  return <Header sm title={welcomeString} />;
};

export default LoggedInUser;
