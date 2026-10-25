'use client';

import { useEffect, useRef, useState } from 'react';

import type { Blocks, Upload } from '../ohne';

import { IconChevronLeft } from './icon/ChevronLeft';
import { IconChevronRight } from './icon/ChevronRight';
import { IconX } from './icon/X';

/**
 * A gallery item that has an image.
 */
export type Slide = Blocks['Portfolio']['gallery'][number] & { image: Upload };

/**
 * Props for `Slider`.
 */
export interface SliderProps {
  /**
   * The images to show, in order.
   */
  slides: Slide[];

  /**
   * The index of the image to open at.
   */
  start: number;

  /**
   * Called once the dialog has closed, by Esc, its button or a click beside the image.
   */
  onClose: () => void;
}

// A native `<dialog>` traps the focus, makes the page behind inert, and closes on Esc.
// The track snaps from slide to slide, so a touch swipe needs no script.
export function Slider({ slides, start, onClose }: SliderProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(start);

  // The arrows sit beside the shown image, so the dialog learns its width.
  function measure() {
    const image = track.current?.children[index]?.querySelector('img');
    dialog.current?.style.setProperty('--image-width', `${image?.offsetWidth ?? 0}px`);
  }

  function go(to: number, behavior: ScrollBehavior = 'smooth') {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const clamped = Math.min(Math.max(to, 0), slides.length - 1);
    track.current?.scrollTo({
      left: clamped * track.current.clientWidth,
      behavior: reduce ? 'instant' : behavior,
    });
  }

  useEffect(() => {
    // React runs this twice in development, and a second `showModal` on an open dialog throws.
    if (!dialog.current?.open) dialog.current?.showModal();
    go(start, 'instant');
  }, []);

  useEffect(() => {
    measure();
    const realign = () => {
      go(index, 'instant');
      measure();
    };
    // A disabled arrow drops the focus out of the dialog, so the window listens for the arrow keys.
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      go(index + (event.key === 'ArrowLeft' ? -1 : 1));
    };
    addEventListener('resize', realign);
    addEventListener('keydown', onKeyDown);
    return () => {
      removeEventListener('resize', realign);
      removeEventListener('keydown', onKeyDown);
    };
  });

  return (
    <dialog
      ref={dialog}
      className="slider"
      aria-label="Gallery"
      onClose={onClose}
      // A click beside the image, its caption and the buttons closes the slider, like a backdrop click.
      onClick={(event) => {
        if (!(event.target as Element).closest('img, figcaption, button')) dialog.current?.close();
      }}
    >
      <button
        type="button"
        className="slider__close"
        aria-label="Close"
        onClick={() => dialog.current?.close()}
      >
        <IconX />
      </button>
      <div
        ref={track}
        className="slider__track"
        onScroll={(event) =>
          setIndex(Math.round(event.currentTarget.scrollLeft / event.currentTarget.clientWidth))
        }
      >
        {slides.map(({ UUID, image, caption }, i) => (
          <figure key={UUID} className="slider__slide">
            <img
              className="slider__image"
              src={image.url}
              width={image.width ?? undefined}
              height={image.height ?? undefined}
              alt={image.description ?? ''}
              decoding="async"
              loading="lazy"
              onLoad={i === index ? measure : undefined}
            />
            {caption && <figcaption className="slider__caption">{caption}</figcaption>}
          </figure>
        ))}
      </div>
      <button
        type="button"
        className="slider__arrow slider__arrow--prev"
        aria-label="Previous image"
        disabled={index === 0}
        onClick={() => go(index - 1)}
      >
        <IconChevronLeft />
      </button>
      <button
        type="button"
        className="slider__arrow slider__arrow--next"
        aria-label="Next image"
        disabled={index === slides.length - 1}
        onClick={() => go(index + 1)}
      >
        <IconChevronRight />
      </button>
    </dialog>
  );
}
