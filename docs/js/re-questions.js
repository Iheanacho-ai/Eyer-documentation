export const faq = [
    {
      q: "Where do I get the agent and connector API keys?",
      a: "If you have yet to contact us and subscribe to Eyer, please visit our website at Eyer - headless AIOps. If you are subscribed and need help finding your keys, please create a ticket on our support site."
    },
    {
      q: "My Telegraf agent(s) get a 500 code; how can I fix this?",
      a: "Please submit a ticket."
    },
    {
      q: "I am not receiving any anomaly alerts; why?",
      a: "Eyer needs at least one week of data before automatically enabling anomaly detection. If you already have more than one week of data, another option is that there have not been any situations that trigger an alert."
    },
    {
      q: "Can I collect Atom / Molecule metrics without installing agents directly on the host? For instance, monitor a Docker Atom / Molecule?",
      a: "Yes, you can. For instructions on how to host the metric collection agent remotely, see the data collector installation."
    },
    {   
      q: "The polling interval set in the Telegraf agent (1s for local installs, 3s for agentless) is too high for my setup. Can I lower these values?",
      a: "In short, yes, but be aware that lowering the sampling interval will produce datasets with lower resolutions, which will also impact the datasets used for Eyer machine learning. Short-lived spikes in metrics might not be captured in the aggregated data when the sampling interval is lowered. Please see the Adjust the Telegraf sampling interval for more information."
    },
    {
      q: "My Eyer - Partner Connector is not able to retrieve any data / not able to connect.",
      a: "You can manually verify the connection/authentication using a program like Postman and add your authentication token to the header (Authorization). The query (GET) will then look something like https://boomi.eyer.ai/api/anomalies?to=2024-02-20T11:00:00Z (replace the date with the current date)."
    },
    {
      q: "Where should I put my agent authentication key?",
      a: "Your agent authentication key should be in the Telegraf config file provided by Eyer, in the [[outputs.http]]/[[outputs.http.headers]]/authenticate section."
    },
    {
      q: "My Telegraf agent(s) do not receive any JMX data.",
      a: "Please make sure that the Jolokia agent(s) are running. See the install guide for information on how to verify."
    },
    {
      q: "How can I verify my Eyer - Partner Connector authentication key manually?",
      a: "Please see the above question on 'My Eyer - Partner Connector is not able to retrieve any data / not able to connect.'"
    },
    {
      q: "Can I deploy Jolokia / Telegraf on separate VMs / containers, even if I only have a single atom?",
      a: "Yes, you can."
    },
    {
      q: "Are there any different monitoring capabilities on atoms vs molecules?",
      a: "Currently no."
    },
    {
      q: "I have questions that are not answered here.",
      a: "Please contact our support team for further assistance."
    }
];
  