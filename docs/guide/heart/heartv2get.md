# Heart - Get

::: warning
The data are only available once a synchronization occured between the device and Withings servers (which might include synchronizing with Withings mobile application or via Withings Mobile SDK).
:::

[Heart - Get](https://developer.withings.com/api-reference/#operation/heartv2-get) provides the high frequency data of an ECG recording in micro-volt (μV).
::: warning
About a **specific** ECG recording
:::

In WithingsFlutter, the response object is expressed by the `WithingsHeartGetData`. In particular, an instance of `WithingsHeartGetData` has the following fields:

```dart
/// Response status
int? status;

/// Array: Signal value in micro-volt (μV)
List<int>? signal;

/// Signal Sampling Frequency (Hz)
int? samplingFrequency;

/// Where the user is wearing the device
int? wearposition;
```
:::tip
For more info about the `status` check the Withings API documentation [Response Status](https://developer.withings.com/api-reference#section/Response-status) section.
:::

:::tip
For more info about the values of `wearposition` check the Withings API documentation [Heart - Get](https://developer.withings.com/api-reference/#operation/heartv2-get) in the `Responses` :arrow_right: `body` section.
:::

For example:

```dart
WithingsHeartGetData (status: 0, signal: [-10, -13, -20, ..., -31, -10], samplingFrequency: 300, wearposition: 1)
```
Informations about the specific ECG recording of the user can be obtained in three steps:

## Step 1: Instantiate a manager

First, you need to instantiate a `WithingsHeartGetDataManager`
```dart
WithingsHeartGetDataManager withingsHeartGetDataManager = WithingsHeartGetDataManager();
```

## Step 2: Create the request url

Then, you have to create a url object, `WithingsHeartAPIURL.get`, that fetches the specific ECG data, given the:
* `access token`
* `signalId`: the ID of the ECG signal

For example:
```dart
WithingsHeartAPIURL withingsHeartAPIURL = WithingsHeartAPIURL.get(
            accessToken: withingsCredentials.withingsAccessToken,
            signalId: 157847052, // example: Signal ID of ECG
            );
```

:::tip
Retrieve the `signalId` info of a specific ECG recording using first [Heart - List](/WithingsFlutter/guide/heart/heartv2list)
:::

## Step 3: Get the data

Finally you can obtain the specific ECG data using
```dart
WithingsHeartGetData getheartdata =
    await withingsHeartGetDataManager.fetch(withingsHeartAPIURLget);
```