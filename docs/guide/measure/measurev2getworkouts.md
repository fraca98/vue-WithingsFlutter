# Measure - GetWorkouts

::: warning
The data are only available once a synchronization occured between the device and Withings servers (which might include synchronizing with Withings mobile application or via Withings Mobile SDK).
:::

::: danger
This function seems to not return **some** data. Work in progress to understand why.
:::

[Measure - GetWorkouts](https://developer.withings.com/api-reference#operation/measurev2-getworkouts) returns workout summaries, which are an aggregation all data that was captured during that workout.

:::tip
Use the [Measure - GetIntradayActivity](/WithingsFlutter/guide/measure/measurev2getintradayactivity) to get the high frequency data used to build this summary.
:::

In WithingsFlutter, the response object is expressed by the `WithingsMeasureGetWorkoutsData`. In particular, an instance of `WithingsMeasureGetWorkoutsData` has the following fields:

```dart
/// Response status
int? status;

/// List of objects SeriesMeasureGetworkouts
List<SeriesMeasureGetworkouts>? series;

/// To know if there is more data to fetch or not
bool? more;

/// Offset to use to retrieve the next data
int? offset;
```
where `SeriesMeasureGetworkouts` object is:

```dart
/// Category of workout
int? category;

/// The starting datetime for workouts data
int? startdate;

/// The ending datetime for workouts data
int? enddate;

/// Date at which the measure was taken or entered
String? date;

/// Object (Details of workout)
DataMeasureGetworkouts? data;
```

where `DataMeasureGetworkouts` object is:
```dart
/// Total pause time in seconds detected by Withings device (swim only)
int? algoPauseDuration;

/// Active calories burned (in Kcal). (Use 'data_fields' to request this data)
int? calories;

/// Distance travelled (in meters). (Use 'data_fields' to request this data)
int? distance;

/// Number of floors climbed. (Use 'data_fields' to request this data)
int? elevation;

/// Average heart rate. (Use 'data_fields' to request this data)
int? hrAverage;

/// Maximal heart rate. (Use 'data_fields' to request this data)
int? hrMax;

/// Minimal heart rate. (Use 'dataFields' to request this data)
int? hrMin;

/// Duration in seconds when heart rate was in a light zone. (Use 'dataFields' to request this data)
int? hrZone0;

/// Duration in seconds when heart rate was in a moderate zone. (Use 'dataFields' to request this data)
int? hrZone1;

/// Duration in seconds when heart rate was in a intense zone. (Use 'dataFields' to request this data)
int? hrZone2;

/// Duration in seconds when heart rate was in a maximal zone. (Use 'dataFields' to request this data)
int? hrZone3;

/// Intensity of the workout, from 0 to 100, as inputed by the user.
/// If the user didn't manually give the intensity of his workout, the value will be 0.
int? intensity;

/// Active calories burned manually entered by user (in Kcal). (Use 'dataFields' to request this data)
int? manualCalories;

/// Distance travelled manually entered by user (in meters). (Use 'dataFields' to request this data)
int? manualDistance;

/// Total pause time in second filled by user
int? pauseDuration;

/// Number of pool laps. (Use 'dataFields' to request this data)
int? poolLaps;

/// Length of the pool. (Use 'dataFields' to request this data.)
int? poolLength;

/// Average percent of SpO2 percent value during a workout
int? spo2Average;

/// Number of steps. (Use 'dataFields' to request this data)
int? steps;

/// Number of strokes. (Use 'dataFields' to request this data)
int? strokes;
```
:::tip
For more info about the `status` check the Withings API documentation [Response Status](https://developer.withings.com/api-reference#section/Response-status) section.
:::

:::tip
For more info about these values/fields check the Withings API documentation [Measure - GetWorkouts](https://developer.withings.com/api-reference#operation/measurev2-getworkouts) in the `Query Parameters` section.
:::

For example:
```dart
WithingsMeasureGetWorkoutsData(status: 0, series: [SeriesMeasureGetworkouts(category: 2, startdate: 1662739020, enddate: 1662741840, date: 2022-09-09, data: null, ), SeriesMeasureGetworkouts(category: 1, startdate: 1662741900, enddate: 1662742200, date: 2022-09-09, data: null, ), SeriesMeasureGetworkouts(category: 2, startdate: 1662742260, enddate: 1662743760, date: 2022-09-09, data: null, )], more: false, offset: 0, )
```
:::warning
As said before, the object `DataMeasureGetworkouts` (alias `data`) is returned null. Work in progress to understand why.
:::

Informations about the workout summaries can be obtained in three steps:

## Step 1: Instantiate a manager

First, you need to instanciate a `WithingsMeasureGetActivityDataManager`
```dart
WithingsMeasureGetWorkoutsDataManager
    withingsMeasureGetWorkoutsDataManager =
    WithingsMeasureGetWorkoutsDataManager();
```

## Step 2: Create the request url
Then, you have to create a url object that can be of two different types that fetches the daily aggregated activity data of a user:
1. `WithingsMeasureAPIURL.getWorkoutsRange` where you have to set the:
    * `accessToken`
    * `startdateymd` in the `yyyy-mm-dd` format to define the range of time of data to be retrieved
    * `enddateymd` in the `yyyy-mm-dd` format to define the range of time of data to be retrieved

    Then, if you want, you can set the:
    * `dataFields` is a `String`: a list of of requested data fields, separated by a comma
    * `offset`, if in the previous response `more = true`, so this means that there are more data to retrieve, so set in `offset` the value of `offset` of the previous response

```dart
WithingsMeasureAPIURL withingsMeasureAPIURLGetWorkoutsRange =
                  WithingsMeasureAPIURL.getWorkoutsRange(
                accessToken: withingsCredentials.withingsAccessToken,
                startdateymd: '2022-09-09',
                enddateymd: '2022-09-14',
                //offset: , //Not necessary: use it if in the previous response more = true and insert here the value of offset
                //dataFields: 'calories, intensity', //Not necessary
              );
```

2. `WithingsMeasureAPIURL.getActivityLastupdate` where you have to set the:
    * `accessToken`
    * `lastupdate` as **UNIX Timestamp** for requesting data that were updated or created after this date

    Then, if you want, you can set the:
    * `dataFields` is a `String`: a list of of requested data fields, separated by a comma
    * `offset`, if in the previous response `more = true`, so this means that there are more data to retrieve, so set in `offset` the value of `offset` of the previous response

```dart
WithingsMeasureAPIURL withingsMeasureAPIURLGetWorkoutsLastupdate =
                  WithingsMeasureAPIURL.getWorkoutsLastupdate(
                accessToken: accessToken!,
                lastupdate: 1662608537,
                //offset: , //Not necessary: use it if in the previous response more = true and insert here the value of offset
                //dataFields: 'calories, intensity', //Not necessary
              );
```

:::tip
For more info about the `dataFields` check the Withings API documentation [Measure - GetWorkouts](https://developer.withings.com/api-reference#operation/measurev2-getworkouts) in the `Query Parameters` section.
:::

## Step 3: Get the data
Finally you can obtain the daily aggregated activity data of a user using

```dart
WithingsMeasureGetWorkoutsData getworkoutrange =
                  await withingsMeasureGetWorkoutsDataManager
                      .fetch(withingsMeasureAPIURLGetWorkoutsRange);
```
or

```dart
WithingsMeasureGetWorkoutsData getworkoutupdate =
                  await withingsMeasureGetWorkoutsDataManager
                      .fetch(withingsMeasureAPIURLGetWorkoutsLastupdate);   
```
depending on the URL object.

But if you want the package to automatically handle the `offset` use the `.fetchAutoOffset`, instead of `.fetch`, of the manager, without specifying the `offset` in the field of the URL object:

```dart
WithingsMeasureGetWorkoutsData getworkoutrange =
                  await withingsMeasureGetWorkoutsDataManager
                      .fetchAutoOffset(withingsMeasureAPIURLGetWorkoutsRange);
```

```dart
WithingsMeasureGetWorkoutsData getworkoutupdate =
                  await withingsMeasureGetWorkoutsDataManager
                      .fetchAutoOffset(withingsMeasureAPIURLGetWorkoutsLastupdate); 
```