import { Route, Redirect, RouteProps } from 'react-router-dom'
import {hasToken} from "@/utils/storage";

// https://reactrouter.com/web/example/auth-workflow
// https://stackoverflow.com/a/64307442/15443637
interface PrivateRouteProps extends RouteProps {
    component: React.ComponentType<any>
}
const AuthRoute = ({ component: Component, ...rest }:PrivateRouteProps) => {
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
                        state: {
                            from: location.pathname
                        }
                    }
                } />
            )
        }
      }}
    />
  )
}

export { AuthRoute }
