# Measure - GetIntradayActivity

::: warning
The data are only available once a synchronization occured between the device and Withings servers (which might include synchronizing with Withings mobile application or via Withings Mobile SDK).
:::

[Measure - GetIntradayActivity](https://developer.withings.com/api-reference#operation/measurev2-getintradayactivity) returns user activity data captured at high frequency.

In WithingsFlutter, the response object is expressed by the `WithingsMeasureGetIntradayactivityData`. In particular, an instance of `WithingsMeasureGetIntradayactivityData` has the following fields:

```dart
/// Response status
int? status;

/// List of ObjGetIntradayAcitvity
List<ObjGetIntradayAcitvity>? series;
```
where `ObjGetIntradayAcitvity` object is:

```dart
/// Epoch value of the intraday data
int? timestamp;

/// Number of steps. (Use 'dataFields' to request this data)
int? steps;

/// Number of floors climbed. (Use 'dataFields' to request this data)
int? elevation;

/// Estimation of active calories burned (in Kcal). (Use 'dataFields' to request this data)
num? calories;

/// Distance travelled (in meters). (Use 'dataFields' to request this data)
num? distance;

/// Number of strokes performed. (Use 'dataFields' to request this data)
int? stroke;

/// Number of pool_lap performed. (Use 'dataFields' to request this data)
int? poolLap;

/// Duration of the activity (in seconds). (Use 'dataFields' to request this data)
int? duration;

/// Measured heart rate. (Use 'dataFields' to request this data)
int? heartRate;

/// SpO2 measurement automatically tracked by a device tracker. (Use 'dataFields' to request this data)
num? spo2Auto;
```
:::tip
For more info about the `status` check the Withings API documentation [Response Status](https://developer.withings.com/api-reference#section/Response-status) section.
:::

:::tip
For more info about these values/fields check the Withings API documentation [Measure - GetIntradayActivity](https://developer.withings.com/api-reference#operation/measurev2-getintradayactivity) in the `Query Parameters` section.
:::

For example:
```dart
WithingsMeasureGetIntradayactivityData(status: 0, series:  [ObjGetIntradayActivity(timestamp:  1662739020, steps:  43, elevation:  0, calories:  1.23, distance:  35.66, stroke:  null, poolLap:  null, duration:  60, heartRate:  null, spo2Auto:  null, ), ..., ObjGetIntradayActivity(timestamp:  1662745919, steps:  null, elevation:  null, calories:  null, distance:  null, stroke:  null, poolLap:  null, duration:  64, heartRate:  64, spo2Auto:  null, )], )
```

Informations about the user activity data captured at high frequency can be obtained in three steps:

## Step 1: Instantiate a manager

First, you need to instanciate a `WithingsMeasureGetIntradayactivityDataManager`
```dart
WithingsMeasureGetIntradayactivityDataManager
                  withingsMeasureGetIntradayactivityDataManager =
                  WithingsMeasureGetIntradayactivityDataManager();
```

## Step 2: Create the request url
Then, you have to create a url object, `WithingsHeartAPIURL.get`, that fetches the user activity data captured at high frequency, given the:
* `access token`

Then, if you want, set:
* the `startdate` and `enddate` as **UNIX Timestamp** to define the range of time of data you want to retrieve
* `dataFields` is a `String`: a list of requested equested data fields (separated by a comma)

For example:
```dart
WithingsMeasureAPIURL WithingsMeasureAPIURLGetIntradayactivity =
                  WithingsMeasureAPIURL.getIntradayactivity(
                accessToken: accessToken!,
                //startdate: 1662738923, //Not necessary
                //enddate: 1662746123, //Not necessary
                //dataFields: 'heart_rate', //Not necessary: gives only these value and not all in the response
              );
```

:::warning
If your input `startdate` and `enddate` are separated by more than 24h, only the first 24h after `startdate` will be returned.
:::

:::warning
If no `startdate` and `enddate` are passed as parameters, the most recent activity data will be returned.
:::

:::warning
Defined the field `dataFields`, the response will contain only the data of the `dataFields` type.
:::

:::tip
For more info about the `dataFields` check the Withings API documentation [Measure - GetIntradayActivity](https://developer.withings.com/api-reference#operation/measurev2-getintradayactivity) in the `Query Parameters` section.
:::

## Step 3: Get the data
Finally you can obtain the user activity data captured at high frequency using

```dart
WithingsMeasureGetIntradayactivityData getintradayactivity =
                  await withingsMeasureGetIntradayactivityDataManager
                      .fetch(WithingsMeasureAPIURLGetIntradayactivity);
```