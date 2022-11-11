# Heart - List

::: warning
The data are only available once a synchronization occured between the device and Withings servers (which might include synchronizing with Withings mobile application or via Withings Mobile SDK).
:::

[Heart - List](https://developer.withings.com/api-reference/#operation/heartv2-list) returns a list of ECG records and Afib classification for a given period of time. To get the full ECG signal, for a specific ECG recording, use the [Heart - Get](/WithingsFlutter/guide/heart/heartv2get).

In WithingsFlutter, the response object is expressed by the `WithingsHeartListData`. In particular, an instance of `WithingsHeartListData` has the following fields:

```dart
/// Response status
int? status;

/// Array of objects
List<SeriesHeartList>? series;

/// To know if there is more data to fetch or not
bool? more;

/// Offset to use to retrieve the next data
int? offset;
```

where `SeriesHeartList` object is:

```dart
/// Timestamp of the recording
int? timestamp;

/// Object ECG
Ecg? ecg;

/// Object bloodpressure
Bloodpressure? bloodpressure;

/// Average recorded heart rate
int? avgHeartRate;
```
and `Ecg` object is:

```dart
/// Id of the signal of the specific ECG
int? signalid;

/// Atrial fibrillation classification
int? afib;
```

and `Bloodpressure` object is:

```dart
/// Diastole value
int? diastole;

/// Systole value
int? systole;
```
:::tip
For more info about the `status` check the Withings API documentation [Response Status](https://developer.withings.com/api-reference#section/Response-status) section.
:::

:::tip
For more info about the values check the Withings API documentation [Heart - List](https://developer.withings.com/api-reference/#operation/heartv2-list) in the `Responses` :arrow_right: `body` section.
:::

For example:

```dart
WithingsHeartListData(status: 0, series: [SeriesHeartList(timestamp: 1663373398, ecg: Ecg(signalid: 163046202, afib: 0, ), bloodpressure: null, avgHeartRate: 51, ), SeriesHeartList(timestamp: 1663113635, ecg: Ecg(signalid: 162143385, afib: 2, ),], more: false, offset: 0, )
```
Informations about the list of ECG recordings of the user can be obtained in three steps:

## Step 1: Instantiate a manager

First, you need to instanciate a `WithingsHeartListDataManager`
```dart
WithingsHeartListDataManager withingsHeartListDataManager = WithingsHeartListDataManager();
```

## Step 2: Create the request url

Then, you have to create a url object, `WithingsHeartAPIURL.list`, that fetches the list of ECG recordings, given the:
* `access token`

Then, if you want, set:
* the `startdate` and `enddate` as **UNIX Timestamp** to define the range of time of ECG recordings you want to retrieve
* the `offset`, if in the previous response `more = true`, so this means that there are more data to retrieve, so set in `offset` the value of `offset` of the previous response

For example:
```dart
WithingsHeartAPIURL withingsHeartAPIURL = WithingsHeartAPIURL.list(
            accessToken: withingsCredentials.withingsAccessToken,
            //startdate: , //Not necessary: UNIX Timestamp startdate
            //enddate: , //Not necessary: UNIX Timestamp enddate
            //offset: , //Not necessary: use it if in the previous response more = true and insert here the value of offset
            );
```

## Step 3: Get the data

Finally you can obtain the list of the ECG recordings using
```dart
WithingsHeartListData listheartdata = await withingsHeartListDataManager.fetch(withingsHeartAPIURLList);
```

But if you want the package to automatically handle the `offset` use the `.fetchAutoOffset`, instead of `.fetch`, of the manager, without specifying the `offset` in the field of the URL object
```dart
WithingsHeartListData listheartdata = await withingsHeartListDataManager.fetchAutoOffset(withingsHeartAPIURLList);
```