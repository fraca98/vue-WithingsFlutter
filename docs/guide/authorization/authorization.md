# Authorization 

## Authorize your application

To do that, simply call the asynchronous method `WithingsConnector.authorize()`, within your code, as: 

```dart
WithingsCredentials? withingsCredentials = await WithingsConnector.authorize(
                clientID: Strings.withingsClientID,
                clientSecret: Strings.withingsClientSecret,
                scope: 'user.activity,user.metrics,user.sleepevents',
                redirectUri: Strings.withingsRedirectUri,
                callbackUrlScheme: Strings.withingsCallbackScheme);
```

This will open a web view where user will be able to input his Withings credentials and login.
After the login, the web view will close and the method will return a `WithingsCredentials?` instance that contains the credentials to be used to make requests to the Withings Web API via `withings_flutter`. In particular, `withingsCredentials.userID` contains the Withings user id of the user that just authorized `withings_flutter`, `withingsCredentials.withingsAccessToken` contains the Withings access token, `withingsCredentials.withingsRefreshToken` contains the Withings refresh token and `withingsCredentials.expires` defines the access token expiry delay in seconds.

In the `scope` field, you have to put a comma-separated list of permission scopes you want to ask your user for and check out this [link](https://developer.withings.com/developer-guide/v3/data-api/all-available-health-data/) to know which scope/scopes you should use.

::: tip
In the example all possible scopes have been included. You can do the same to access all the data.
:::

::: warning 
The credentials are not stored automatically somewhere in a persistent way. You must manage such crendentials according to your strategy. 
:::

## Refresh credentials

To do that, simply call the asynchronous method `WithingsConnector.refreshToken()`, within your code, as: 

```dart
WithingsCredentials? newWithingsCredentials = await WithingsConnector.refreshToken(
            clientID: Strings.withingsClientID,
            clientSecret: Strings.withingsClientSecret,
            withingsRefreshToken: withingsCredentials.withingsRefreshToken,
            );
```

this will return a new instance of `WithingsCredentials` containing the refreshed tokens, if not null. 