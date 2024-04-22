---
sidebar_position: 1
---

# Overview

## What is Eyer?
Eyer is an AI-powered observability tool designed to seamlessly integrate with your existing Boomi connections. It provides real-time insights and transparency across your entire integration landscape, empowering you to proactively manage and optimize your Boomi processes.



## How Eyer onboards, preprocesses, and filters data
Once per week, we perform a full scan of all the metrics to determine which series are producing data, at what frequency, and how often the value changes. This step also onboards new environments and resources connected to the machine learning pipeline. It is happening on a schedule, every week, the night between Saturday and Sunday. The new environment will be onboarded on the first Sunday after they have been active (produced data) for at least six days, and new metrics will be onboarded on the first Sunday after they have been producing enough data (the amount of data can vary depending on the unique behaviour of the metric, but an absolute minimum is 7 data points on average in the last seven days). The first week of anomaly detection might produce false positives for new metrics added to a pre-existing environment.

This is done to optimise our computational resources. We use more complex algorithms for rapidly changing metrics and lighter-weight algorithms for stable metrics. Non-active metrics are not considered for analysis (time series with no data points in the last seven days).

Every week, we do a full scan of all the time series and how they have been behaving in the past seven days. We identify the typical rate at which the data come in (frequency) and how often they change (activity). Then, each time series is classified according to frequency and activity into three main groups:

**High Frequency High activity:** Time series with data points registered more frequently than every 15 minutes and that change values more frequently than every 15 minutes. 

**High Frequency Low Activity:** Time series with data points registered more frequently than every 15 minutes and that change values every 15 minutes or more slowly.

**Low Frequency** Time series with data points coming in with a typical interval bigger than 15 minutes. 

This can be time-consuming and computationally intensive. Therefore, it is done once per week. During the rest of the week, we will use the already calculated values.