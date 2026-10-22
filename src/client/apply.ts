/** The admin settings the provider sends as ctx.config. Absent before sign-in. */
export interface UltrawideConfig {
    edge?: unknown;
    max_width?: unknown;
    console_layout?: unknown;
    console_aside?: unknown;
    console_height?: unknown;
}

const rem = (value: unknown, min: number, max: number): string | null => {
    const number = typeof value === 'string' && value.trim() !== '' ? Number(value) : value;
    if (typeof number !== 'number' || !Number.isFinite(number)) return null;

    return `${Math.min(max, Math.max(min, number))}rem`;
};

/**
 * The CSS variables and `<html>` attributes that the settings produce. A value that is missing or
 * not a number is left out so that the stylesheet's default applies. The bounds match the
 * provider's validation rules.
 */
export function resolve(config: UltrawideConfig): { properties: Record<string, string>; attributes: Record<string, string> } {
    const properties: Record<string, string> = {};
    const attributes: Record<string, string> = {};

    const edge = rem(config.edge, 0, 8);
    if (edge !== null) properties['--uw-edge-max'] = edge;

    const width = rem(config.max_width, 0, 1000);
    // 0 means no cap.
    if (width !== null) properties['--uw-max-width'] = width === '0rem' ? '100%' : width;

    const aside = rem(config.console_aside, 14, 48);
    if (aside !== null) properties['--uw-console-aside'] = aside;

    const height = rem(config.console_height, 16, 200);
    if (height !== null) properties['--uw-console-height-max'] = height;

    if (typeof config.console_layout === 'boolean') {
        attributes['data-uw-console'] = config.console_layout ? 'on' : 'off';
    }

    return { properties, attributes };
}

export function apply(config: UltrawideConfig, root: HTMLElement = document.documentElement): void {
    const { properties, attributes } = resolve(config);
    for (const [name, value] of Object.entries(properties)) root.style.setProperty(name, value);
    for (const [name, value] of Object.entries(attributes)) root.setAttribute(name, value);
}
