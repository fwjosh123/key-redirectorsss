export default function handler(req, res) {
  const COOKIE_NAME = 'userKey';

  // Generate 16-char key starting with TJ-
  function generateKey() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomPart = '';
    for (let i = 0; i < 13; i++) {
      randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return 'TJ-' + randomPart;
  }

  // Parse cookies from request header
  const cookies = req.headers.cookie || '';
  const parsedCookies = Object.fromEntries(
    cookies.split(';').map(c => {
      const [k,v] = c.trim().split('=');
      return [k,v];
    })
  );

  let userKey = parsedCookies[COOKIE_NAME];

  // Detect Linkvertise referrer
  const referer = req.headers.referer || '';
  const cameFromLinkvertise = referer.includes('linkvertise.com');

  // Generate new key if no cookie or came from Linkvertise
  if (!userKey || cameFromLinkvertise) {
    userKey = generateKey();
  }

  // Set cookie for 1 hour
  const expireDate = new Date(Date.now() + 3600 * 1000).toUTCString();
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=${userKey}; Path=/; HttpOnly; SameSite=Lax; Expires=${expireDate}`);

  // Return key JSON
  res.status(200).json({ key: userKey });
}
