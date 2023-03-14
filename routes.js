const fs = require('fs')


const requestHandler = (req, res) => {
    const url = req.url
    const method = req.method
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write(`
              <html>
                <head>
                  <title>Send Message</title>
                </head>
                <body>
                  <form action="/message" method="POST">
                    <label for="message">Message:</label>
                    <input type="text" id="message" name="message" />
                    <button type="submit">Send</button>
                  </form>
                </body>
              </html>
            `);
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = []
        req.on('data', (chunk) => {
            body.push(chunk)
        });

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            })
        });
    }

    res.setHeader('Content-Type', 'text/html');
    res.write(`
            <html>
              <body>
              Hello World!
              </body>
            </html>
          `);
    return res.end();
}

exports.handler = requestHandler,
exports.text = "running"
