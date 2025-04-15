export default function checkPrivateRoute(link) {
  const publicRoutes = ["/", "/login", "/signup"];
  const privateRoutes = ["/dashboard", "/plants", "/plans", "/info", "/plants/:plantID"];

  // Xử lý dynamic routes
  const matchDynamicRoute = (route, path) => {
    const regex = new RegExp(`^${route.replace(/:[^\s/]+/g, "([^/]+)")}$`);
    return regex.test(path);
  };

  if (publicRoutes.includes(link)) {
    return "public";
  } else if (privateRoutes.some((route) => matchDynamicRoute(route, link))) {
    return "private";
  } else {
    return "unknown"; // Route không hợp lệ
  }
}
