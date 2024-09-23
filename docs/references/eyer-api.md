---
sidebar_position: 2
---

# Eyer APIs

Check out the [Eyer Query - API Swagger definition](https://boomi.eyer.ai/api/v2/swagger.json).

## Eyer Query API - current anomaly alerts
For current active alerts, use query this API:

```
https://boomi.eyer.ai/api/v2/anomalies/current
```

This api will return all active anomaly alerts, with their current state and timestamps

**Authentication**: use “Authorization” in your HTTP header with your query key.

 

**Example response**


```json
[
  {
    "severity": "severe",
    "event_type": "updated",
    "event_occured": "2024-07-08T08:44:00Z",
    "id": "668b9abe6ea102403a5263c8",
    "items": [
      {
        "node": {
          "id": 101,
          "name": "Operating System. http://10.0.1.161:8778/jolokia",
          "system": {
            "id": 1,
            "name": "http://10.0.1.161:8778/jolokia"
          }
        },
        "metrics": [
          {
            "id": "5523ee20-2af2-4b8e-8390-3d2cb4410018",
            "name": "System CPU Load",
            "metric_type": "double",
            "aggregation": "avg",
            "severity": "severe",
            "started": "2024-07-08T07:53:00Z",
            "updated": "2024-07-08T08:44:00Z"
          },
          {
            "id": "631bf72c-0b1a-4f74-929c-d60360a71896",
            "name": "Heap Memory Usage Used",
            "metric_type": "int",
            "aggregation": "avg",
            "severity": "severe",
            "started": "2024-07-08T07:53:00Z",
            "updated": "2024-07-08T08:44:00Z"
          },
          {
            "id": "03b83be9-fe34-44bc-9938-7496fb09b931",
            "name": "Heap Memory Usage Init",
            "metric_type": "int",
            "aggregation": "avg",
            "severity": "severe",
            "started": "2024-07-08T08:43:00Z",
            "updated": "2024-07-08T08:44:00Z"
          },
          {
            "id": "2ce746c5-1ee3-45d1-b23f-bae56bc5d51a",
            "name": "Committed Virtual Memory Size",
            "metric_type": "int",
            "aggregation": "avg",
            "severity": "severe",
            "started": "2024-07-08T08:43:00Z",
            "updated": "2024-07-08T08:44:00Z"
          },
          {
            "id": "8edca7a9-b9aa-487b-a68c-ddaf18393a3d",
            "name": "Total Physical Memory Size",
            "metric_type": "int",
            "aggregation": "avg",
            "severity": "severe",
            "started": "2024-07-08T08:43:00Z",
            "updated": "2024-07-08T08:44:00Z"
          },
          {
            "id": "324b4bb1-cf29-4dce-9539-479d8b3bb41b",
            "name": "Heap Memory Usage Committed",
            "metric_type": "int",
            "aggregation": "avg",
            "severity": "severe",
            "started": "2024-07-08T08:43:00Z",
            "updated": "2024-07-08T08:44:00Z"
          },
          {
            "id": "ffa247d5-b819-4985-80cd-38bb4153eeda",
            "name": "Heap Memory Usage Max",
            "metric_type": "int",
            "aggregation": "avg",
            "severity": "severe",
            "started": "2024-07-08T08:43:00Z",
            "updated": "2024-07-08T08:44:00Z"
          }
        ]
    }
]

```

## Eyer Query API - anomaly alert history

To retrieve the complete history for a specific anomaly alert, use this:
```
https://boomi.eyer.ai/api/v2/anomalies/{id}
```

This api will return the complete history of the selected anomaly alert.

**Authentication**: use “Authorization” in your HTTP header with your query key.

 

**Example response**
```json

[
  {
    "severity": "medium",
    "event_type": "updated",
    "event_occured": "2024-07-11T07:28:00Z",
    "id": "668f1d1a6ea102403a5298b5",
    "items": [
      {
        "node": {
          "id": 144,
          "name": "Execution Manager. http://10.0.1.10:8778/jolokia",
          "system": {
            "id": 4,
            "name": "http://10.0.1.10:8778/jolokia"
          }
        },
        "metrics": [
          {
            "id": "50060171-414b-4cbd-8534-5b0d9338c86b",
            "name": "Average Execution Time",
            "metric_type": "int",
            "aggregation": "avg",
            "severity": "severe",
            "started": "2024-07-10T23:42:00Z",
            "updated": "2024-07-11T00:12:00Z"
          },
          {
            "id": "0dee40ce-19bf-4717-ac9e-1465f8c62cf3",
            "name": "Running Execution Estimated Count",
            "metric_type": "int",
            "aggregation": "avg",
            "severity": "severe",
            "started": "2024-07-11T07:23:00Z",
            "updated": "2024-07-11T07:28:00Z"
          }
        ]
      }
    ]
  }
]
```

## List all the nodes in your Eyer environment
To list out all the nodes in your Eyer environment, use this API
```
GET https://topology.eyer.ai/api/definitions/nodes
```

Add an “Authorization” header that contains your Eyer query key. The result will contain all nodes and metrics with their corresponding IDs, example shown below:

```json
{
    "node_id": 2,
    "name": "Execution Manager. undefined",
    "type": "Execution Manager",
    "type_id": "boomi.v1.executionmanager",
    "system": null,
    "system_type": "booomi.telegraf.v1",
    "system_type_id": "booomi.telegraf.v1",
    "meta": {
        "atom_id": 273248879074406
    },
    "stats": [
        {
            "id": "b0ea4cd2-823f-4539-be9a-6a3ef3365944",
            "name": "fields.AverageExecutionQueueTime_mean",
            "display_name": "Average Execution Queue Time",
            "aggregation": "avg",
            "node_aggregation": "avg",
            "unit_type": "int"
        },
        {
            "id": "50060171-414b-4cbd-8534-5b0d9338486b",
            "name": "fields.AverageExecutionTime_mean",
            "display_name": "Average Execution Time",
            "aggregation": "avg",
            "node_aggregation": "avg",
            "unit_type": "int"
        },
        {
            "id": "27dad857-3cc3-4daf-8671-114478579f04",
            "name": "fields.LocalRunningWorkersCount_mean",
            "display_name": "Local Running Workers Count",
            "aggregation": "avg",
            "node_aggregation": "avg",
            "unit_type": "int"
        },
        {
            "id": "038575d8-b21b-4a98-8ff6-08330f1bf0aa",
            "name": "fields.MaxQueuedExecutions_mean",
            "display_name": "Max Queued Executions",
            "aggregation": "avg",
            "node_aggregation": "avg",
            "unit_type": "int"
        },
        {
            "id": "80c9b07c-d11a-4857-a6b4-323a313bd9ef",
            "name": "fields.QueuedExecutionEstimatedCount_mean",
            "display_name": "Queued Execution Estimated Count",
            "aggregation": "avg",
            "node_aggregation": "avg",
            "unit_type": "int"
        },
        {
            "id": "78bc03c6-cb20-4937-a15d-8dc8beabeb12",
            "name": "fields.QueuedExecutionTimeout_mean",
            "display_name": "Queued Execution Timeout",
            "aggregation": "avg",
            "node_aggregation": "avg",
            "unit_type": "int"
        },
        {
            "id": "0dee40ce-19bf-4717-ac9e-1456f8c62cf3",
            "name": "fields.RunningExecutionEstimatedCount_mean",
            "display_name": "Running Execution Estimated Count",
            "aggregation": "avg",
            "node_aggregation": "avg",
            "unit_type": "int"
        }
    ]
}
```


## Grafana dashboard generation API
Use the following API to generate a Grafana dashboard template based on the metrics you input.

```
POST https://topology.eyer.ai/api/dashboard-generator
```

To use this API, make sure you add an “Authorization” header containing your Eyer query key.

Before you do a POST on this API, you need to list all the metrics available in your environment by using the List all nodes in your Eyer environment API. Pick the metrics you are interested in and note down their node ID and metric ID.

Based on the list you just created, you need to create a JSON body in the following format that you will use when you POST to the dashboard API. You can add as many metrics as you like.

```json
[
    {
        "node_id": 169,
        "stat_id": "52610e96-d94f-49ca-a6b6-c2e33ff22ba8"
    },
    {
        "node_id": 170,
        "stat_id": "52610e96-d94f-49ca-a6b6-c2e33ff22ba8"
    }
]
```

The response you get will be in the Grafana structure, ready to be imported. 


## Eyer Query API - anomaly alerts with metrics
To retrieve all anomaly alerts within a set timeframe, with metric values and baseline values for the time of the alert.

```

https://boomi.eyer.ai/api/anomalies-with-metrics?from=2024-09-12T05:15:00Z&to=2024-09-12T08:00:00Z
```

If the timeframe contains the start of an alert, if will return the initial alert. If the timeframe contains just an update or closed status, it will return “updated” or “closed” status of the alert.

**Authentication**: use “Authorization” in your HTTP header with your query key.

**From / to time range**: add as parameters in the format “2024-08-05T07:00:00Z”

“Smoothened” value is the value that is processed by the ML (might be a bit different compared to the raw value), which is then used to check if the value is inside any of the baseline limits (main, secondary and aux).

 

**Example response**

```json
{
  "new": [
    {
      "severity": "medium",
      "started": "2024-09-12T05:00:00Z",
      "ended": null,
      "updated": "2024-09-12T07:00:00Z",
      "id": "66e28c061f5cf9aa3c336b06",
      "items": [
        {
          "node": {
            "id": 178,
            "name": "MoveRealtime_LowFrequency",
            "system": {
              "id": 3,
              "name": null
            }
          },
          "metrics": [
            {
              "id": "cecc2e22-e245-44b4-9146-673578b3bc88",
              "name": "Elapsed Time",
              "metric_type": "double",
              "aggregation": "avg",
              "severity": "severe",
              "started": "2024-09-12T04:01:00Z",
              "updated": "2024-09-12T06:00:00Z",
              "data": []
            },
            {
              "id": "9d980715-dead-40ba-a410-ac9813f2bf8d",
              "name": "Max Elapsed Time",
              "metric_type": "double",
              "aggregation": "max",
              "severity": "severe",
              "started": "2024-09-12T04:01:00Z",
              "updated": "2024-09-12T06:00:00Z",
              "data": []
            },
            {
              "id": "507046a7-693f-4338-b30d-0f7ea6867e4b",
              "name": "Launch Elapsed Time",
              "metric_type": "double",
              "aggregation": "avg",
              "severity": "severe",
              "started": "2024-09-12T04:01:00Z",
              "updated": "2024-09-12T07:00:00Z",
              "data": []
            }
          ]
        }
      ]
    },
    {
      "severity": "low",
      "started": "2024-09-11T20:15:00Z",
      "ended": null,
      "updated": "2024-09-12T05:05:00Z",
      "id": "66e1faa01f5cf9aa3c336986",
      "items": [
        {
          "node": {
            "id": 101,
            "name": "Operating System. http://10.0.1.161:8778/jolokia",
            "system": {
              "id": 1,
              "name": "http://10.0.1.161:8778/jolokia"
            }
          },
          "metrics": [
            {
              "id": "2ce746c5-1ee3-45d1-b23f-bae56bc5d51a",
              "name": "Committed Virtual Memory Size",
              "metric_type": "int",
              "aggregation": "avg",
              "severity": "medium",
              "started": "2024-09-11T20:14:00Z",
              "updated": "2024-09-11T20:15:00Z",
              "data": [
                {
                  "timestamp": "2024-09-11T20:15:00Z",
                  "received": null,
                  "smoothened": 429216768,
                  "corridors": {
                    "main": {
                      "up": 614704576,
                      "down": 443334400
                    },
                    "secondary": {
                      "up": 614704576,
                      "down": 350406816
                    },
                    "aux": {
                      "up": 614704576,
                      "down": 443334400
                    }
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  "updated": [],
  "closed": []
}

```

## Eyer Query API - unread anomaly alerts

To retrieve all unread anomaly alerts. The Boomi connector utilizes this API.

```
https://boomi.eyer.ai/api/v2/anomalies/unread
```

For every query, the time pointer will be moved to the time of the query. Next query will then get all anomaly alerts since last query.

**Authentication**: use “Authorization” in your HTTP header with your query key.

 
**Example response**

```json
[
  {
    "severity": "medium",
    "event_type": "updated",
    "event_occured": "2024-07-11T07:28:00Z",
    "id": "668f1d1a6ea102403a5298b5",
    "items": [
      {
        "node": {
          "id": 144,
          "name": "Execution Manager. http://10.0.1.10:8778/jolokia",
          "system": {
            "id": 4,
            "name": "http://10.0.1.10:8778/jolokia"
          }
        },
        "metrics": [
          {
            "id": "50060171-414b-4cbd-8534-5b0d9338c86b",
            "name": "Average Execution Time",
            "metric_type": "int",
            "aggregation": "avg",
            "severity": "severe",
            "started": "2024-07-10T23:42:00Z",
            "updated": "2024-07-11T00:12:00Z"
          },
          {
            "id": "0dee40ce-19bf-4717-ac9e-1465f8c62cf3",
            "name": "Running Execution Estimated Count",
            "metric_type": "int",
            "aggregation": "avg",
            "severity": "severe",
            "started": "2024-07-11T07:23:00Z",
            "updated": "2024-07-11T07:28:00Z"
          }
        ]
      }
    ]
  }
]

```

## Eyer ingress API - add new data sources support

The Eyer ingress API is highly flexible, and can receive metrics and meta-data from any data source as long as the data transmitted is in JSON format.

For now, registering a new data source type with Eyer involves a manual process, the process is outlined below.

1. You need to be able to extract the metrics you want to monitor from the data source (application / system / sensor etc) and be able to store / send the data in JSON. This can be done by open source agents such as Telegraf or Prometheus, or by coding / scripting your own data collector.

2. The data output should be aggregated to a minimum of 1 minute. Lower resolutions are accepted. Example: you read a metric every 5 second, and aggregate it over 1 minute (select max, min, avg etc) before you output it.

3. The JSON output should have:

    a. metrics metadata like name / id and aggregation (avg, sum, mean etc) and with Unix timestamps. 

    b. If you want to group metrics by area / type, this information should also be included (for instance CPU and RAM used is grouped under “Operating System”).

4. Send the data format and an example output file to Eyer, with an explanation of the format, metrics and the grouping you want to be applied. For more complex data structures (nested structures) we can also do a quick meeting to ensure compatibility.

5. Eyer will add the new data source mapping and expose the API for the new data source. 

 

Below you see an example JSON data structure, which is used to collect Boomi process performance metrics


```json
{"fields":{"executionDuration_count":1,"executionDuration_max":46711,"executionDuration_mean":46711,"inboundDocumentCount_count":1,"inboundDocumentCount_max":1,"inboundDocumentCount_mean":1,"inboundDocumentSize_count":1,"inboundDocumentSize_max":4809,"inboundDocumentSize_mean":4809,"inboundErrorDocumentCount_count":1,"inboundErrorDocumentCount_max":1,"inboundErrorDocumentCount_mean":1,"outboundDocumentCount_count":1,"outboundDocumentCount_max":6,"outboundDocumentCount_mean":6,"outboundDocumentSize_count":1,"outboundDocumentSize_max":101008,"outboundDocumentSize_mean":101008},"name":"file","tags":{"atomId":"00bcb194-ed9a-44cc-8748-04a021659871","host":"DESKTOP-S01F7CP","processName":"FollowAnomalyAlert"},"timestamp":1722841500}
```

This is a flat metric structure, with a single grouping extracted from the “tags” section (processName and atomId form a unique identifier per process). The timestamp for the metric collection is provided in the Unix format.