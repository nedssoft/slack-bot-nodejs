const express = require('express');
require('dotenv').config();
const router = express.Router();
const { WebClient } = require('@slack/web-api');

const token = process.env.SLACK_TOKEN;

// Initialize
const web = new WebClient(token, { retries: 0 });

router.post('/slack/frontdesk', (req, res) => {
  const { trigger_id: triggerId } = req.body;

  res.status(200).send('');
  (async () => {
    // Open a modal.
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
        callback_id: 'frontdesk',
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
  })();
});

router.post('/slack/interactions', (req, res) => {

  res.status(200).send();

  const payload = JSON.parse(req.body.payload);

  // view the payload on console
  console.log(payload);

  if (
    payload.type === 'view_submission' &&
    payload.view.callback_id === 'frontdesk'
  ) {
    const { values } = payload.view.state;
    const title = values.title.title.value;
    const description = values.description.description.value;

    console.log(`title ----->${title}`, `description---->${description}`);
  }
});

module.exports = router;
