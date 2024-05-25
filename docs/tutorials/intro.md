---
sidebar_position: 1

---

# Filter anomaly alerts depending on their severity.
The [Getting Started with the Eyer Connector](https://eyer-docs.netlify.app/docs/getting-started-with-eyer/validate-eyer-alerts) section explains that while you can opt to receive alerts for every anomaly and its changes, this can quickly become overwhelming and lead to alert fatigue.

The [Eyer documentation](https://eyer-docs.netlify.app/docs/getting-started-with-eyer/validate-eyer-alerts) explains how to filter anomalies to receive new, updated, or closed alerts for relevant anomalies.

But there's more! With the Boomi ecosystem's many connectors, you can get alerts for anomalies and track their changes throughout their lifecycle until they're closed.

This use case shows you exactly how to do that.

## Prerequisites

To get the most out of this use case, you must have:

- Knowledge of how to create Boomi processes and configure the Database and Mail connector
- Configured the Eyer connector using the Dynamic Operation properties. To learn how to configure this connector, [please check out the official documentation](https://eyer-docs.netlify.app/docs/getting-started-with-eyer/validate-eyer-alerts).
## Understanding the Boomi process structure

This use case demonstrates how to check for an anomaly and receive alerts for any changes to anomalies. To monitor these changes, you need the anomaly ID, which must persist beyond a single Boomi process run. 
In this use case, you will collect and persist the ID by:

- Caching the IDs of anomalies that have been updated or closed
- Saving the IDs of every new anomaly to a database so that they persist past the single Boomi process

After understanding the importance of collecting and storing anomaly IDs, this section will explain the project structure. The use case is divided into the following parts:

1. Configure the Eyer-Partner connector using Dynamic Operation Properties
2. Store the updated anomalies ID in a cache document
3. Store the closed anomalies ID in a cache document
4. Filter through the anomalies
5. Store new anomaly IDs in the database and send out an alert when the anomaly is new
6. Send out an alert when an anomaly is updated
7. Send out an alert when an anomaly is closed
8. Send an alert regardless 
## Configuring the Eyer-Partner connector

To get started, create a new Boomi process using the Eyer-Partner connector and configure it with the **Dynamic Operation properties**. For detailed instructions on setting up this connector, refer to the [Configuring the Eyer Connector](https://eyer-docs.netlify.app/docs/getting-started-with-eyer/configuring-the-eyer-connector) documentation.

![](https://lh7-us.googleusercontent.com/nrbAdOprBmgiIE8AdATDmvg9fvA9xmXqxYQ9Gol1SsZdlGt6UHXujN6LwKTmaIVwYlwCvX9oybUr0WFS-DH6CEt_abpEewqWlQbuCdIkSynKFXPRjIJS5Ju7k7Sps7qLLnarl9aaLESTyclsI_kAvxs)



**Adding a Branch shape to run the processes consecutively**
In Boomi, to run a series of processes consecutively, you need the Branch shape; with this Branch shape, you can: 

- Store the updated anomaly IDs in a document, then
- Store closed anomaly IDs in another document, and 
- Finally, send out alerts based on the status of the anomalies

Add a Branch shape to your process and click on it to open its dedicated sidebar. In the sidebar, change the number of branches to three and click OK to save your selection.

![](https://lh7-us.googleusercontent.com/Tmalj8oe2aFEDqYfbUuC6mfoc6PwTC1Z0H72HztfkVYJYU6X_D3xg1BI-BMtiQiPjH6eSmHY9un_VIJ2E_-6RdPd_fKfYPNqZq8-cbVF81KJhTPBbvNCHS4hDniDIb0rQF3C-ZYQ3OdQdWh9qdG29qQ)



## Store the updated anomalies ID in a cache document

To cache the ID from the updated anomalies, you need to:

- Determine if updated anomalies actually exist on the anomaly object
- Convert the JSON data received from the Eyer connector into a flat file format fo reasy processing
- Split the flat file by each line
- Add the updated anomaly id to a document

**Determine if the updated anomalies exist on the anomaly object**
In the first path from the **Branch** shape ( labeled 1 ), add a **Decision** shape to ensure that the updated anomalies data exist before processing the data

![](https://lh7-us.googleusercontent.com/CZi-MLIDzJQyW9HP25DtrKPNHbrlagMdw3ndB3KQXK3vs8BOoK28tnIVYYChycZieO9IKsnKHwtrHLFEGrHPuCJanbjFVz5eEsbTh9b8BKJi47JnN2Q8xdsQOCW8Cr_I0HIAWhmiM-joxsxBBWM07x4)


Click the **Decision** Shape to open up its dedicated sidebar. 

![](https://lh7-us.googleusercontent.com/SDPDsiCx5AbOaGiTvGEjGuRrOU2pdBF02yhr8RgYbXgO9AQzgt4CpsCqW1ZUI4vOyit2z0UR0VFBUbGEic5gseEDzPRCbX5KmpJcrFeeq7kj8HVMQw6S4wT5YFJPUHSmMzmmMr_rdpfPZCQ1kYv7KVA)


In this sidebar, click the **First Value** field to open the **Parameter Value** modal. Fill out this modal with the following information:

- Type -> Profile Element
- Profile Type -> JSON
- Profile - > Select the profile you created when configuring your Eyer connector
- Element -> Click the **Element** field to open up the **New Output** modal. Navigate through this modal, and select this menu **Object** -> **updated -> Array -> items1 -> Object -> id**
![](https://lh7-us.googleusercontent.com/RFXHRZEwfhKr7kOkmkoQ3dzm30BFWMPkbvCZw9ry_N5sDikbUn_RG7yfTsG16iPgfUsXomZKgl8FSVNhOEOU5zkxJfMIM_lWhw_h1Jx4gDHguzKRmhCIx8tgWeKTjrCv902MAw8lhPP-tNSEKAFbwwQ)


Click the **OK-> OK**  button to return to the decision shape sidebar.
Next, select **Not Equal To** in the **Comparison** dropdown.

![](https://lh7-us.googleusercontent.com/bUV-wID48jk8f1NhNX1-Yjejd6GoBI2Bm7pXw628QI-EAdVCe7pR73c0tHakiIdfGvLWtHlEZPzqZbb2PCDn1sG8-hiqhvcCDenAAQm2atFgbHoWMY4XJLX3l-6oRswE_ZvWna6wLbUvSx07kNigi0A)


In the **Second Value** field, click the input field to open the **Parameter Value** modal. Select **Static** in the **Type** dropdown in this modal and leave the Static Value field empty.

![](https://lh7-us.googleusercontent.com/t9jWB2w76Zl-zZQNQ_XlaynSL8n7UDjqN_gowQurWnnmBZaPxhU7qRUhsjvmn6BDBr283XdpjmvUA0bj6TxsoAi_ohLuZ0V5ZfryAuvTIhkQpxkf3x1OlqEgT7JhqgHxCkkCVhPejSVRRBOQKCYWZY0)


Your decision shape should look like this:

![](https://lh7-us.googleusercontent.com/IF04S7sPDyMyxtWSABZvP-5SvZijbsbgzz6mUgjXNQBePtJpGBsDwinuODllX8uyB0zbt-qvYZrtmit-4sfcoc0zVPNXVA0MUZkyAa0PkiUJzUU8igaGO6MSePCzsSy54y8MnqVz7HXYBscamX-QPbU)


Click the **OK -> OK** button to return to the Boomi canvas.
**Convert the JSON data received from the Eyer connector into a flat file format**
Add the map shape to the True path from the Decision shape. This shape allows you to convert data from one format to another. For in-depth information about the Map shape and its properties, refer to the [Boomi documentation](https://help.boomi.com/docs/atomsphere/integration/process%20building/r-atm-map_shape_a481eb4d-739a-46fb-b062-866d9d13f21a/).

![](https://lh7-us.googleusercontent.com/XK6PAHYyvrf095LIXJixzi5yfauKVkDouKDSr89fYMPG_cYBOTJVEX2G8a8LyI7Emxng9KQAlUG1ZeatAidmMf7DWH9VAxOaZGTVotyhFqweysAvzmciYfsm95FLijW8yIQbGNYHgnMnHhnjSkFNx-4)

- 

While this section won't cover the complete Map shape configuration, here are some key points to remember:

- **Source Profile**: The profile type is JSON, and the profile is the Eyer Connector Profile.
- **Destination Profile**: The profile type is Flatfile with a single field named id.

**Mapping Instructions:**
Within the Map source, locate the field path **updated -> Array -> items1 -> Object -> id**. Map this field to the "id" field in the Map destination section. This essentially extracts the "id" value from the JSON data and places it in the designated field of the flat file.


![](https://lh7-us.googleusercontent.com/DSlloudkj7HkSiPTM3JbzxmB0Gu7BRhvPIpji8qMpyWsg8aOoVI05eVEf-jKwqY_pN63j0IYPyxvicftQ6Prz29kZD6_3213v5TqFmFazY4b1rp4qkHMGwTk3h8gis9i3AqIy5yI3SG3AypoTMRZscI)


**Split the flat file by each line**
After converting your JSON data to a flat file, you want to split the data by each anomaly ID. To do this, you need to add the **Data Process** Shape to the Boomi process.

![](https://lh7-us.googleusercontent.com/RmDurqUOKEa3BDcfuipHa6DMvrqynmtw37fUz8Df3RWIyGVO0hqWV2PUYNh1vGoDr_AwA2v337yxzGBc5WMleFT08d979GWsAQ_pvfge_QviFuFr5NEbQt7yBGNPJikxCgCpOfWiRmGfzDQtQUS10RI)


Next, click on the **Data Process** shape to open up its dedicated sidebar. In this dedicated sidebar, click on the **+** sign to specify a processing step for your data.

![](https://lh7-us.googleusercontent.com/0cQ8Tjr09dbu8U2GxVdVdri65PEr4gEZJurXT4S1wZO0WCrz-3lzVq1kkWLhy16HbiyeknGY9K3R1jMcyUSZQClL-YKdwZvhfEfmtFJ7glF0wlSuiN1UoHx_OeN58YOVAiF2AgUJZaP0FNFWjiDpdNU)


This action opens up a form; in this form, select:

-  **Split Documents** from the **Processing Step** dropdown
-  A **Profile Type** of Flat File to match the flat  file you just mapped the ID to
- **Split Options** of **Split By Line** 
- A **Headers Option** of **No Column Headers**

Click the **OK** button to save this **Data Process** Shape configuration.

![](https://lh7-us.googleusercontent.com/MaXen7vyjb2JbUHQy90paaQVDwAPL8GOx5eIRaum4h9THnKSkWd_ffG1o5xkwGPBP77m2cKm-cNHtaT_FzE3771Ko5TnwQgOVDkmry2aZ9Do-wPfhoZxCsvnr6LAGTUkIQeIBJQTDV0XmUIWCuK9Lmk)


**Add the updated anomaly id to a document**
To cache data, add the **Add to Cache** shape to your Boomi process. 

![](https://lh7-us.googleusercontent.com/IgpNe06nUl60TlHvYg8CEtoxagGxQqH7APiH7IXLFEfyzBPIVqLQaD50qx2m54tsL9okrXclNm4ULN6DnEYojYLjYCdbtnqIGRJ30HWV1s6z6sH0xTcb8eG_bCyabVxuziboV5SR_DD_lZ2tKLt-s7E)


Click on the **Add to cache** shape to open up its dedicated sidebar. In the sidebar, give the Display Name a name you'd like the shape to represent.
Click the **+** sign in the **Document Cache** field to open the **Document Cache** page. 

![](https://lh7-us.googleusercontent.com/cVmQNMMKz99Af5rnnROwkCgWz9oRnbXHqPQMNqEMZSTfEC5HyB6bYHlYbIa_2pFfz_yokCZSI1r-7UxYG0t5aHIxvZmhRoID7zU5on-G2HXdAXq6xp96jZkSfFfyuOrhCsVwoZRXNKC_23RPyQku2EM)


On this page, do the following:

- Select the **Cache by Profile** radio button
- Choose a **Profile Type** of **Flat File**
- Select the flat file Profile you created when mapping the ID on the JSON object to a Flat file document
- Select the Option **Enforce one index entry per document** 
![](https://lh7-us.googleusercontent.com/DwSLvb9ZIhu-1lrC4gyV_pi3B_YFCQD7RPLK6giNfgvaNd8oBOYgsJfn8IZrP5EcUmApgP7XnABdiDwXjAXp58nyKJIkjF2wwdn2KMEhyUTB0JL9Wcz9mo-CApZjWd7iDFyeWRdQLJLXg9cBhrPVotk)


Next, create an Index in the **Indexes** section. These indexes store the values for all keys; in this case, it will store your anomaly ID.
Click the **Add Index** button, and input an **Index Name** in the **Add Index** modal. 

![](https://lh7-us.googleusercontent.com/qzthzFR4tlrcYUJfdlckd61ODdQD-6-4KvBrz_eojzU16Mcf5lNYtE4lx76sZ8qx_H9U-CaFHGHjvsWeVGlvG20ArmGlF7fpmLhLrHj04hLXF1jLuQz3MJ2bw13XHsYcw6Vt2OeSdKTwwkd1byWnFFQ)


This tutorial uses **ID**, so click the **OK** button.
Next, click the **Add a Profile Element** link to open a search bar. Click on this search bar to open the **New Input** modal, navigate through this modal, and select the **Record -> Elements -> Id menu**.

![](https://lh7-us.googleusercontent.com/zviDFP6-GGL00xwQh8nDUCIw056jSlvjz5OdQytFIQqZq0lTkaEFpBzMgBrNzmxb1VsF48eIuJl9KoYINICELOXRZFhkF33feob5zWYuxO7IFcdcsWCXKGT4NIAGEW0igNZ-_y8wdl8WcoHknBRxq_s)


To save your index and return to the sidebar, click the **OK** button followed by **Save and Close.** Once back in the sidebar, click **OK** again to return to the Boomi canvas.
Next, add a **Stop** shape to the rejected path from the **Decision** shape to stop the process if the data does not meet the condition specified in the **Decision** shape.

![](https://lh7-us.googleusercontent.com/VGQ7wkg_Zv7igxhoEWBPXTzcKT314Je50hlIdSwUY_Bv6VOwuNOvoRPbpbwhCXh1aGFSs3SokPyL9MSuVDHXdJFKrIh93FIyQnyaikv4go7qjfSCS6uS8hsoeDJ27iIDZURP2R-CB29wljxC71GNzDE)

## Store the closed anomalies ID in a cache document

To cache the ID from the closed anomalies, you need to do the following:

- Determine if closed anomalies actually exist on the anomaly object
- Convert the JSON data received from the Eyer connector into a flat file format
- Split the flat file by each line
- Add the closed anomaly id to a document

**Determine if the closed anomalies exist on the anomaly object**
In the second path from the **Branch** shape ( labeled 2 ), add a **Decision** shape to ensure that the closed anomalies data exist before processing and caching the data.

![](https://lh7-us.googleusercontent.com/0D8yh1pbpEeu5VdUkdmk9yz2mnnGmPd5Pn-nN_L3hsq7ddAFS8PAT9DvgwzbFjHrIzcNVj2WOnUMqgbce6ABLa0OF-MYMMZrRjkFw8LTfqW_Xn7Koor9-yGOvgufkpY2iw3A1WUVK9rVGcJ4dJ9F684)


Click the **Decision Shape** to open up its dedicated sidebar. 

![](https://lh7-us.googleusercontent.com/MWsIWKd1_IoxjnoT-IeJyIP4DgAVomMXSc1BjHRjlqlQcA2v8tp0tbzA5m6kt_6DvufSbZW2-ASFYqMLajQVrxjF35QnZEb1oCSy40tSwr1XLpZlypG_fvFrVcgJRg5bMJvteMHNrq-fCeeCMmw1p4s)


In this sidebar, click the **First Value** field to open the **Parameter Value** model. Fill out this modal with the following information:

- Type -> Profile Element
- Profile Type -> JSON
- Profile - > Select the profile you created when configuring your Eyer connector
- Element -> Click the **Element** field to open up the **New Output** modal. Navigate through this modal, and select this menu **Object** **->** **closed -> Array -> items1 -> Object -> id**
![](https://lh7-us.googleusercontent.com/tzDQSG7mss9zqLBExyg3o5x4qB-U3oIvhGsrHDoWxV00oDVUTy9HO4W1M-gU_V_1Ee-xr7S1x6VKuf68bvPjvO94eJaqjibSYR1K20ZbofFSTlnEX-eha0pprzsOwEHP_tt5d95J-wz6ilCPTwa58As)


Click the **OK-> OK**  button to return to the decision shape sidebar.
Next, select **Not Equal To** in the **Comparison** dropdown.
In the **Second Value** field, click the input field to open the **Parameter Value** modal. Select **Static** in the **Type** dropdown in this modal and leave the Static Value field empty.

![](https://lh7-us.googleusercontent.com/VrOj44FpiAFLbDwPq1wDEKnFz8Nto9TNABSztOWG7LnWxFCPp5ZTh1Qj8dkW1aLlppXcXQdrMh3Oh4LoiETmV5F7qmqiUDP7YC8gwicz9Q_FSm1p6whBj4NmN-AFyGDAyEAmNTFmEI7dWyQo1lpGWis)


Click the **OK -> OK** button to return to the Boomi canvas.
**Convert the JSON data received from the Eyer connector into a flat file format**
Add the map shape to the True path from the Decision shape.

![](https://lh7-us.googleusercontent.com/6W2qIBMfV8u1wJD6Sp0qXemx08VcwfVqrrC4QjhAw3t_2Yd4BBWIrvWxxUtI5k8b7KTdDLq3ESKIyxsQdR5rSH4gY_horMFqu35H2yRZzwiZFRasZDKeo9U7V-pObZ1CDdaEnRv2diaBplUgTmZL7_Y)


While this section won't cover the complete Map shape configuration, here are some key points to remember:

- **Source Profile**: The profile type is JSON, and the profile is the Eyer Connector Profile.
- **Destination Profile**: The profile type is Flatfile with a single field named id.

**Mapping Instructions:**
Within the Map source, locate the field path **closed -> Array -> items1 -> Object -> id**. Map this field to the "id" field in the Map destination section. This essentially extracts the "id" value from the source data and places it in the designated field of the flat file

![](https://lh7-us.googleusercontent.com/qgAJGfJai9L7lq-mfKqpBIH-qD9SSc7pTce_XfyxuJZPdgwYpSZyavAfME9j1DgAwNAxL6GDrodWmgrFe5a4PfKZyqgok7tXmVHlRwdMtoGJf_72JyifL7FUZILIZ02hWanmfaLttovbajDxNYDzkMk)


**Split the flat file by each line**
After converting your JSON data to flat file, you want the split the data by each anomaly id. To do this,  you need to add the **Data Process** Shape to the Boomi process.

![](https://lh7-us.googleusercontent.com/n0MsGkI24msxQ4vD92y08eWKoNr5DyK9rgxOr3dMM9nJjP5DD7XsLxg3izs0Rmi9EhNUOz56902oRbkVlpH6zbooJCLA8vmumte20ezAk_zgXN89yCv7aAEHSV1ghbdGWZf28aWTYYvA3uuZvfQJMeM)


Next, click on the **Data Process** shape to open up its dedicated sidebar. In this dedicated sidebar, click on the **+** sign to specify a processing step for your data.

![](https://lh7-us.googleusercontent.com/mIudUxYLG4aFdtNQU-n6RG-3UuLvQmasZ5IUAwY8SjbJA99b2LETVCHL_eCfc3u_De2q-ZmbWiUEKYPjdHT0PZx6RbD4lbY7xhg0FCJJeT-2vxFlFWT2eE_NEXEs3-9XWxlr7kdkSh40JhOZVvD-0f0)


This action opens up a form; in this form, select:

-  **Split Documents** from the **Processing Step** dropdown
-  A **Profile Type** of Flat File to match the flat  file you just mapped the ID to
- **Split Options** of **Split By Line** 
- A **Headers Option** of **No Column Headers**

Click the **OK** button to save this **Data Process** Shape configuration.

![](https://lh7-us.googleusercontent.com/s_IAYuMdjh_uI5iUsOf4_VnXNpthjAdNvEhOtNpAjJojkIsS_IW2xT1cEs1ZMysRNgR04Z7FEJ_lguL0bU0GR4aUw7mBRhcGnuegZZrB6E969WGwDRzOJMli8svwvTtoo5SZ6pT_jl7oei5512CLv1g)


**Add the updated anomaly id to a document**
Add the **Add to Cache** shape to your Boomi process to cache data.  

![](https://lh7-us.googleusercontent.com/g5uB2bAyf31YWq1fzKcg8eBvPzfTCnPIM3vWWwX6rgrQF9pXZYW20OP99XeFIpyGfqTjfiaPmnWG5XQl_GBEdKSubXhGnvKXOKO2xq5VsWueOyNrWF4Ei0iIKb5Dat2nGczR5JiqmnS-tVT2kMF-f2Y)


Click on the **Add to Cache** shape to open up its dedicated sidebar. In the sidebar, give the **Display Name** a name you'd like the shape to represent.
Click the **+** sign in the **Document Cache** field to open the **Document Cache** page. 

![](https://lh7-us.googleusercontent.com/cx47OXgogKtYEzecehCCXSn8LpIh9nx3y18f7A8x4ob2Dfrd5WssGXLlQZCBLuIGnYAvaC9GbgaX5qD3E7vkyf-GSefulgH-otS0ZrBNrT4Q8xMmfKbO2K8chzMpifaeSqIE2jb5msrPvRN_O4tN2ao)


On this page, do the following:

- Select the **Cache by Profile** radio button
- Choose a **Profile Type** of **Flat File**
- Select the flat file Profile you created when mapping the ID on the JSON object to a Flat file document
- Select the Option **Enforce one index entry per document** 
![](https://lh7-us.googleusercontent.com/CzXd05Lmm1cHuIAVHaYhieMairbryFXKbY4gP4qvavP9n5Ik1EMcCFUxsDTcIaNL11FLd6UmjpBtrHt9cw2wpuQcMoz_xULbTs481Li4DOEAlHwCvJSkUfwg8HFasdOzyCp80LnnUGVhUii-UNS8pTs)


Next, create an Index in the **Indexes** section. These indexes store the values for all keys; in this case, it will store your anomaly ID.
Click the **Add Index** button, and input an **Index Name** in the **Add Index** modal. This tutorial uses ID, so click the **OK** button.
Next, click the **Add a Profile Element** link to open a search bar. Click on this search bar to open the **New Input** modal, navigate through this modal, and select the **Record -> Elements -> Id menu**.

![](https://lh7-us.googleusercontent.com/hOCWDwI_AA9oxlHDwJ8zF2_6CEliKmuHOJrWKoPN5wENm4LSU1zON6g-uPu5eoAJynvJhiq6DSfqABD-1_U0-yTbTVsWdeESp7qbwU4dI9B_-GP2djXPl3NiHprHSvmave35Gu-QLvJM16IfYIdcHlA)


To save your index and return to the sidebar, click the **OK** button followed by **Save and Close.** Once back in the sidebar, click **OK** again to return to the Boomi canvas.

![](https://lh7-us.googleusercontent.com/nnzANalWRAx7PzJlsMzVH69Rv6RRRlafi0Zgj-rTvDMKYyWNDvqTkQ-LbPWglOvDGKQfYPHgYi1guK1RGQrYQaPUmV-YUlxT377npz0LwIGUNlB-QUrV41g9rTVHTEYYOVhON9ZDOi4z0Ec3Ztoz8-c)


Next, add a **Stop** shape to the rejected path from the **Decision** shape to stop the process if the data does not meet the condition specified in the **Decision** shape.

![](https://lh7-us.googleusercontent.com/EUXBI2vfA3iLGxVogNbHMNWOv9FsXQjx0TphX90e6sFORqrxEa9hJnh3Jp7ogrWNROgu5E14_UZeV-wjhk4J_TU2s-pfjozgeILjhIKJc08KU44835C0mvQl2DXLtIxETgVuU3KYHc6qvGe2PEEyaUc)

## Filter through the for active anomalies

Once you have cached your anomaly ID, the next step is to filter through these anomalies and send out alerts when a new anomaly has been created, updated, or closed.
In the third path from the Branch shape (labeled 3), add a **Business Rules Shape** to check for active anomalies.

![](https://lh7-us.googleusercontent.com/mQwfRgO4MH8gF9kaXLhtcrt1pHoExBkuHdSzFAzUcKorBkkMzxECg5DRhGQl7Zk854d6R6anKdm3_Y5ewAaprL_At0d4Qp9KBL-BxI6ub4amu_coZObzL1rxmYQcB4NPP7oFBiJQeStLGYnceuf8KAM)


Click on the **Business Rules** shape to open the **Business Rules Shape Options** modal. In this modal, select a JSON profile type. Then, in the **Profile** input field, select the profile you created earlier when configuring the Eyer-Partner connector.

![](https://lh7-us.googleusercontent.com/f4hHen1CnaaNtMmbzH2hMHe8hW56QBol__aKOdZD5q3ioUFQx2pQ5Fs7VIbvIKTWqzkmMh5tVKhK51fhIPnqMlBQJqtj_zeyzi_mAylEV6wVUQ-XHfrTQ3zUeh5G357CoQKClySZKIJYtEXRTxNeNxk)


Next, click the **OK** button to open the **Business Rules Shape** modal. In this modal, click the **Create a New Rule** button to create a new business rule.  
To create a business rule, you need the fields and the conditions to check if the field's values match the criteria for receiving alerts.

**Creating the Business rules shape fields**

In this use case, you will create three fields: the NewAnomalies field, the UpdatedAnomalies field, and finally, the ClosedAnomalies field. These fields will capture the severity values of new, updated, and closed anomalies respectively.
To create the NewAnomalies field, click the **Add** dropdown and select **Field** from the menu dropdown.

![](https://lh7-us.googleusercontent.com/DL5YjsXJpsKrA4StvijWFamim9kDwrbZjRCSOsRlC16Z93wdne-Q3X7iAqFxGCmHJbH80HSOY-4UaS1iCMGOafMRPuD6JWxRkmzaEqb9SNU14E0dFY0SAuzDN5k_KK0-Zxr_Gr24BRwEbcDeTQPOZAs)


This action opens the Add a field modal. In the Alias field, input “NewAnomalies”. Then, navigate through the Field input menu and select this menu: **Object -> new -> Array -> items1 -> Object -> severity**.

![](https://lh7-us.googleusercontent.com/qzQJZvDQ2bXGySwe8np9r8ThXb0A8Iqd1zUTZAT_xmOJUV0WHaW-bZorjMbdku_ERiC-qjKDHlA0B6TUtaBW_Jl738fz2ucQj1JXPwKAPjnJ9VS_noOa-gtVA07wHozbPs_vJhKWn8au3n37mSLW6Bs)


Click the **OK -> OK** button to save your field.
Next, you will create the “UpdatedAnomalies” field. Similar to creating the **NewAnomalies** field, click the **Add** dropdown and select the **Field** menu from the dropdown.
This action opens up the **Add a field** modal. In the **Alias** field, input UpdatedAnomalies, then navigate through the **Field** input menu and select this menu:  **Object -> updated -> Array -> items1 -> Object -> severity.**

![](https://lh7-us.googleusercontent.com/auU-u7UH6eqp2iviZ0H5gB3WJ96ianrVjYBWYLHVatqE_7PdeWwMlGAyC3EC5Dmwh8XaWuPvfAF2AaVv8Agl5-4WU11JSN6oQVg1SKe1OpGeSbMQVn-UqwcYwFz7Kj7_SKKVuuiKt3Vbp_jd2m3fvok)


Click the **OK -> OK** button to save your field.

The last field you will create for this business rules shape is the “ClosedAnomalies” field. Similar process to creating the last two fields: click the **Add** dropdown and select the **Field** menu from the dropdown.
This action opens up the **Add a field** modal. In the Add a field modal, input “UpdatedAnomalies” in the **Alias** field, and then navigate through the Field input menu by selecting this menu:  **Object -> updated -> Array -> items1 -> Object -> severity**

![](https://lh7-us.googleusercontent.com/wIyooScD4SP3i9ZTUfgkRrdpdU7p-_k_pvqGWj5SAk-XpRXo7yfvFtS0hFWPgxpdiRBqm_Sg-pqYWpy4e6aIwXXgMIjyWAWWgq4nnT2uCfdu1i3aHArF1LrGvIdV7cKXIifPPv7ol6s4l4UzanNsWZ0)


Click the **OK -> OK** button to save your field.

**Create a Business rules condition to ensure that these fields are not null**

To check if atleast one of these fields you just created has value, click the **OR** button at the top-right section of the **Conditions** section.

![](https://lh7-us.googleusercontent.com/Y3HEtZnpmJ-pUPAo3cSNXAeNZ0WZkf27PNnF4k9A2fOFObfmb5QXe5dCSGdCl-MdZpUkH7sYHp5EXi1m0a9_Mowp3r4TAGYkREcmNTsWqWmVaaQxFGShM-ueLbUxd9ST0iDg0odL6doTFsGd5WvxQnE)


Next, follow this process to create conditions that verify that the fields are not null:

- Click the **Add a Condition** link:
- In the first dropdown, select the **NewAnomalies** field
- In the second dropdown, select the **!=** field
- In the third dropdown, select the **Static** field
- Leave the fourth field empty
- Click the **Save** button
![](https://lh7-us.googleusercontent.com/NnaIRD4KuwoWLFVhFKqsePTVf2496QI2W2Y5qUZ7iaEm0n1MmyPPRT8XcjUk3icNx_Lcf4GIIUntQ2t8QT5n2AvqlTkD61kqnsSuEJ7AbDqaav3tObohwpjYAzETYYU45lThZ6D-FVHTLdobwBRtMPE)


Repeat the create condition process twice, replacing **NewAnomalies** with **UpdatedAnomalies** and **ClosedAnomalies**, respectively.

![](https://lh7-us.googleusercontent.com/IhOwnmKm-rUGcmZRZEFrDtTqtrSziB83zJaukp447yOO6jiInhHdy83JWPFR-GSbT7ziw6e8M6pKAcSqc3uWBbmDhTdh2Z4tPA5SiS6eYGJFnkP-OzJ203NL2OfeOwCXYL0ogyWgbbvvE-IW0WEv4Nw)



![](https://lh7-us.googleusercontent.com/UrZmavv9ZapQ1jQTz7oNrZ6dM0aNqkq7k2ODbZn0oMeGc9AJr1ArTH_EfmW005m2U-I9wrowgECR3CmeWdF4Iod83tNEeISWWVut5I6EMyEUZCBoFz58VHm0ApqRg9GYpaJvA1dHh99IjNszT42asvE)


Click the **OK** button to save the conditions and return to the Boomi canvas.
Add a **Stop** shape to the rejected path from the Business rules shape to end the process.

**Adding the branch shape for sending out new, updated, or closed anomaly alerts**

After checking if active anomalies exist, the next steps are:
**1. New Anomaly Detection:**

- Identify new alerts.
- Store their IDs in a database.
- Send an alert notification for a newly detected anomaly.

**2. Updated Anomaly Detection:**

- Retrieve both the stored new ID and the cached updated ID.
- If the IDs match, it indicates an update to the existing anomaly.
- In this case, send an alert notification that the anomaly has changed.

**3. Closed Anomaly Detection:**

- Retrieve both the stored new ID and the cached closed ID.
- If the IDs match, it indicates the anomaly has been closed.
- In this case, send an alert notification that the anomaly has been closed.

To run these processes consecutively, Add the Branch shape to the process. 
Click the **Branch** shape to open its dedicated sidebar; in this sidebar, change the number of branches to four and click the **OK** button to save your selection.

![](https://lh7-us.googleusercontent.com/lUWYILjq2ucRYt6-f0V62I_5IGrDsPpS-NRlS7xJlvRYpFBpgT3_XLc3NEF_CN8yn7AEMZv8xXKrHHyh7WRz6_qVB_EibL1bzfnC14LP1t5iZSEJJUWvsHWrDvH42Uf5hWWRvEz7F2jxksrIWTyviiY)



## Store new anomaly IDs in the database and send an alert for each new anomaly.

To store a new anomaly id and send out an alert for each new anomaly detected, you need to:

- Check if new anomalies exist on the anomalies object
- Change the anomalies data format from JSON to database format
- Store the new anomaly id on the database
- Create the custom message you would like to alert the user
- Send out the alerts via email

**Add a business rule to check if new anomalies exist on the anomalies object**
You will start this section of by adding a Business Rule shape to the first path leading from the Branch Shape you created earlier. This shape will determine which anomalies are new.

![](https://lh7-us.googleusercontent.com/NCx9skfJl-W0Cf-fFExakx2lj3kORs6o_bXDItwgRRKHE1Vufvrb6VNaEPhFMFap99G84qu3Uuz-7wRDmv9GfzjY2q7l4BbJpYXSgr5KKagWs-aTbePqxWWTgD-usv3ErJl78B-YSwI6eq0eK8pradE)


Click the Business Rules shape to open the **Business Rules Shape Options** modal. In this modal, give a **Display Name** you’d like. Next, select "JSON" from the **Profile Type** field. Then, in the **Profile** field, choose the profile you created while setting up the Eyer-Partner connector.

![](https://lh7-us.googleusercontent.com/huhH40zvqgDjomQsOcDs-FiQvLV6ESWhIUJOZQzSFat479dB_O5DpOAEIV0ThAHlCm2JAire06T2Yqiid3p66bSXeeTldjVoIh7en4NW7JgPZKNqLc1chddG-dbMIIXNMNUu8v5gbMXS2B6b6_qjNx8)


Next, click **OK** to open the **Business Rules Shape** modal. Here, select **Create a New Rule** to create a new business rule.  

![](https://lh7-us.googleusercontent.com/jx7F5mevszk3LHorDlH5MF7bXTwYk-_Fre-DDdAwYChvxKRV-BYol7OUmIkyCQH8MR0BOVWaT-1Bpol8RtL_1BYtRc2afhhEpOdNsQ6wlPqic_rFXpo9VCpqjc6GYBxGx4T6t2wfBDF_d4TiHnv223w)


In the **Business Rules Shape** modal, click the **Add** dropdown and select **Field**.

![](https://lh7-us.googleusercontent.com/6TqANt46xKWvIF2whv5bZ3MWI4TI-lFb_DO9i4MZD0neeTZqhPfSuXe8us2YiWCZ3fwUzN7maub729lF4aLLk4qn2NaISLetP1gUNMAB9zgUkAsCuR88RTjSJEeGOfleFaXniSn5GOdMfEq9VKnxORA)


This action opens the **Add a field** modal. In the Alias field, enter “NewAnomalies”. Then, navigate through the **Field** input menu and select this menu: **Object -> new -> Array -> items1 -> Object -> severity**.

![](https://lh7-us.googleusercontent.com/Vf_Pnxd78zTc_ay4c4Met6la8HlmMJbhtqKN0J5vLogPuJs-EqUYP_JF7RAUC7IbjX9pVojuhC2dw0KCgErX6q4lMorwoKM2tc66Nl6KHOYeuRtMW39CzOjNzuujuUxlPM9iA72X47KfhYILHMM7e-w)


Click the **OK -> OK** button to save your field.
Next, create the condition that defines the criteria for the **NewAnomalies** field by following this process:

- Click the **Add a condition** link
- In the first dropdown, select the **NewAnomalies** field
- In the second dropdown, select the **!=** field
- In the third dropdown, select the **Static** field
- Leave the fourth field empty
- Click the **Save** button
![](https://lh7-us.googleusercontent.com/_D8vzYJMrRiYRBcHQJNzTnPpLlvYOfncfzwqPRjkDs8OwxKEtAagbWMPUOpBLNsUHJqbZOxHZr1egzKWU05yaWE31dEOFahlR-YXBjphf6pXjursr4WYQVz72wJMeC8z3eQ1FyO6-ya9_grJSDSvXWQ)


Add a stop shape to the rejected path of the process.

![](https://lh7-us.googleusercontent.com/CHqBz4_FsJksPRsh2_HfWOGjrvBtWYWl8FBEzReRBA-lk8BcJpMfy952S_fETLdSdyzNNdBNNo4_fwoXX-pAz1Jh-TFqMYgCjiu1Wb0HxQSTZypCzliRJ3tIQ6Tf8nYYfAgaLvsteSbMaLmtaZtKtoo)


If the anomalies are new, you want to save their IDs to your database so that they can persist for future monitoring. After storing the IDs of the anomaly alerts, you would want to send out an alert that a new anomaly has been detected.
To run both these processes consecutively, you need to add a Branch shape to the Accepted path from the Business rules shape. 

![](https://lh7-us.googleusercontent.com/2_XfFE0hKPfYDSOLN5-wFYJs0WN9m8Dy9jmJQq0DUlPT2SnsnIlLRJmVMdHGTXw-gFKboGBWPB2sB_L63vhuKt8u-3qqDujeh9g9hpbY_wowx64UWlVBeuKZNsY2cxMPc_vecXQiCRnK-4ePKGO3kh8)


**Change the anomalies data format from JSON to database format**
In the first path from the Branch shape (labeled 1), add the Map shape that will extract the id from the new anomalies object and change its format from JSON to database format. For in-depth information about the Map shape and its properties, refer to the [Boomi documentation](https://help.boomi.com/docs/atomsphere/integration/process%20building/r-atm-map_shape_a481eb4d-739a-46fb-b062-866d9d13f21a/).

![](https://lh7-us.googleusercontent.com/cMYUUiD9Ip83Va3f4J29B3fk0xVF1WHf6Z56RICR547oL0eUcThevpl1HLtgTkh6RhxWu7Q3i3gYTvqUqxZ31UDvbMmubltudXhXcncaRLjNxGgPhJp4r4_wW_W29RJKXYQBXSRs16kA0EX8Ex-ileE)


While this section won't cover the complete Map shape configuration, here are some key points to remember:

- **Source Profile**: The profile type is JSON, and the profile is the Eyer Connector Profile
- **Destination Profile**: The profile type is Database, and the profile is your database profile. 

**Mapping Instructions:**
Within the Map source, locate the field path **new -> Array -> items1 -> Object -> id**. Map this field to the field you want to store  "id" in the Map destination section. 

![](https://lh7-us.googleusercontent.com/Ooz1PxPSbPYiM3mBB4-RY4XvVdCN4qNKawg8bej-cjhPcN0hF_OADl9gDj9R1MjVe_Vv-cXeFO6dRHEjLPtciEVQDeIQ_ZXPidMZPcooOusIEkrc51aS58UA85uTDJlPSvb-XDHH9vPcqTPSju6XcWQ)


**Store the new anomaly id on the database**
Next, add the **Database** connector to store the alert ID. Then, add the **Stop** shape. To learn more about the Boomi Database connector, check out [the official Boomi documentation.](https://help.boomi.com/docs/Atomsphere/Integration/Connectors/r-atm-Database_connector_c4bd0269-5f4b-42d6-b4cf-08ddada63a94)

![](https://lh7-us.googleusercontent.com/cKXgkLb9qi61JrZ5a1nzJj1dpTZXv7K7QMSBm4AUpRtK7RMmdcgnko_E36Q4RzzvfauaWjCW632wxsxIBggeFW0grN4I9-B-yxJBiTuDyBxutkI5uYwdyRSsVZYRjcFVtUbvygrpg_PW5CqHZ9oXjX0)


**Create the custom message you would like to alert the user**
You will create the process for alerting the user in the second path from the **Branch** shape (labeled 2 ).
Add the **Message** shape to create your custom message. Click the shape to open its dedicated sidebar.

![](https://lh7-us.googleusercontent.com/ICBHoPHD_L3XjAZIFMHUWJE31IA7kJysuoJMWNsVqxjg_lu1SKAKYGr3nkA8g5cgLKinBLMqB8p6_Sz9sC8yhm45QIimN9eHKcjOiojN3tPRb-x7Ux4RgYYHPbmpr6PpdwxFS3h1YaJJwvRY9NPYrrk)

![](https://lh7-us.googleusercontent.com/VJUFQsgV3Tu5VB6PsT0CkVtitIcnSfFqF8ubaSQC5aTpqEXbryCR-R5R3nDQMqgwPKINHTkFe4W9suJULqMN1ZIrI9IGOEg0e41POkjNbXIIepQ95NmJZw1M9jcIJ7cyyEtWvZzkqe93x6wkG4617c4)


In this sidebar, write the message you want to send out in the **Message** input field. 
**For example:**
> New anomaly of interest detected and ID is written to the database.


![](https://lh7-us.googleusercontent.com/-zPbfIr71BBYLBM_ZmWdfLXm6Ja4chskP8f9FXTWSifZUhOkewdnK2xukmd1iWAC92vSs8ltRk56ogBz0yL-pMYqPbm3SwyTKcf6nktBa-9QONqnr9SDo5hW2eM8HPfQrzwWDnVAY3SKW1UiY1aqG40)


Click the **OK** button to save your custom message.
**Send out the alerts via email**
Add the Mail connector to send out the message to learn how to configure the Mail connector. Check out the [Boomi documentation](https://help.boomi.com/docs/atomsphere/integration/connectors/r-atm-mail_connector_4e32e771-5351-4e2c-b1fd-d7bd1bd82f1a/#:~:text=Use%20the%20Mail%20connector%20to,exchanging%20data%20between%20trading%20partners.) to learn how to connect and configure your Mail connector.


![](https://lh7-us.googleusercontent.com/hGxWcCPltMCXGz9PfUP_Uo0HZyoRAF9Lrg3OIhcYtd4bTYfAznvLhA7KE9TUo3DrwcbkJF80tbxIBfDLHS3IhIcWg3K-CcjfTMm8bFNglQdeu-dP-YnqJeNz8cD_FmIm9BhIIcSLMfSb-JnbKspnBV8)


Add the **Stop** shape to end the process after sending out the alerts.

![](https://lh7-us.googleusercontent.com/Tbf1uKIyeXyLxQF7OSQAe5Zf2ZC0DHDAIUl4DPvY_Kq1HsEAWQm4VaXtt419neMlnvM8T7BOE9oQBcuEsP2aYrnpGVtBIPJkC2ViKiStTT7VHmct3E-fM31HhVm81JXw6CDJatHfXDddECIgN5HKzH0)



![](https://lh7-us.googleusercontent.com/KUBmXi8yVFPe7ZFaaSRROhYBKtTR25TelZ_lciJnuhrqdr-WgPMciWkPbz_0pgsQz_Fk4IPF5iD--VYmPIskO4dyFyvYLXq6yZ2vXl4YsfqmyCAnYD7U-dV3CoToWy4UbvUEazvmLe21njeiKkPIYs4)



## Send out an alert when an anomaly is updated

To follow an anomaly and send out an alert when the anomaly is updated, you need to:

- Get the anomaly id from the database 
- Get the updated anomaly id from the cache 
- Check if the updated anomaly is the anomaly you are interested in following
- Create a custom message if the updated anomaly is the anomaly of interest
- Send out an alert to the user

**Get the anomaly id from the database**
In the second branch, add the Boomi database connector to retrieve the data. To learn more about the database connector, check out the [official Boomi documentation](https://help.boomi.com/docs/Atomsphere/Integration/Connectors/r-atm-Database_connector_c4bd0269-5f4b-42d6-b4cf-08ddada63a94).
**Get the updated anomaly id from the cache** 
Next, add the **Retrieve from Cache** shape to collect the updated anomaly id you stored at the start of the process.

![](https://lh7-us.googleusercontent.com/egCqB3C7jX801vfg7M_Rlkd48MUpx-QXYMll3V9vsYUpFn1OUmVa4wqJqwjG8AUuhLwP9lUKpRNvZzcLMMpXUsR9tZq09g5jO1coNji0-D5ZZDitz4Pz2zWwp-FJF6w6srlZHeeUIoYu-sExbByK-OU)


Click on this **Retrieve from Cache** shape to open its dedicated sidebar. Fill out this sidebar with the following information:

- Display Name -> Fetch Updated ID 
- Document Cache -> Select the updated cache document you created previously
- Retrieve -> All Documents
- Empty Cache Behaviour -> Fail document with errors

/;

![](https://lh7-us.googleusercontent.com/bjmlcxrsawF_wpbJeYFgSy93ZeTu-8fTCv9Pc9UNwHlZ3M1RZJmktiL8eE6RoaYxIUp8oU5bk8eaIHxq99KMDZeOnDD-_aJq2Q9ILVby2qwLH0wZ-LJ8UavYDsk319cSq58ZLgVrJI4op31JKOA8Qzo)


Understanding that you can have multiple alert ids on your database, you need to verify whether the cache ID and anomaly ID stored in the database are the same. This enables you to determine if you are monitoring the alert of interest.
**Create the Business rules fields.**
To perform this check, add a **Business Rules** shape to your process. 

![](https://lh7-us.googleusercontent.com/nsRs0fU33DP9EvpWzhT-pA15fM1mHtw0AjQcbNcT7Bug2DPLGpgcWxkNqVs3FzkqZlqeM5Y2cx_uLOgm2-Y6lgG15pLgDnopIfmgTagPI6hJNGWuuour8gCi-xS4pvN_X1Pjxo0MMIOHwO8ZvXZS7Rw)


Click on the **Business Rules shape** to open the **Business Rules Shape Options** modal. In this modal, select Database in the **Profile Type** field. 
In the **Profile** field, select the profile you created while configuring your database connector.

![](https://lh7-us.googleusercontent.com/PaR-hd06Tk8G33Cc7S-9KgLjQNLcqXhy8aU1NG-sL7eQD32zQkiLc0N_iLiC1wR6xmTVPp_2VFMJNhe3dQaUxPuk4bHwyr810zQXTSNC7-csBpk_oi89XfVNagTQNBkFbjHJjtcuQb6VC3DLLFsiDOU)


Next, click the **OK** button to open the **Business Rules Shape** modal. In this modal, click the **Create a New Rule** button to create a new business rule.  
Click the **Add** dropdown and select **Field** from the menu dropdown.

![](https://lh7-us.googleusercontent.com/8YdwGHNQ4khz3h_muZduxI8kfhLjcFA0-y7rH5lxO5dI9Zri44nnlTjKKA4kH5qUFi6IHaBQBHDyIlQPruEDKKT9hbAzrG4st68uj-7dqemuWTS_gftWyXCxnQYC18jJhdF74-lbttoXs3I9I3FS_fw)


This action opens up the **Add a field** modal. In the Alias field, input “DBId”, then navigate through the **Field** input menu and select: **Statement -> Fields -> id**.

![](https://lh7-us.googleusercontent.com/YwuVn5eg-e2PDp0E3ZYEcQ6ld2Xxv_PgNYdqJ1xLX2hLH37MSn-GbCqwDylowmkhW2XQ5QSGOSiUKzhoi-CxtNFfG9IR793hDtUI8rwXK3XyVGMS5M8OehL-sDvAjAwZCnOFTsvSekDPAz2xf80l7pE)


Click the **OK -> OK** button to save your field.
Create another field to hold the cached id. To collect this id, you need to create a Business rules function, click the **Add** dropdown, and select **Function** from the menu dropdown. 

![](https://lh7-us.googleusercontent.com/PNJXs7j-oea7gK1BWjHjs8AodJBmurVYkrbweR10chCKI-tXtauZMBn6qhb6UUu5N4ZrDcG1Vw1HkMxdi-PHgTUfACNAsR4mOh__CDdgMNWkRXhFeUqFr5QX4c5mW_uj9vW15Hbe53qc9yryM_DKnP4)


This action opens up an **Add a Function** modal.
In this modal, click the **Category** dropdown and select **Lookup**. In the **Functions** menu, select **Document cache lookup** and click the **OK** button.

![](https://lh7-us.googleusercontent.com/QJWkfEmUoDl9h9f0fxPzY0OrKm5TFVrYPBQVpQOiLE48xWCRRv1Y-qLsnej91RwU48xAySjd82TQJV2wHIku26qJqTatP5HGcQ6DKZ0_yCAZvtLJpq8suTCZBeJMGH6D05fDGQqOFyhzzpyIPuPAW9I)


This action opens up the **Document Cache Lookup** modal. 

![](https://lh7-us.googleusercontent.com/xqRafRqaleA4waseThLSezzZiXgdk_qUR3qGu4YVrBm6DcaepZnP6GWobF7O6SYtUEgbMhGQg_eeCrVNbIH8reOAMd4wWjUuOGz1QFuXLdzxIuGBrlgO1XYKPlNzuRQCX_q9QIsrEd7c_JztDbo6Tps)


Fill out this modal with the following information:

- Document Cache -> Select the Cache profile you created for the updated anomaly cache at the beginning
- Cache Index -> Select ID from the dropdown
- Outputs -> Select the **+** button, navigate through the menu, and select ID you created
![](https://lh7-us.googleusercontent.com/zwAbFZs7iwvia5GUQCPS1VlopsZjvFzK_gzx_9-MnBjheAjbQPHaWxOD5RzMdi-mDdzPSJvbY01y3WrKNsyhcupJ2Eb9K6VtB7bLc5UjFvWN1u9Bmlo8eQHaDNjPOq8jjibrFFSX8SzNFDvaFwcFe-g)



![](https://lh7-us.googleusercontent.com/fqXzQ5axWRvQucTg4Sdt5YQAt2c2BodgIwNQ9sQd-_xNvb5ZFZS6UWHT3zTLKxBABNcDVFsq9aGsZKcBHe7ohrLil6rLywliCTqRFoZSj5PeXKZR3XjRUugLYk_ycjBSfhmorOtJflp__jhg4Ilt1j8)


Click the **Add** button, followed by the **OK** button, to return to the **Add a Function** modal. In this modal, you can provide the **Alias** you require, then click **OK** to save the Alias and return to the **Business Rules** modal.

![](https://lh7-us.googleusercontent.com/7rPRkchvxq6SfalW6dZZ0p_cBbbyWGsAT98E1T9E8whMTW_PaC0SruOyt7jPTCkgOr3PZhPt_GMYYeRg-ycHX3MyXi3MT3wiOuQDeFHDZq5e_zScNB09caASSX_nfescNRXYJfhqqGDZLXUO06zp03E)


**Create the Business rules condition that checks if the updated anomaly is the anomaly of interest**
To create the condition that checks if the id stored in the database and cache are the same, perform the following processes:

- Click the **Add a Condition** link:
- In the first dropdown, select the **DBId** field
- In the second dropdown, select the **=** field
- In the third dropdown, select the **CacheId** field
- Click the **Save** button
![](https://lh7-us.googleusercontent.com/exnFpFZZX_1NYhOJ-4b-Qka17LvPigjS1KxF0dGCcaVgws9MpKr-Rt2O8vNqN3HxyHgt3nQfdx57-a8diSUhtM0M9lYwiANsnfH_NpZ5w7tEp5nz1_wYncMYdGhA5Qk9-_-XqfswTaTGRhrfV0PWzbg)



![](https://lh7-us.googleusercontent.com/nghChqmZmURVMqAaQ6YBQ1CTB07_F453_3H-bNzK4K6r8uFP4OMikCcmAoDplBBUVNgrzZC4JwECgOFh9l4ZY4Qr7au56ErwyADfml78KPMeRcNQjHYvZRRG8ETKywoCQhc5Zvw8-ZefSn9b5Z-i92I)


**Create a custom message if the updated anomaly is the anomaly of interest**
In the accepted path from the **Business Rules** shape, you will create the process alerting the user.
Add the **Message** shape to create your custom message. Click the shape to open its dedicated sidebar.

![](https://lh7-us.googleusercontent.com/OItbmX9AC8esl-WtteDK95E9VBkBKwe_zIto3xGqoQ8ApZVVlBhDlIQ1FWdwpS34bOUhehoXLdiZnQA9aSGL2rG2LgywgDsmHLxG4Q6Kf2DZqpYx3U2iTBu6FTDdyCMy3LCitHULdaWH_rsb7klOcRk)


In this sidebar, write the message you want to send out in the **Message** input field. 
**For example:**
> Anomaly of interest has been updated.

![](https://lh7-us.googleusercontent.com/uE-5gar7Mgq2nnHrK4Iumtb4cydbQDHfrs17izVQmwA-53pDdyLoSMAPPAPuxMWBqzmim21yhV7rQH9T9NEJj5BzUScto4k5D2VARlviy40BeNunPOjWPhO7uGrp7biTp5X-nYEXc7ujunq-T6yzNqs)


Click the **OK** button to save your custom message.
**Send out an alert to the user**
Add the **Mail** connector to send out the message to learn how to configure the **Mail** connector; Check out the [Boomi documentation](https://help.boomi.com/docs/atomsphere/integration/connectors/r-atm-mail_connector_4e32e771-5351-4e2c-b1fd-d7bd1bd82f1a/#:~:text=Use%20the%20Mail%20connector%20to,exchanging%20data%20between%20trading%20partners.) to learn how to connect and configure your Mail connector.
When you are done, add a **Stop** shape to the rejected path from the Business rules shape, and after sending out the email.
 

![](https://lh7-us.googleusercontent.com/048qawmLc4CInDYmaB9wFW_Ah8DhyCUWhx4lQoJzauWtmmbZ8Ti7C4lFixdAbJ6XDjWD7gy45-sR9NQDwJJCEUUoFk7ztAsZOW6Ggy1KbojoOOI3Cn_rySgW9dZktkzkQGM4WmZe6assNtrFXWRrtS0)



## Send out an alert when an anomaly is closed

Just like we set up alerts for updated anomalies, you can also create alerts for closed anomalies within your Boomi ecosystem. Here's what you need to do:

- Get the anomaly id from the database 
- Get the closed anomaly id from the cache 
- Check if the closed anomaly is the anomaly you are interested in following
- Create a custom message if the closed anomaly is the anomaly of interest
- Send out an alert to the user

**Get the anomaly id from the database** 
In the third branch, add the Boomi database connector to retrieve the data. To learn more about the database connector, check out the [official Boomi documentation](https://help.boomi.com/docs/Atomsphere/Integration/Connectors/r-atm-Database_connector_c4bd0269-5f4b-42d6-b4cf-08ddada63a94).

![](https://lh7-us.googleusercontent.com/SzmNhLFkTW4u0sEaXYS733hBn3aF7oZd9x4L9ieHXwL9bDORmF_-ATsZBo92YQ3M7MdXfJfFAMGX24aB0gnG5vbOkdLYrJZiTwXXQsM7pMHgr4MUPc3Nabb_zY7OxArZkOLPKzH3EbFVj82dbneWA9Y)



![](https://lh7-us.googleusercontent.com/Rjg6ZE_ID1zSIsmC7jo6IwF4DIS-LGTxkwqV-gExTnbsyiAC8emPHGccON7dsvKKKchOLHWSkAcrQzpM5Wui-PI2j-cgzIMCJQHJID6hc5xsL6ZaFzMMxvyVIGE40Z0Kogrzi0uzaKTXcwuQ9Htw-Y0)


**Get the updated anomaly id from the cache** 
Next, add the **Retrieve from Cache** shape to collect the closed anomaly id you stored at the start of the process.

![](https://lh7-us.googleusercontent.com/XQpSoUX2vA823_eh4VPAY9V6lsUWZBChCpWMJdufm1MjI09Cy_l2fNeagLLon6JT7cyv39H3JwlSSX_lg9-Sjn9HHsuoZN1uGnXoohzK6SyKwwO5SXbbXit6rH1vqXiNhodZiyOoIrcPeRnvte6OHCQ)


Click on this Retrieve from Cache shape to open its dedicated sidebar. Fill out this sidebar with the following information:

- Display Name -> Fetch Closed ID 
- Document Cache -> Select the closed cache document you created previously
- Retrieve -> All Documents
- Empty Cache Behaviour -> Fail document with errors
![](https://lh7-us.googleusercontent.com/int0GJ84-lVIWM6Wh-wrQYPv7fm3Ji2z6HKv7ikXwvJm3uqjvbPP3kwncY19hnAQT-sPpZtT8SnGcPToeO_H9kmAPEYT1AhRpyN22PN2Tn-7JCEx4PaDcXrun2R5zH7RnWu9K8Xp_4Pwf9A-VXzMJBI)


Understanding that you can have multiple alert ids on your database, you need to verify whether the cache ID and anomaly ID stored in the database are the same. This enables you to determine if you are monitoring the alert of interest.
**Create the Business rules fields**
To perform this check, add a **Business Rules** shape to your process. 

![](https://lh7-us.googleusercontent.com/iZfafXKawtkKIaiNNZyYpbjAERD1XOiepPlXnzBWLimKw-1uV4ELqKvFEX12NVt1JM_4oCqiLvqdJrVQSL-9Dq-HaQwP3u3wx1G1H25UMEdDEioybaPs6uiLb1lXHJDW5GBmTeHGfJ_-ACRI0i69Sgk)


Click on the **Business Rules shape** to open the **Business Rules Shape Options** modal. In this modal, select Database in the **Profile Type** field.  In the **Profile** field, select the profile you created while configuring your database connector.

![](https://lh7-us.googleusercontent.com/bvMzCVbSCqLXTHIqwheE40aIXlzzHPRvjf32rRy7ZSzLnCN_KzTvH6jXdgGSdS2XnRIYoNuuqBvyfHXz1RRVnZn82OiaxjHWysW2ZzlK8dEM60Ncqbbll8u-xY5vyI4DMgq0pITdR7whm86R8S0yqXI)


Next, click the **OK** button to open the **Business Rules Shape** modal. In this modal, click the **Create a New Rule** button to create a new business rule.  
Click the **Add** dropdown and select **Field** from the menu dropdown.

![](https://lh7-us.googleusercontent.com/TRq6kMgWej81i6BIk3gphxMN2z7RoURFq-3DpNWjinXrK65zLyU8KR3_fiPwe7hoI0W45DLGVFd_Kj2E80WO-hcQ3Vcc1GIJ3HgWGjSJX_Qvi05kG_QhlPUnmFriSIM0kGWJ56wT7oG1oMTIATmH6_A)


This action opens up the **Add a field** modal. In the Alias field, input “DBId”, then navigate through the **Field** input menu and select this menu: **Statement -> Fields -> id**.

![](https://lh7-us.googleusercontent.com/waflWEHV2X0T3rmgO6Y9TPaXp9NtGqCZBe5a1Ueah_V6RLKRiGEb4ArLQR-nTyBWzQQbgU8TfgOZ9tyaqF2HihclEQ8kpRh593xDI9t1EC4V1uKmMjnibk8mipViPBsovy4_QT9SaDKIyt5Mdw5DT1w)


Click the **OK -> OK** button to save your field.

![](https://lh7-us.googleusercontent.com/Jxq-Goa5RlAePAh6V7NYZlLDMTIC8y39-KX2FEcUAEihakiNnmJotEAhG3RUT71AY-gZEjovp-JbUpBxHAocOOOxWcp7lq7ectUBUBCjB3GOtySsNXf22UE-a_426z1E-yun_LjXWqssdQ-gO2p3amU)


Create another field to hold the cached ID. To collect this id, you need to create a Business rules function, click the **Add** dropdown, and select **Function** from the menu dropdown. 

![](https://lh7-us.googleusercontent.com/lV09BOtkxiCDerPDJXJvTSThW2gBTfRLCBKe6B3h_tRolWvQ7QFLRUhDqGVb6TJG-ox4Kw3lPRmZdC4oWGIRY1yZU-LcsfQAiXgBRBIUueMAmXcytzEISb_M1-MNlokx4epwp10thoUsY83l7RmJGBU)


This action opens up an **Add a Function** modal.

![](https://lh7-us.googleusercontent.com/rjejFw8e2AjiNpyOBBbkWrpxrs1Cc19GDTVatjXKdy3EqfbrkipdbRbRf2pHEn1pUB2jwMcZLaiIZw0Nw_UbrqUUzojefsyXygFOOTnMpduAUmLdduyjloTon3Hn2_vRUhBIxojZ3BA4QLv75Rm_VHY)


In this modal, click the **Category** dropdown and select **Lookup**. In the **Functions** menu, select **Document cache lookup** and click the **OK** button.

![](https://lh7-us.googleusercontent.com/bOJHF9CypsfB4pU2_1NxzDC2ryYQEQmZv5bpSLmI1OIKJ52j9SpNIXIAMI5k3dSR7Xm9lg1Abrq1ljIYV56aa0LhJ0ystF_gf_qwSwrJqI-dpwA0nPQ0eaQ_kCbU39jM9Z5uS35TqvZn-oQejjAnPSo)


This action opens up the **Document Cache Lookup** modal. Fill out this modal with the following information:

- Document Cache -> Select the Cache profile you created for the closed anomaly cache at the beginning
- Cache Index -> Select ID from the dropdown
- Outputs -> Select the **+** button, navigate through the menu, and select ID you created
![](https://lh7-us.googleusercontent.com/tPwcUZHwIvGFFthQTY2roZMObp9NDill5hvHLTH8yIcRNaKOccP8bPWAeA0VSA0LjvBsCAPf-fFS8T0Gf1CVLVUUfTwYGaUkFi5_-9ZteuvrA7gLsfMYEcA7vnQY1IlfE8OYL1ejnvHp75fx4ZlqDxs)


Click the **Add** button, followed by the **OK** button, to return to the **Add a Function** modal. In this modal, you can provide the **Alias** you require, then click **OK** to save the Alias and return to the **Business Rules** modal.

![](https://lh7-us.googleusercontent.com/6uyfDpPBbE2TlYslahV7N0h9XGkONvn0XPLraY-odKPN_pDvPp1ITLEvoP86uO7worjx0UI7g6iPTPWfOWqM1_RMBet-3zpHQUAPpUoHq64NTJqqNRVTjYgDTZPxoACLM5lWaZDlGj7g1y_GR23pt60)


**Create the Business rules condition that checks if the updated anomaly is the anomaly of interest**
To create the condition that checks if the id stored in the database and cache are the same, perform the following processes:

- Click the **Add a Condition** link:
- In the first dropdown, select the **DBId** field
- In the second dropdown, select the **=** field
- In the third dropdown, select the **CacheId** field
- Click the **Save** button
![](https://lh7-us.googleusercontent.com/DZ39iJduREW6coWZyVAABgGXwn__C4UGOMyvIfviF21fGKECZ3mt9Y52ow9MMlLHPUtWahMNMRQeD0nYPQUkSgML3T44hO-VA7l6cGmrVrbHna9-mhxYYDYouutI3ECosQW0TZg8OZMqINrw3Up_8fU)



![](https://lh7-us.googleusercontent.com/mAIeH20I8mohTrBl_OwZ4sAJPOLV0n3QRK6xghvwpdOaEeNoaxf0SScTzetTX44L_ZIFApTkm6RVsE17bNRChX3WvLRc9s51mYy3I8AViccuMfNrUPQ__UPs1SXtaHmVYJh0IqDwdFG5EjsZuD5Je2w)


**Create a custom message if the updated anomaly is the anomaly of interest**
In the accepted path from the Business rules shape, you will create the process alerting the user.
Add the **Message** shape to create your custom message. Click the shape to open its dedicated sidebar.

![](https://lh7-us.googleusercontent.com/wGoV6TZ3Eb-rxo66u5hehcCOTN0z19OfsSz7qG5jyQHvyd1XdXLy-cl2A6XgCGXgzC7Vvx6Gus07fssHBiPvnSwH375GadrPxzf8JA_l6ic9e-E9EaJ61IVPXmhFnhy23td08mtuEhKyIpzg95Bk7hU)


In this sidebar, write the message you want to send out in the **Message** input field.
**For example:**
> Anomaly of interest has been closed.

![](https://lh7-us.googleusercontent.com/0XdhhRHJ3-IRqkHuK9ZKu3Xyf2g_Ji7xT9gYeR1oKlv6vOro4UA3F6r61vrHNKdkyc3vRI7BlxR_-ea1aSWnShQksqz2yVE4C9eSYQJ0EBI82EtTRjYw4CrQWI2sXKzMSmWngIMhVnJ5UWrrIlwMO84)


Click the OK button to save your custom message.
**Send out an alert to the user**
Add the **Mail** connector to send out the message to learn how to configure the **Mail** connector; Check out the [Boomi documentation](https://help.boomi.com/docs/atomsphere/integration/connectors/r-atm-mail_connector_4e32e771-5351-4e2c-b1fd-d7bd1bd82f1a/#:~:text=Use%20the%20Mail%20connector%20to,exchanging%20data%20between%20trading%20partners.) to learn how to connect and configure your Mail connector.



![](https://lh7-us.googleusercontent.com/z3DjtWaEDdo_Jj5miR1NPihPWNAkR__UtMqJkL5v5fkfaZzXSuAFIwM1u3bgxT24GtjeXDUkJU0rzSat1kdPOEK6kKDH3HKEewe_93EC__phQgFeqIkzYxay-8NMpsG4ecMzWy-0R3dnJwVypOCigBE)


When you are done, add a **Stop** shape to the rejected path from the Business rules shape, and after sending out the email.

![](https://lh7-us.googleusercontent.com/e6hZ_LidaRlbBnXuackFyJIwldetASC3y4_fgpt85bwfnIUcD_Xm8uAG_l9ETE8g6LfJaPgcRDDvtG6TPMMp5MmyRH3bkMoCb1bLPl4vkl5eoogKqvlFNBwOFWcrxZVBDVQdmQLjlS9R6fr8sCgHJhA)


**Send out an email containing all active alerts in a JSON object (optional)**
Finally, you can also decide to receive alerts for all anomalies regardless of their status.
To do this, add a **Mail** connector to the fourth branch (labeled 4), and then a **Stop** connector to end the process. 


![](https://lh7-us.googleusercontent.com/cKQjjKbCU7o_rccu0J_7TMoXPt_9Ty5a96_sr_QgaOlf2FFT7VZsNGiSA0u8T1XuHyQajGB5bH2kkExqtztRVO19jJ3EuntzPlJkVON8CR76uEbPwhN89IOJg-G7V36_sSyRgkKry2sORWpSEM8Mpak)



