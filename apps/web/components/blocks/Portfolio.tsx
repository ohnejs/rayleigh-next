'use client';

import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';

import type { Block } from '../../ohne';
import type { Slide } from '../Slider';

import { Container } from '../Container';
import { IconSearch } from '../icon/Search';

// The slider's code loads the first time a visitor opens an image, not with the page.
const Slider = dynamic(() => import('../Slider').then((module) => module.Slider));

// `'use client'` lets this block react to clicks. `OhneBlocks` still renders it with its `fields`.
export function Portfolio({ fields }: Block<'Portfolio'>) {
  const [open, setOpen] = useState<number | null>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  // An image field may be empty, so the gallery shows only the items that have one.
  const slides = fields.gallery.filter((item): item is Slide => item.image !== null);

  // Focus returns to the image that opened the slider, so a keyboard visitor keeps their place.
  function close() {
    buttons.current[open!]?.focus();
    setOpen(null);
  }

  return (
    <Container className="portfolio">
      <h2 className="portfolio__title">{fields.title}</h2>
      <div className="portfolio__grid">
        {slides.map(({ UUID, image, caption }, i) => (
          <button
            key={UUID}
            ref={(button) => {
              buttons.current[i] = button;
            }}
            type="button"
            className="portfolio__item"
            aria-label={caption ? `Open ${caption}` : 'Open image'}
            onClick={() => setOpen(i)}
          >
            <img
              src={image.url}
              width={image.width ?? undefined}
              height={image.height ?? undefined}
              alt={image.description ?? ''}
              decoding="async"
              loading="lazy"
            />
            <span className="portfolio__overlay">
              {caption && <span className="portfolio__caption">{caption}</span>}
              <IconSearch />
            </span>
          </button>
        ))}
      </div>
      {open !== null && <Slider slides={slides} start={open} onClose={close} />}
    </Container>
  );
}
