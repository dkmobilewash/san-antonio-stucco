/**
 * Build-time entry used by scripts/prerender.ts. Renders the real React tree for one URL so
 * the HTML Google indexes is exactly what the browser hydrates (no hand-written shadow copy).
 */
import { StrictMode } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Writable } from 'node:stream';
import { AppLayout } from './App';

export function render(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    const sink = new Writable({
      write(chunk, _enc, cb) { chunks.push(Buffer.from(chunk)); cb(); },
      final(cb) { resolve(Buffer.concat(chunks).toString('utf8')); cb(); },
    });
    const stream = renderToPipeableStream(
      <StrictMode>
        <StaticRouter location={url}>
          <AppLayout />
        </StaticRouter>
      </StrictMode>,
      {
        // Wait for every Suspense boundary (the lazy() pages) so the output is complete static HTML.
        onAllReady() { stream.pipe(sink); },
        onError(err) { reject(err); },
      },
    );
  });
}
