---
sidebar_position: 9
---

# F1 Performance tests anomaly detection algorithm

## Test August 2024 - Cyclical data
**Summary of the results:** This test was conducted using a portion of the Server Machine Dataset, which showed strong daily cyclicality. By applying labeling that captured the major deviations from this cyclical pattern, we achieved an F1 score of 0.86. More details can be found here: [Note on F1 performance testing of the core algorithm of Eyer](docs/features/note-f1-performance.md).

## Test type
Calculation of the F1 score, recall (R) and precision (P) 

```
F1 = 2*R*P / (R+P)
R= truePositives/(truePositives + falseNegatives)
P =truePositives/(truePositives +falsePositives) 
```

the closer to 1 the F1 score is, the better is the performance of an algorithm. R equal 1 means that all the real anomalies are detected. P close to 1 means that we have few false positive alerts.

Real anomalies are defined by labels, that are used in the test. Our algorithm does not utilize labels in the training phase, since it is of unsupervised type.

## Data used
We used metrics with a prominent daily cyclical behavior coming from an open source dataset: Server Machine Dataset.

We used 2 different labelings:

**labeling 1**: focusing only on certain type of anomalies, original labeling in the open dataset.

**labeling 2**: more extended labeling, labeling as anomalous all the deviations from the cyclical daily behavior.

## Results
We present the results of the analysis for labelling 2, using only critical anomalies, and the first 4 weeks of the data for learning (our algorithm takes a few weeks to reach full performance). 

**Recall** : 0.999
**Precision**: 0.76
**F1**: 0.86

This means that our algorithm is extremely efficient in finding deviations from daily cycles. Focusing only on critical anomalies only 1/4 of the alerts will not correspond to real anomalies, while almost all the anomalies are captured. 

This is a test with a rather small dataset, in the future we want to use bigger and more varied datasets.

For other results please refer to the note.