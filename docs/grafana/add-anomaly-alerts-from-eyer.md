---
sidebar position: 3
---

# Grafana - add anomaly alerts from Eyer
To add the Eyer anomaly alerts in Grafana, you should start with setting up the “yesoreyeram-infinity-datasource” as a datasource.

![](https://paper-attachments.dropboxusercontent.com/s_1AD4B30B6F1EC74C020C577A7F80146AF62F599CA3BCC79F37E75B8243F35666_1727079260585_29a256f2-6fb0-44a4-86d0-ffac008b217e.png)


Navigate to the “Authentication” section of the infinity-datasource, and set this to “No Auth”.

![](https://paper-attachments.dropboxusercontent.com/s_1AD4B30B6F1EC74C020C577A7F80146AF62F599CA3BCC79F37E75B8243F35666_1727079288346_3937a750-a3c0-4c94-8124-4bc80cfa2093.png)


Then navigate to the “Headers & URL params” and add “Authorization” as a custom HTTP header. Add your Eyer query API key as value (for those using the Boomi connector, it is the same API key).


![](https://paper-attachments.dropboxusercontent.com/s_1AD4B30B6F1EC74C020C577A7F80146AF62F599CA3BCC79F37E75B8243F35666_1727079321112_5495ede8-f050-4f8e-9092-b6dbac7dd6b0.png)


Finally, select the “Security” section and add “[https://boomi.eyer.ai](https://boomi.eyer.ai)” as an allowed host.

![](https://paper-attachments.dropboxusercontent.com/s_1AD4B30B6F1EC74C020C577A7F80146AF62F599CA3BCC79F37E75B8243F35666_1727079366708_910f898c-9a9e-4450-bb54-36614ba403ad+1.png)


Then it is time to add this datasource in a new or existing dashboard. Navigate to your selected dashboard and select “Add → visualization”. Select the “yesoreyeram-infinity-datasource” as a datasource. Make sure to set the “Parser” to “Backend”.

Configure the datasource as shown below. The selectors are

- items.#.node.name
- items.#.metrics.#.name
- id
- event_occured
- severity
![](https://paper-attachments.dropboxusercontent.com/s_1AD4B30B6F1EC74C020C577A7F80146AF62F599CA3BCC79F37E75B8243F35666_1727079610486_31c21e49-902e-4a93-b57a-829e9810e1f8.png)


Once you have saved your dashboard, the open anomaly alerts will be visualized in a table like the one shown below:

![Example of anomaly alerts in table format](https://paper-attachments.dropboxusercontent.com/s_1AD4B30B6F1EC74C020C577A7F80146AF62F599CA3BCC79F37E75B8243F35666_1727079626949_9911b5e1-102c-4a23-8d46-874aceceb7c3.png)


