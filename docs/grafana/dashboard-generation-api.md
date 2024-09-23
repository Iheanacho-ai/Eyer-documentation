---
sidebar_position: 1
---
# Dashboard generation API 

Use the following API with POST to generate a Grafana dashboard template based on the metrics you input.

```
POST https://topology.eyer.ai/api/dashboard-generator
```

To use this API, make sure you add an “Authorization” header containing your Eyer query key.

Before you do a POST on this API, you need to list all the metrics available in your environment by using the nodes API, please see the following article List all nodes in your Eyer environment . Pick the metrics you are interested in and note down their node ID and metric ID.

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