import { matchPath } from "react-router-dom";

function isMatch({ path, route, exact, strict }) {
  return matchPath(route, {
    path: path,
    exact: exact || true,
    strict: strict || false,
  });
}
export default isMatch;
