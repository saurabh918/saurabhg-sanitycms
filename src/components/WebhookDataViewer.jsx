import React, { useState } from 'react';
import axios from 'axios';

const WebhookDataViewer = () => {
  const [webhookData, setWebhookData] = useState(null);
  const webhookUrl = 'https://sanity-with-react-blogs.netlify.app/'; // Replace with the copied webhook URL

  const handleWebhook = async () => {
    try {
      const response = await axios.get(webhookUrl);
      setWebhookData(response.data);
    } catch (error) {
      console.error('Error fetching webhook data:', error);
    }
  };
  console.log(webhookData)
  return (
    <div>
      <button onClick={handleWebhook}>Get Webhook Data</button>
      {webhookData &&  (
        <pre>
          <code>{(webhookData)}</code>
        </pre>
      )}
    </div>
  );
};

export default WebhookDataViewer;
