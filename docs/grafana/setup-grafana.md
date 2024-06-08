---
sidebar_position: 1
---
# Grafana - setup Eyer integration
This article assumes that you already have a [Grafana Cloud account](https://grafana.com/products/cloud/). Eyer stores all the visualization data in a centralized InfluxDB, so to access your metrics, you need to request an access token. If you have not received one already, you can do so on our Discord server.
 

1. In Grafana, navigate to **Connections → Add new connection** and select **InfluxDB**.
![](https://paper-attachments.dropboxusercontent.com/s_D2B10767AE90151F6CFF1F8B351FA8F0A7D801254F85B305E6909193FE387D06_1717331203743_image-20240527-063728.png)



2. On the InfluxDB page, click **Add new datasource**
![](https://paper-attachments.dropboxusercontent.com/s_D2B10767AE90151F6CFF1F8B351FA8F0A7D801254F85B305E6909193FE387D06_1717331240827_image-20240527-073452.png)



3. On the settings page, set the following:
    1. **Query language** to **Flux**.
    2. **URL** to the URL you received with your InfluxDB details.
    3. In **Auth**, turn off basic auth
    4. Under the **InfluxDB Details**, set **Organisation** and **Token** to the values you received with your InfluxDB details.
4. Hit **Save and test**. If the connection works, proceed to the next step. If not, check all your settings again or contact our support.
5. In Grafana, select **Dashboards** on the left panel. Click **New** and select **Import**.
![](https://paper-attachments.dropboxusercontent.com/s_D2B10767AE90151F6CFF1F8B351FA8F0A7D801254F85B305E6909193FE387D06_1717331260071_image-20240527-074223.png)

6. On the next page, click on **Upload dashboard JSON file**. Select the json file you received with your InfluxDB details.
7. You should now have a dashboard containing the core metrics monitored by Eyer, including the multiple baselines.
![](https://paper-attachments.dropboxusercontent.com/s_D2B10767AE90151F6CFF1F8B351FA8F0A7D801254F85B305E6909193FE387D06_1717331279035_image-20240527-080941.png)


*For most metrics, average (avg) will be used. For statuses like “Atom in bad state”, max (mx) will be used. The main baseline is between mainup / maindown, while the secondary baselines are represented by inf & sup*