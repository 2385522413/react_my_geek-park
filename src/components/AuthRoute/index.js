import {Redirect, Route} from "react-router-dom";
import {hasToken} from "@/utils/storage";

// https://reactrouter.com/web/example/auth-workflow
// https://stackoverflow.com/a/64307442/15443637

const AuthRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({location}) => {
        if (hasToken()) {
         return <Component></Component>
        }else {
            return (
                <Redirect to={
                    {
                        pathname: '/login',
                        from: location
                    }
                } />
            )
        }
      }}
    />
  )
}

export { AuthRoute }
