import './styles.css';
import { definePterodactylExtension } from '@pterodactyl/sdk';
import { apply } from './apply';

// No screens or slots: the stylesheet does the layout, and setup only writes the admin's settings into it.
export default definePterodactylExtension({
    setup({ config }) {
        apply(config ?? {});
    },
});
