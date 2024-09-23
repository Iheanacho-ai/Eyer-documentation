---
sidebar_position: 10
---

# Note on F1 performance testing of the core algorithm of Eyer

## Abstract

We have been evaluating Eyer's core anomaly detection algorithm by calculating F1 score, recall, and precision using a subset of the Server Machine Dataset, a publicly available labelled dataset. Initially, we tested the dataset as is, then proceeded to relabel it. The relabeling was prompted by the observation that some events, which appeared anomalous based on the data, were not labelled as such. We'll discuss this observation further in the relabeling section. This test was conducted on a smaller dataset, and we plan to release additional updates with larger datasets in the future. Our algorithm consistently shows high recall in both the original and relabeled cases, indicating its effectiveness in identifying all labelled anomalies. For the original dataset, precision and, consequently, the F1 score were low, but improved significantly after relabeling. In the relabeled dataset, we achieved an **F1 score of 0.81** (**0.86** when considering only critical anomalies) after four weeks of data collection.


## Introduction

We are continuously testing our algorithms to enhance their quality. This note focuses on a specific test using a labelled open-source dataset, the Server Machine Dataset (SMD)[1](https://antteam.atlassian.net/wiki/spaces/EKB/pages/edit-v2/118554627?draftShareId=6edd1d24-c882-4504-a3a1-c5b4eec87ae7#Bibliography) , which is sometimes used in literature to evaluate AIOps algorithms for monitoring IT systems. The performance metric that we focus on are the F1 score [2](https://antteam.atlassian.net/wiki/spaces/EKB/pages/edit-v2/118554627?draftShareId=6edd1d24-c882-4504-a3a1-c5b4eec87ae7#Bibliography), recall, and precision.

**The F1 score reflects the balance between how well the algorithm identifies all actual anomalies (recall) and how many alerts are genuine (precision)**. It is calculated as:


    F1 = 2*R*P / (R+P)

Where R and P are recall and precision, which are defined:

    R= truePositives/(truePositives + falseNegatives)
    P =truePositives/(truePositives +falsePositives) 

The dataset is said to be anomaly-free in the first half (used for training) and labelled for anomalies in the second half. Labeling is often context-specific and be incomplete when taken out of its original context. Additionally, the claim that the first half of the dataset is anomaly-free can be questioned. Eyer is designed to be as generic as possible, not hyper tuning on a specific use case, meaning that our evaluation requires labeling all changes in the dataset compared to prior behavior. However, the labeling in the SMD dataset does not seem to follow this approach. Furthermore, as labeling is a time-consuming task, open datasets are often only partially labelled, and human errors can lead to missed anomalies.

Our approach involves first testing the algorithm using the original labels, then relabeling the dataset and measuring performance again. A section will be dedicated to explaining how the relabeling was conducted. In the future, we will expand this exercise to include more data from the SMD and other datasets, both open-source and internally generated.


## Methodology

Defining true positives, false positives, and false negative might seem trivial, but the reality is more complex. In the case of IT operations the anomalies are often deviations from the usual behavior that are persistent for some time. It can be tricky to label the exact point where a deviation started or ended.

In the following a **labelled anomaly** refers to a series of datapoints marked as anomalous and used to test the algorithm. A **detected anomaly** is a series of datapoints flagged as anomalous by our algorithm. To account for the variability in labeling, we’ve established a few key rules:

- A labelled anomaly that overlaps with one or more detected anomalies is considered detected. None of the datapoints within that labelled anomaly will be counted as false negatives, even if they don't exactly match the detected anomaly.
- If a detected anomaly overlaps with a labelled one for more than 50% of its duration, all its points are counted as true positives.
- If the total duration of a detected anomaly is more than 1.5 times its overlap with labeled anomalies, any additional points are labeled as false positives.
- All the points of detected anomalies which do not overlap with labelled anomalies are considered false positive.
- All the points of a labelled anomaly which do not overlap with a detected anomaly, therefore is not detected, are false negatives.

One thing to notice is that our algorithm, for metrics that are very active, is designed to ignore deviations that lasted less than 8 minutes [3](https://antteam.atlassian.net/wiki/spaces/EKB/pages/edit-v2/118554627?draftShareId=6edd1d24-c882-4504-a3a1-c5b4eec87ae7#Bibliography). This is done to reduce alert fatigue, and means that very short anomalies will not be detected.

The Server Machine Dataset (SMD) consists of data from multiple server machines, each represented as a node in Eyer. For each machine, there’s multivariate time series data, with each variable treated as a metric in Eyer. The SMD data is divided into two parts: the training part, which is claimed to be anomaly-free, and the test part, where anomalies are labelled.

In our alerting mechanism, we group anomalies across all metrics for a node into a single alert. This means we test our algorithm in a multivariate context, where an anomaly in any single metric is treated as an anomaly for the entire node.
Our algorithm is a multilevel algorithm: It classifies each detected anomaly as low, medium and high criticality. We will present the results in two ways: one considering all anomalies regardless of their criticality, and another focusing only on the higher-criticality anomalies. The test with high criticality only is characterised by lower the recall but higher the precision with respect to considering all levels of criticality.

For the scope of this note we are just going to focus on machine-1-1 of the SMD.


## Results on the original labeling

We enable our machine learning at the end of the train part of the dataset.
**Anomalies of all criticalities:** 
**Recall** : 0.997
**Precision**: 0.13
**F1**: 0.23

**Only critical anomalies:**
**Recall** : 0.997
**Precision**: 0.16
**F1**: 0.27

This means that our ML was able to discover almost all the labelled anomalies, with the exception of the very short ones, that our algorithm is not designed to detect.

The precision is low, so there have been many false positives, and this dragged down the the F1.

Our algorithm is designed to become more precise with time, so here are the results by excluding the anomalies detected in the first week after we enabled the anomaly detection:

**Anomalies of all criticalities:**
**Recall** : 0.999
**Precision**: 0.29
**F1**: 0.45

**Only critical anomalies:**
**Recall**: 0.997
**Precision**: 0.34
**F1**: 0.51

**Relabeling**
To illustrate how we have relabeled that data we are going to focus on a single variable of machine-1-1.

These are the training data for this variable:

![](https://paper-attachments.dropboxusercontent.com/s_DD12E8D4E503DD63C46214549CC064CA4EC2FE21DF837A7C6A6128777211778C_1727085284884_56bc5cdd-a5d6-4a5e-95fa-ff698871195d.png)


We could already challenge the statement that these data are anomaly free since we can see the spike at the beginning of the dataset (a bit before 5000) and the increase in value in the second half. These two changes can strictly speaking be consider anomalies, if we do not have the context of how a user would define an anomaly. Notice that the metric never went above about 0.5, and most of the time was way below that value.

These are the test data for which data are labelled:

![](https://paper-attachments.dropboxusercontent.com/s_DD12E8D4E503DD63C46214549CC064CA4EC2FE21DF837A7C6A6128777211778C_1727085305090_1843ca48-1e1c-480a-9f91-b9671a055950.png)


Let’s zoom in and circle the labelled anomalies in red:

![](https://paper-attachments.dropboxusercontent.com/s_DD12E8D4E503DD63C46214549CC064CA4EC2FE21DF837A7C6A6128777211778C_1727085323261_f2f6635c-4e46-452b-ab29-94fa58fc6559.jpeg)



![](https://paper-attachments.dropboxusercontent.com/s_DD12E8D4E503DD63C46214549CC064CA4EC2FE21DF837A7C6A6128777211778C_1727085351791_35400f76-5d0f-42a9-9352-6e974ecc890a.jpeg)


In the following image you see the anomalies that I relabeled (in yellow)


![](https://paper-attachments.dropboxusercontent.com/s_DD12E8D4E503DD63C46214549CC064CA4EC2FE21DF837A7C6A6128777211778C_1727085380576_fde3e686-4f2f-4443-abf1-c70887406306.jpeg)


The first relabeled anomaly is because usually for this metric the values in second half of the day do not exceed so much those in the the first half of the day, the other three are because the picks have a higher value than previously observed.

![](https://paper-attachments.dropboxusercontent.com/s_DD12E8D4E503DD63C46214549CC064CA4EC2FE21DF837A7C6A6128777211778C_1727085407100_31906c12-5790-4845-aeef-3e2ce296ec09.jpeg)


The last two anomalies are identified because even if they had some similarities with the anomalies seen previously they had a way more oscillatory behavior.

Similar relabeling was done for all the variables of machine-1-1

**Results for the relabeled data**
Anomalies of all criticalities:
**Recall** : 1
**Precision**: 0.50
**F1:** 0.67

**Only critical anomalies:**
**Recall** : 0.999
**Precision**: 0.52
**F1**: 0.68
And if we consider the performance after one week the anomaly detection is enabled:
**Anomalies of all criticalities**:
**Recall**: 1
**Precision**: 0.68
**F1**: 0.81

**Only critical anomalies**:
**Recall**: 0.999
**Precision**: 0.76
**F1**: 0.86


## Conclusion

Eyer's algorithm consistently excels in recall, meaning it successfully captures all labelled anomalies in both the original and relabeled datasets. While precision and F1 scores were lower with the original labels, they improved significantly after relabeling. This is a partial test and a wider range of data and labelled data is necessary in order to further asses Eyer’s algorithm. The strong performance of our algorithm on this data confirms its effectiveness in handling datasets with a high degree of cyclicality, as seen in the considered metrics that displayed clear daily cyclical patterns. The analysis presented in this note is a single node analysis, but Eyer can build alerts across multiple nodes. In the future we will use multiple nodes datasets.


## Bibliography

1. [Server Machine Dataset](https://github.com/NetManAIOps/OmniAnomaly/tree/7fb0e0acf89ea49908896bcc9f9e80fcfff6baf4/ServerMachineDataset)
2. [What is an F score?](https://en.wikipedia.org/wiki/F-score#:~:text=The%20F1%20score%20is%20the%20Dice%20coefficient%20of%20the,of%20the%20positive%20class%20increases.)
3. [Eyer documentation: High frequency high activity anomaly detection](https://antteam.atlassian.net/wiki/spaces/EKB/pages/9044073/Univariate+anomaly+detection#High-Frequency-High-Activity)

