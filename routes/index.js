const express = require('express');
require('dotenv').config();
const router = express.Router();
const { WebClient } = require('@slack/web-api');

const token = process.env.SLACK_TOKEN;

// Initialize
const web = new WebClient(token, { retries: 0 });

router.post('/slack/command/sign-in', (req, res) => {
    
  const { trigger_id: triggerId } = req.body;
  (async () => {
    // Open a modal.
    // Find more arguments and details of the response: https://api.slack.com/methods/views.open
    await web.views.open({
      trigger_id: triggerId,
      view: {
        type: 'modal',
        title: {
          type: 'plain_text',
          text: 'Contact Front Desk',
        },
        submit: {
          type: 'plain_text',
          text: 'Submit',
        },
        notify_on_close: true,
        blocks: [
          {
            type: 'section',
            text: {
              type: 'plain_text',
              text: ':wave: We will get back to you as soon as possible',
              emoji: true,
            },
          },
          {
            type: 'divider',
          },
         
          {
            type: 'input',
            block_id: 'title',
            label: {
              type: 'plain_text',
              text: 'Title',
              emoji: true,
            },
            element: {
              type: 'plain_text_input',
              multiline: false,
              action_id: 'title',
            },
          },
          {
            type: 'input',
            block_id: 'description',
            label: {
              type: 'plain_text',
              text: 'Description',
              emoji: true,
            },
            element: {
              type: 'plain_text_input',
              multiline: true,
              action_id: 'description',
            },
            optional: true,
          },
        ],
      },
    });

    res.status(200).send('yara');
  })();
});


router.post('/slack/interactions', (req, res) => {
  const payload = JSON.parse(req.body.payload);

  res.status(200).send({ response_action: 'clear' });

  const { values } = payload.view.state;
  const title = values.title.title.value
  const description = values.description.description.value

  console.log(title, description);

  
});

module.exports = router;
