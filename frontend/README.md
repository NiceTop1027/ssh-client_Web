# NT-SSHCL Frontend

This is the frontend for the NT-SSHCL application, a web-based SSH client.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Socket.IO Client](https://socket.io/docs/v4/client-api/)
- [xterm.js](https://xtermjs.org/)

## Testing

This project uses [Cypress](https://www.cypress.io/) for end-to-end testing.

To run the tests, first make sure the development server is running, then run:

```bash
npm run cypress:open
```