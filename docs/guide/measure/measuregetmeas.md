# Measure - GetMeas

::: warning
The data are only available once a synchronization occured between the device and Withings servers (which might include synchronizing with Withings mobile application or via Withings Mobile SDK).
:::

[Measure - GetMeas](https://developer.withings.com/api-reference/#operation/measure-getmeas) provides measures stored at a specific date.

::: warning
The measures reported seems to be the **manually recorded** measures by the user or when the user **requests a specific test/measure, starting a test** (ex. ECG, SPO2) using the device.
:::

In WithingsFlutter, the response object is expressed by the `WithingsMeasureGetMeasData`. In particular, an instance of `WithingsMeasureGetMeasData` has the following fields:

```dart
/// Response status
int? status;

/// Array of measure group
List<Measuregrps>? measuregrps;
```
where `Measuregrps` object is:

```dart
/// UNIX timestamp when measures were taken
int? date;

/// Category for the measures in the group (see category input parameter)
int? category;

/// List of single measures
List<SingleMeas>? measures;
```
where `SingleMeas` object is:

```dart
/// Type of the measure. See meastypes input parameter
int? type;

/// Value for the measure in S.I. units (kilograms, meters etc...).
double? value;
```
:::tip
For more info about the `status` check the Withings API documentation [Response Status](https://developer.withings.com/api-reference#section/Response-status) section.
:::

:::tip
For more info about the values check the the Withings API documentation [Measure - GetMeas](https://developer.withings.com/api-reference/#operation/measure-getmeas) in the `Query Parameters` section.
:::

For example:
```dart
WithingsMeasureGetMeasData(status: 0, measuregrps: [Measuregrps(date: 1662859383, category: 1, measures: [SingleMeas(type: 54, value: 96.0, )], ), Measuregrps(date: 1662859346, category: 1, measures: [SingleMeas(type: 54, value: 100.0, )], ), Measuregrps(date: 1662859029, category: 1, measures: [SingleMeas(type: 11, value: 44.0, ), SingleMeas(type: 135, value: 93.0, ), SingleMeas(type: 136, value: 163.0, ), SingleMeas(type: 137, value: 433.0, ), SingleMeas(type: 138, value: 370.0, )], )], )
```

Informations about the measures stored at a specific date can be obtained in three steps:

## Step 1: Instantiate a manager

First, you need to instanciate a `WithingsMeasureGetMeasDataManager`
```dart
WithingsMeasureGetMeasDataManager withingsMeasureGetMeasDataManager = WithingsMeasureGetMeasDataManager();
```

## Step 2: Create the request url

Then, you have to create a url object that can be of two different types that fetches the measures stored at a specific date:

1. `WithingsMeasureAPIURL.getMeasRange` where you have to set the:
    * `accessToken`
    * `startdate` as **UNIX Timestamp** to define the range of time of measures to be retrieved
    * `enddate` as **UNIX Timestamp** to define the range of time of measures to be retrieved

    Then, if you want, you can set the:
    * `meastypes` is a `String`: a list of requested measure types (separated by a comma)
    * `category` and set `1` for real measures, `2` for user objectives


For example:
```dart
WithingsMeasureAPIURL withingsMeasureAPIURLGetMeasRange =
                  WithingsMeasureAPIURL.getMeasRange(
                startdate: 1662857663,
                enddate: 1662882863,
                //meastypes: '11, 54', //Not necessary
                category: 1, //Not necessary
                accessToken: withingsCredentials.withingsAccessToken,
              );
```
2. `WithingsMeasureAPIURL.getMeasLastupdate` where you have to set the:
    * `accessToken`
    * `lastupdate` as **UNIX Timestamp** for requesting data that were updated or created after this date

    Then, if you want, you can set the:
    * `meastypes` is a `String`: a list of requested measure types (separated by a comma)
    * `category` and set `1` for real measures, `2` for user objectives


For example:
```dart
WithingsMeasureAPIURL withingsMeasureAPIURLGetMeasLastupdate =
                  WithingsMeasureAPIURL.getMeasLastupdate(
                lastupdate: 1662920834,
                //meastypes: '11, 54', //Not necessary
                //category: 1, //Not necessary
                accessToken: withingsCredentials.withingsAccessToken,
              );
```

::: warning
The field `meastypes` seems not to be useful, cause the results with or without are the same 
:::

::: tip
For more info about the `meastypes` values check the Withings API documentation [Measure - GetMeas](https://developer.withings.com/api-reference/#operation/measure-getmeas) in the `Query Parameters` section.
:::

## Step 3: Get the data

Finally you can obtain the measures stored at a specific date using

```dart
WithingsMeasureGetMeasData getmeasrange =
                  await withingsMeasureGetMeasDataManager
                      .fetch(withingsMeasureAPIURLGetMeasRange);
```
or

```dart
WithingsMeasureGetMeasData getmeasupdate =
                  await withingsMeasureGetMeasDataManager
                      .fetch(withingsMeasureAPIURLGetMeasLastupdate);
```
depending on the URL object.