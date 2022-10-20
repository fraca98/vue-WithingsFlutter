# Sleep - GetSummary

::: warning
The data are only available once a synchronization occured between the device and Withings servers (which might include synchronizing with Withings mobile application or via Withings Mobile SDK).
:::

[Sleep - GetSummary](https://developer.withings.com/api-reference/#operation/sleepv2-getsummary) returns sleep activity summaries, which are an aggregation of all the data captured at high frequency during the sleep activity.

:::warning
Use the [Sleep - Get](/guide/sleep/sleepv2get) service to get the high frequency data used to build these summaries.
:::

In WithingsFlutter, the response object is expressed by the `WithingsSleepGetSummaryData`. In particular, an instance of `WithingsSleepGetSummaryData` has the following fields:

```dart
/// Response status
int? status;

/// Array of SeriesSleepGetSummary objects
List<SeriesSleepGetSummary>? series;

/// To know if there are more data to fetch or not
bool? more;

/// Offset to use to retrieve the next data
int? offset;
```
where `SeriesSleepGetSummary` object is:

```dart
/// The starting datetime for the sleep state data
int? startdate;

/// The end datetime for the sleep data
int? enddate;

/// Date at which the measure was taken or entered
String? date;

/// Object Data (Details of sleep)
DataSleepGetSummary? data;
```

and where `DataSleepGetSummary` object is:
```dart
int? apneaHypopneaIndex;
int? asleepduration;
int? breathingDisturbancesIntensity;
int? deepsleepduration;
int? hrAverage;
int? hrMax;
int? hrMin;
int? lightsleepduration;
int? nbRemEpisodes;
List? nightEvents;
int? outOfBedCount;
int? remsleepduration;
int? rrAverage;
int? rrMax;
int? rrMin;
num? sleepEfficiency;
int? sleepLatency;
int? sleepScore;
int? snoring;
int? snoringepisodecount;
int? totalSleepTime;
int? totalTimeinbed;
int? wakeupLatency;
int? wakeupcount;
int? wakeupduration;
int? waso;
```
:::tip
For more info about the `status` check the Withings API documentation [Response Status](https://developer.withings.com/api-reference#section/Response-status) section.
:::

:::tip
For more info about these values/fields check the Withings API documentation [Sleep - GetSummary](https://developer.withings.com/api-reference/#operation/sleepv2-getsummary) in the `Query Parameters` section.
:::

For example:
```dart
WithingsSleepGetSummaryData(status: 0, series: [SeriesSleepGetSummary(startdate: 1662422640, enddate: 1662453480, date: 2022-09-06, data: DataSleepGetSummary(apnea_hypopnea_index: null, asleepduration: null, breathing_disturbances_intensity: null, deepsleepduration: 10860, hr_average: null, hr_max: null, hr_min: null, lightsleepduration: 0, nb_rem_episodes: 0, night_events: null, out_of_bed_count: 0, remsleepduration: null, rr_average: null, rr_max: null, rr_min: null, sleep_efficiency: 0.98, sleep_latency: 120, sleep_score: null, snoring: null, snoringepisodecount: null, total_sleep_time: 28320, total_timeinbed: 28980, wakeup_latency: 0, wakeupcount: 1, wakeupduration: 660, waso: 2400, ), ), ..., SeriesSleepGetSummary(startdate: 1662766320, enddate: 1662804120, date: 2022-09-10, data: DataSleepGetSummary(apnea_hypopnea_index: null, asleepduration: null, breathing_disturbances_intensity: null, deepsleepduration: 12300, hr_average: null, hr_max: null, hr_min: null, lightsleepduration: 0, nb_rem_episodes: 0, night_events: null, out_of_bed_count: 0, remsleepduration: null, rr_average: null, rr_max: null, rr_min: null, sleep_efficiency: 0.93, sleep_latency: 120, sleep_score: null, snoring: null, snoringepisodecount: null, total_sleep_time: 35340, total_timeinbed: 37800, wakeup_latency: 540, wakeupcount: 3, wakeupduration: 2460, waso: 1800, ), )], more: false, offset: 0, )
```
Informations about the sleep activity summaries of the user can be obtained in three steps:

## Step 1: Instantiate a manager

First, you need to instanciate a `WithingsSleepGetSummaryDataManager`
```dart
WithingsSleepGetSummaryDataManager withingsSleepGetSummaryDataManager = WithingsSleepGetSummaryDataManager();
```

## Step 2: Create the request url
Then, you have to create a url object that can be of two different types that fetches the sleep activity summaries:
1. `WithingsSleepAPIURL.getSummaryRange` where you have to set the:
    * `accessToken`
    * `startdateymd` in the `yyyy-mm-dd` format to define the range of time of data to be retrieved
    * `enddateymd` in the `yyyy-mm-dd` format to define the range of time of data to be retrieved

    Then, if you want, you can set the:
    * `dataFields` is a `String`: a list of of requested data fields, separated by a comma
    * `offset`, if in the previous response `more = true`, so this means that there are more data to retrieve, so set in `offset` the value of `offset` of the previous response

```dart
WithingsSleepAPIURL withingsSleepAPIURLGetSummaryRange = WithingsSleepAPIURL.getSummaryRange(
            accessToken: withingsCredentials.withingsAccessToken,
            startdateymd: '2022-09-06',
            enddateymd: '2022-09-10',
            //dataFields:'hr_average,hr_max,night_events,remsleepduration', //Not necessary
            //offset: , //Not necessary: use it if in the previous response more = true and insert here the value of offset
        );
```

2. `WithingsSleepAPIURL.getSummaryLastupdate` where you have to set the:
    * `accessToken`
    * `lastupdate` as **UNIX Timestamp** for requesting data that were updated or created after this date

    Then, if you want, you can set the:
    * `dataFields` is a `String`: a list of of requested data fields, separated by a comma
    * `offset`, if in the previous response `more = true`, so this means that there are more data to retrieve, so set in `offset` the value of `offset` of the previous response

```dart
WithingsSleepAPIURL withingsSleepAPIURLGetSummaryLastUpdate =
                WithingsSleepAPIURL.getSummaryLastupdate(
                lastupdate: 1662422035,
                accessToken: withingsCredentials.withingsAccessToken,
                //dataFields:'hr_average,hr_max,night_events,remsleepduration', //Not necessary
                //offset: , //Not necessary: use it if in the previous response more = true and insert here the value of offset
            );
```

:::warning
Specifying `dataFields` seems not necessary, cause the results with or without are the same
:::

:::tip
For more info about the `dataFields` check the Withings API documentation [Sleep - GetSummary](https://developer.withings.com/api-reference/#operation/sleepv2-getsummary) in the `Query Parameters` section.
:::

## Step 3: Get the data
Finally you can obtain the sleep activity summaries using

```dart
WithingsSleepGetSummaryData getsummaryrangesleepdata =
                await withingsSleepGetSummaryDataManager
                    .fetch(withingsSleepAPIURLGetSummaryRange);
```
or

```dart
WithingsSleepGetSummaryData getsummarylastupdatesleepdata =
                await withingsSleepGetSummaryDataManager
                    .fetch(withingsSleepAPIURLGetSummaryLastUpdate);
```
depending on the URL object.

But if you want the package to automatically handle the `offset` use the `.fetchAutoOffset`, instead of `.fetch`, of the manager, without specifying the `offset` in the field of the URL object:
```dart
WithingsSleepGetSummaryData getsummaryrangesleepdata =
                await withingsSleepGetSummaryDataManager
                    .fetchAutoOffset(withingsSleepAPIURLGetSummaryRange);
```
```dart
WithingsSleepGetSummaryData getsummarylastupdatesleepdata =
                await withingsSleepGetSummaryDataManager
                    .fetchAutoOffset(withingsSleepAPIURLGetSummaryLastUpdate);
```