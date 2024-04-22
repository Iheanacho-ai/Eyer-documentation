---
sidebar_position: 1
---

# Overview

## What is Eyer?
Eyer is an AI-powered observability tool designed to seamlessly integrate with your existing Boomi connections. It provides real-time insights and transparency across your entire integration landscape, empowering you to proactively manage and optimize your Boomi processes.



## How Eyer onboards, preprocesses, and filters data
Once a week, we perform a full scan of all the metrics to determine which series are producing data, their frequency, and the frequency of value changes. 

During this weekly scan, we onboard new environments and resources into the machine learning pipeline. This process occurs on a set schedule every week, specifically during the night between Saturday and Sunday. New environments are onboarded on the first Sunday after being active (produced data) for at least six days. Similarly, new metrics are introduced on the first Sunday after they've produced sufficient data (the amount of data can vary depending on the unique behaviour of the metric, but the minimum is seven data points on average in the last seven days). 

During the initial week of anomaly detection, there may be instances of false positives for newly added metrics within an existing environment. This approach optimizes our computational resources. We employ more intricate algorithms for rapidly changing metrics and lighter-weight algorithms for stable ones. The analysis does not include inactive metrics (time series with no data points in the last seven days).


After thoroughly scanning all the time series data, including their frequency and the frequency of value changes (activity), we classify them into three groups based on their frequency and activity. These classification groups are:


**High Frequency High activity:** Time series with data points registered more frequently than every 15 minutes and values that change more frequently than every 15 minutes.


**High Frequency Low Activity:** Time series with data points registered more frequently than every 15 minutes and that change values every 15 minutes or more slowly.

**Low Frequency** Time series with data points coming in with a typical interval bigger than 15 minutes. 

This analysis can be time-consuming and computationally intensive. Therefore, it is done once per week. We will use the values that have already been calculated for the rest of the week.

