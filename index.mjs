import * as Misskey from 'misskey-js';

export const handler = async (_event, _context) => {
  const cli = new Misskey.api.APIClient({
    origin: process.env.MISSKEY_URI,
    credential: process.env.MISSKEY_TOKEN,
  });

  const meta = await cli.request('meta', { detail: true });

  const response = {
    statusCode: 200,
    body: JSON.stringify(meta, null, 2),
  };
  return response;
};
