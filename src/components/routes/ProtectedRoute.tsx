import Cookies from 'js-cookie';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { TOKEN, USER_VERIFIED } from '../../constants';

function ProtectedRoute() {
  const location = useLocation();
  const isLoggedIn =
    Cookies.get(TOKEN) && Cookies.get(USER_VERIFIED) === 'true';

  if (!isLoggedIn) {
    const callbackUrl = `${location.pathname}${location.search}`;

    return (
      <Navigate
        replace
        to={`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`}
      />
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;
