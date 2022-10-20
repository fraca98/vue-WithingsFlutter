# Measure - GetActivity

::: warning
The data are only available once a synchronization occured between the device and Withings servers (which might include synchronizing with Withings mobile application or via Withings Mobile SDK).
:::

[Measure - GetActivity](https://developer.withings.com/api-reference/#operation/measurev2-getactivity) provides daily aggregated activity data of a user.

In WithingsFlutter, the response object is expressed by the `WithingsMeasureGetActivityData`. In particular, an instance of `WithingsMeasureGetActivityData` has the following fields:

```dart
/// Response status
int? status;

/// Array of objects (Activities)
List<Activities>? activities;

/// To know if there is more data to fetch or not
bool? more;

/// Offset to use to retrieve the next data
int? offset;
```
where `Activities` object is:

```dart
/// Date of the aggregated data
String? date;

/// Number of steps. (Use 'dataFields' to request this data)
int? steps;

/// Distance travelled (in meters). (Use 'dataFields' to request this data)
num? distance;

/// Number of floors climbed. (Use 'dataFields' to request this data)
num? elevation;

/// Duration of soft activities (in seconds). (Use 'dataFields' to request this data)
int? soft;

/// Duration of moderate activities (in seconds). (Use 'dataFields' to request this data)
int? moderate;

/// Duration of intense activities (in seconds). (Use 'dataFields' to request this data)
int? intense;

/// Sum of intense and moderate activity durations (in seconds). (Use 'dataFields' to request this data)
int? active;

/// Active calories burned (in Kcal). Calculated by mixing fine granularity calories estimation,
/// workouts estimated calories and calories manually set by the user. (Use 'dataFields' to request this data)
num? calories;

/// Total calories burned (in Kcal). Obtained by adding active calories and passive calories
num? totalcalories;

/// Average heart rate. (Use 'dataFields' to request this data)
int? hrAverage;

/// Minimal heart rate. (Use 'dataFields' to request this data)
int? hrMin;

/// Maximal heart rate. (Use 'dataFields' to request this data)
int? hrMax;

/// Duration in seconds when heart rate was in a light zone. (Use 'dataFields' to request this data)
int? hrZone0;

/// Duration in seconds when heart rate was in a moderate zone. (Use 'dataFields' to request this data)
int? hrZone1;

/// Duration in seconds when heart rate was in a intense zone. (Use 'dataFields' to request this data)
int? hrZone2;

/// Duration in seconds when heart rate was in a maximal zone. (Use 'dataFields' to request this data)
int? hrZone3;
```

:::tip
For more info about the `status` check the Withings API documentation [Response Status](https://developer.withings.com/api-reference#section/Response-status) section.
:::

:::tip
For more info about these values/fields check the Withings API documentation [Measure - GetActivity](https://developer.withings.com/api-reference/#operation/measurev2-getactivity) in the `Query Parameters` section.
:::

For example:
```dart
WithingsMeasureGetActivityData(status: 0, activities: [Activities(date: 2022-09-08, steps: 643, distance: 504.75, elevation: 9.79, soft: 3600, moderate: 0, intense: 0, active: 0, calories: 19.679, totalcalories: 1656.683, hr_average: null, hr_min: null, hr_max: null, hr_zone_0: null, hr_zone_1: null, hr_zone_2: null, hr_zone_3: null, ), Activities(date: 2022-09-09, steps: 11969, distance: 15090.547, elevation: 141.12, soft: 4500, moderate: 420, intense: 3780, active: 4200, calories: 1012.122, totalcalories: 2653.711, hr_average: null, hr_min: null, hr_max: null, hr_zone_0: null, hr_zone_1: null, hr_zone_2: null, hr_zone_3: null, )], more: false, offset: 0, )
```
Informations about the daily aggregated activity data of a user can be obtained in three steps:

## Step 1: Instantiate a manager

First, you need to instanciate a `WithingsMeasureGetActivityDataManager`
```dart
WithingsMeasureGetActivityDataManager
    withingsMeasureGetActivityDataManager =
    WithingsMeasureGetActivityDataManager();
```

## Step 2: Create the request url
Then, you have to create a url object that can be of two different types that fetches the daily aggregated activity data of a user:
1. `WithingsMeasureAPIURL.getActivityRange` where you have to set the:
    * `accessToken`
    * `startdateymd` in the `yyyy-mm-dd` format to define the range of time of data to be retrieved
    * `enddateymd` in the `yyyy-mm-dd` format to define the range of time of data to be retrieved

    Then, if you want, you can set the:
    * `dataFields` is a `String`: a list of of requested data fields, separated by a comma
    * `offset`, if in the previous response `more = true`, so this means that there are more data to retrieve, so set in `offset` the value of `offset` of the previous response

```dart
WithingsMeasureAPIURL withingsMeasureAPIURLGetActivityRange =
                  WithingsMeasureAPIURL.getActivityRange(
                      startdateymd: '2022-09-08',
                      enddateymd: '2022-09-09',
                      //dataFields: 'hr_average,hr_zone_0', //Not necessary
                      //offset: , //Not necessary: use it if in the previous response more = true and insert here the value of offset
                      accessToken: withingsCredentials.withingsAccessToken);
```

2. `WithingsMeasureAPIURL.getActivityLastupdate` where you have to set the:
    * `accessToken`
    * `lastupdate` as **UNIX Timestamp** for requesting data that were updated or created after this date

    Then, if you want, you can set the:
    * `dataFields` is a `String`: a list of of requested data fields, separated by a comma
    * `offset`, if in the previous response `more = true`, so this means that there are more data to retrieve, so set in `offset` the value of `offset` of the previous response

```dart
WithingsMeasureAPIURL withingsMeasureAPIURLGetActivityLastupdate =
                  WithingsMeasureAPIURL.getActivityLastupdate(
                      lastupdate: 1662335635,
                      //dataFields: 'hr_average,hr_zone_0', //Not necessary
                      //offset: , //Not necessary: use it if in the previous response more = true and insert here the value of offset
                      accessToken: withingsCredentials.withingsAccessToken);
```

:::warning
Specifying `dataFields` seems not necessary, cause the results with or without are the same
:::

:::tip
For more info about the `dataFields` check the Withings API documentation [Measure - GetActivity](https://developer.withings.com/api-reference/#operation/measurev2-getactivity) in the `Query Parameters` section.
:::

## Step 3: Get the data
Finally you can obtain the daily aggregated activity data of a user using

```dart
WithingsMeasureGetActivityData getactivityrange =
                  await withingsMeasureGetActivityDataManager
                      .fetch(withingsMeasureAPIURLGetActivityRange);
```
or

```dart
WithingsMeasureGetActivityData getactivityupate =
                  await withingsMeasureGetActivityDataManager
                      .fetch(withingsMeasureAPIURLGetActivityLastupdate);
```
depending on the URL object.

But if you want the package to automatically handle the `offset` use the `.fetchAutoOffset`, instead of `.fetch`, of the manager, without specifying the `offset` in the field of the URL object:

```dart
WithingsMeasureGetActivityData getactivityrange =
                  await withingsMeasureGetActivityDataManager
                      .fetchAutoOffset(withingsMeasureAPIURLGetActivityRange);
```
```dart
WithingsMeasureGetActivityData getactivityupate =
                  await withingsMeasureGetActivityDataManager
                      .fetchAutoOffset(withingsMeasureAPIURLGetActivityLastupdate);
```