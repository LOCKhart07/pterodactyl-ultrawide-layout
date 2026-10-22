import { expect, test } from 'vitest';
import { apply, resolve } from './apply';

test('turns settings into rem variables and the console attribute', () => {
    expect(resolve({ edge: 2.5, max_width: 160, console_layout: false, console_aside: 20, console_height: 40 })).toEqual({
        properties: {
            '--uw-edge-max': '2.5rem',
            '--uw-max-width': '160rem',
            '--uw-console-aside': '20rem',
            '--uw-console-height-max': '40rem',
        },
        attributes: { 'data-uw-console': 'off' },
    });
});

test('a max width of 0 means no cap', () => {
    expect(resolve({ max_width: 0 }).properties['--uw-max-width']).toBe('100%');
});

test('leaves out missing and non-numeric values so the stylesheet defaults apply', () => {
    expect(resolve({})).toEqual({ properties: {}, attributes: {} });
    expect(resolve({ edge: 'wide', max_width: null, console_aside: Number.NaN, console_layout: 'yes' })).toEqual({
        properties: {},
        attributes: {},
    });
});

test('accepts numeric strings and clamps to the provider bounds', () => {
    expect(resolve({ edge: '4', console_aside: 5, console_height: 999 }).properties).toEqual({
        '--uw-edge-max': '4rem',
        '--uw-console-aside': '14rem',
        '--uw-console-height-max': '200rem',
    });
});

test('writes the result onto the root element', () => {
    const root = document.createElement('html');
    apply({ edge: 1, console_layout: true }, root);

    expect(root.style.getPropertyValue('--uw-edge-max')).toBe('1rem');
    expect(root.getAttribute('data-uw-console')).toBe('on');
});
