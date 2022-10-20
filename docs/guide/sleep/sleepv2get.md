# Sleep - Get

::: warning
The data are only available once a synchronization occured between the device and Withings servers (which might include synchronizing with Withings mobile application or via Withings Mobile SDK).
:::

[Sleep - Get](https://developer.withings.com/api-reference/#operation/sleepv2-get) returns sleep data captured at high frequency, including sleep stages.

In WithingsFlutter, the response object is expressed by the `WithingsSleepGetData`. In particular, an instance of `WithingsSleepGetData` has the following fields:

```dart
/// Response status
int? status;

/// Array of objects SeriesSleepGet
List<SeriesSleepGet>? series;
```

where `SeriesSleepGet` object is:

```dart
/// The state of sleeping
int? state;

/// The starting datetime for the sleep state data
int? startdate;

/// The end datetime for the sleep data
int? enddate;

/// Series (Heart rate)
SeriesTimestampSleepGet? hr;

/// Series (Respiration Rate)
SeriesTimestampSleepGet? rr;

/// Series (Total snoring time)
SeriesTimestampSleepGet? snoring;

/// Series (Heart rate variability - Standard deviation of the NN over 1 minute)
SeriesTimestampSleepGet? sdnn1;

/// Series (Heart rate variability - Root mean square of the successive differences over "a few seconds")
SeriesTimestampSleepGet? rmssd;
```

and where `SeriesTimestampSleepGet` object is:

```dart
/// Timestamp
int? timestamp;

/// Value associated to the timestamp
int? value;
```
:::tip
For more info about the `status` check the Withings API documentation [Response Status](https://developer.withings.com/api-reference#section/Response-status) section.
:::

:::tip
For more info about the values check the the Withings API documentation [Sleep - Get](https://developer.withings.com/api-reference/#operation/sleepv2-get) in the `Responses` :arrow_right: `body` section.
:::

For example:

```dart
WithingsSleepGetData(status: 0, series: [SeriesSleepGet(state: 0, startdate: 1662860040, enddate: 1662860160, hr: null, rr: null, snoring: null, sdnn_1: null, rmssd: null, ), ..., SeriesSleepGet(state: 1, startdate: 1662866460, enddate: 1662867180, hr: SeriesTimestampSleepGet(series: [ObjSleepGet(timestamp: 1662866491, value: 45, ), ObjSleepGet(timestamp: 1662867098, value: 45, )], ), rr: null, snoring: null, sdnn_1: null, rmssd: null, )], )
```

Informations about the sleep data captured at high frequency, including sleep stages, can be obtained in three steps:

## Step 1: Instantiate a manager

First, you need to instanciate a `WithingsSleepGetDataManager`
```dart
WithingsSleepGetDataManager withingsSleepGetDataManager = WithingsSleepGetDataManager();
```

## Step 2: Create the request url

Then, you have to create a url object, `WithingsSleepAPIURL.get`, that fetches the sleep data captured at high frequency, including sleep stages, given the:
* `startdate` as **UNIX Timestamp** to define the range of time of data to be retrieved
* `enddate` as **UNIX Timestamp** to define the range of time of data to be retrieved
* `dataFields` is a `String`: a list of of requested data fields, separated by a comma
* `access token`

For example:
```dart
WithingsSleepAPIURL withingsSleepAPIURLGet =
                WithingsSleepAPIURL.get(
                    startdate: 1662854063,
                    enddate: 1662900863,
                    dataFields: 'hr,rr,snoring,sdnn_1,rmssd',
                    accessToken: withingsCredentials.withingsAccessToken);
```
:::warning
If your input `startdate` and `enddate` are separated by more than 24h, only the first 24h after `startdate` will be returned.
:::

::: tip
For more info about the `dataFields` values check the Withings API documentation [Sleep - Get](https://developer.withings.com/api-reference/#operation/sleepv2-get) in the `Query Parameters` section.
:::

## Step 3: Get the data

Finally you can obtain the list of the ECG recordings using
```dart
WithingsSleepGetData getsleepdata =
                await withingsSleepGetDataManager.fetch(withingsSleepAPIURLGet);
```
